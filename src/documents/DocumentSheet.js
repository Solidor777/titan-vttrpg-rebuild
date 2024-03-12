import { SvelteApplication } from '@typhonjs-fvtt/runtime/svelte/application';
import { TJSDocument } from '@typhonjs-fvtt/runtime/svelte/store/fvtt/document';
import { writable } from 'svelte/store';
import getSetting from '~/utility-functions/GetSetting.js';
import localize from '~/utility-functions/Localize.js';
export default class TitanDocumentSheet extends SvelteApplication {

   // Constructor for the document sheet
   constructor(document, options = {}) {
      // Initialize options objects
      options.svelte ??= {};

      // Set base properties for the sheet
      super(foundry.utils.mergeObject(
         options,
         {
            id: `document-sheet-${document.id}`,
            title: document.name,
            svelte: {
               props: {
                  document: null,
                  applicationState: null,
               }
            }
         }
      ));

      // Add the sheet classes
      this.options.classes.push(...this._getSheetClasses());

      // Initialize the reactive  document
      this.document = document;
      this.options.svelte.props.document = this._createReactiveDocument(document, { delete: this.close.bind(this) });

      // Initialize the reactive state
      this.applicationState = this._createReactiveState();
      this.options.svelte.props.applicationState = this.applicationState;

      // Holds the subscription / unsubscription functions
      this.documentUnsubscribe = void 0;
   }

   /**
    * Default Application options
    *
    * @returns {object} options - Application options.
    * @see https://foundryvtt.com/api/Application.html#options
    */
   static get defaultOptions() {
      return foundry.utils.mergeObject(super.defaultOptions, {
         width: 650,
         height: 650,
         baseApplication: 'DocumentSheet',
         resizable: true,
         minimizable: true,
         dragDrop: [{ dragSelector: '.directory-list .item', dropSelector: null }],
         svelte: {
            target: document.body,
         },
      });
   }


   // Overridable function for getting the sheet classes
   _getSheetClasses() {
      const retVal = ['titan', 'titan-document-sheet'];

      // Add dark mode class if dark mode enabled
      if (getSetting('darkModeSheets')) {
         retVal.push('titan-dark-mode');
      }

      return retVal;
   }

   // Overridable function for creating the reactive document
   _createReactiveDocument(document, options = {}) {
      return new TJSDocument(document, options);
   }

   // Overridable function for creating the reactive state
   _createReactiveState(options = {}) {
      return new writable(options);
   }

   // Get the header buttons for the sheet
   _getHeaderButtons() {
      const buttons = super._getHeaderButtons();

      // Sheet configuration button for actors not in a compendium
      if (!this.document.pack) {
         buttons.unshift({
            class: 'configure-sheet',
            icon: 'fas fa-cog fa-fw',
            title: localize('openSheetConfigurator'),
            onclick: (event) => this._onConfigureSheet(event),
         });
      }

      return buttons;
   }

   // Getter for the object of this sheet
   get object() {
      return this.document;
   }

   // Drag Drop Handling
   // By default, can drag start is true
   _canDragStart() {
      return true;
   }

   // Can drag drop is true if the user is the owner of this document or a gm
   _canDragDrop() {
      return this.document.isOwner || game.user.isGM;
   }

   // Nothing is currently defined for on drag over
   _onDragOver() { }

   _onDragStart(event) {
      {
         const li = event.currentTarget;
         if (event.target.classList.contains('content-link')) {
            return;
         }

         // Create drag data
         let dragData;

         // Get drag data from items
         if (li.dataset.itemId) {
            const item = this.actor.items.get(li.dataset.itemId);
            dragData = item.toDragData();
         }

         // Get drag data from active effects
         if (li.dataset.effectId) {
            const effect = this.actor.effects.get(li.dataset.effectId);
            dragData = effect.toDragData();
         }

         // Abort if no drag data
         if (!dragData) {
            return;
         }

         // Set data transfer
         event.dataTransfer.setData('text/plain', JSON.stringify(dragData));

         return;
      }
   }
   async _onDrop(event) {
      if (this.document.documentName !== 'Actor') {
         return;
      }
      const data = TextEditor.getDragEventData(event);
      const actor = this.document;

      /**
       * A hook event that fires when some useful data is dropped onto an ActorSheet.
       * @function dropActorSheetData
       * @memberof hookEvents
       * @param {Actor} actor      The Actor
       * @param {ActorSheet} sheet The ActorSheet application
       * @param {object} data      The data that has been dropped onto the sheet
       */
      const allowed = Hooks.call('dropActorSheetData', actor, this, data);
      if (allowed === false) {
         return;
      }

      // Handle different data types
      switch (data.type) {
         case 'ActiveEffect': {
            return this._onDropActiveEffect(event, data, actor);
         }
         case 'Actor': {
            return this._onDropActor(event, data, actor);
         }
         case 'Item': {
            return this._onDropItem(event, data, actor);
         }
         case 'Folder': {
            return this._onDropFolder(event, data, actor);
         }
         default: {
            console.error('TITAN | Impossible type in _onDrop.');
            console.trace();

            return false;
         }
      }
   }

   async _onDropActiveEffect(event, data, actor) {
      const effect = await ActiveEffect.implementation.fromDropData(data);
      if (!actor.isOwner || !effect) {
         return false;
      }
      if (actor.uuid === effect.parent.uuid) {
         return false;
      }
      return ActiveEffect.create(effect.toObject(), { parent: actor });
   }

   async _onDropActor(event, data, actor) {
      if (!actor.isOwner) {
         return false;
      }
   }

   async _onDropItem(event, data, actor) {
      if (!actor.isOwner) {
         return false;
      }
      const item = await Item.implementation.fromDropData(data);
      const itemData = item.toObject();

      // Handle item sorting within the same Actor
      if (actor.uuid === item.parent?.uuid) {
         return this._onSortItem(event, itemData, actor);
      }

      // Create the owned item
      return this._onDropItemCreate(itemData, actor);
   }

   async _onDropFolder(event, data, actor) {
      if (!actor.isOwner) {
         return [];
      }
      if (data.documentName !== 'Item') {
         return [];
      }
      const folder = await Folder.implementation.fromDropData(data);
      if (!folder) {
         return [];
      }
      return this._onDropItemCreate(
         folder.contents.map((item) => {
            return game.items.fromCompendium(item);
         })
      );
   }

   async _onDropItemCreate(itemData, actor) {
      itemData = itemData instanceof Array ? itemData : [itemData];
      return actor.createEmbeddedDocuments('Item', itemData);
   }

   _onSortItem(event, itemData, actor) {
      // Get the drag source and drop target
      const items = actor.items;
      const source = items.get(itemData._id);
      const dropTarget = event.target.closest('[data-item-id]');
      if (!dropTarget) {
         return;
      }
      const target = items.get(dropTarget.dataset.itemId);

      // Don't sort on yourself
      if (source.id === target.id) {
         return;
      }

      // Identify sibling items based on adjacent HTML elements
      const siblings = [];
      for (let el of dropTarget.parentElement.children) {
         const siblingId = el.dataset.itemId;
         if (siblingId && (siblingId !== source.id)) {
            siblings.push(items.get(el.dataset.itemId));
         }
      }

      // Perform the sort
      const sortUpdates = SortingHelpers.performIntegerSort(source, { target, siblings });
      const updateData = sortUpdates.map((u) => {
         const update = u.update;
         update._id = u.target._id;
         return update;
      });

      // Perform the update
      return actor.updateEmbeddedDocuments('Item', updateData);

   }

   _onConfigureSheet(event) {
      if (event) {
         event.preventDefault();
      }
      // eslint-disable-next-line no-undef
      return new DocumentSheetConfig(this.document, _this._getDialogOffset()).render(true);
   }

   _getDialogOffset() {
      return {
         top: this.position.top + 40,
         left: this.position.left + (this.position.width - this.options.width) / 2,
      };
   }

   async close(options = {}) {
      await super.close(options);

      // Unsubscribe from the document if still subscribed
      if (this.documentUnsubscribe) {
         this.documentUnsubscribe();
         this.documentUnsubscribe = void 0;
      }

      return;
   }


   // Updates the document name
   async updateDocumentTitle(doc, options) {
      const { action } = options;
      if ((action === void 0 || action === 'update' || action === 'subscribe') && doc) {
         this.reactive.title = doc?.isToken ? `[Token] ${doc?.name}` : doc?.name ?? 'No Document Assigned';
      }
   }

   render(force = false, options = {}) {
      // Subscribe to the document if not already subscribed
      if (!this.documentUnsubscribe) {
         this.documentUnsubscribe = this.options.svelte.props.document.subscribe(this.updateDocumentTitle.bind(this));
      }

      super.render(force, options);
      return this;
   }
}
