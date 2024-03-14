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
            title: document.name,
            token: null,
            svelte: {
               props: {
                  document: null,
               }
            }
         }
      ));

      // Get sheet id
      this.options.id = this._getSheetID(document);

      // Add the sheet classes
      this.options.classes.push(...this._getSheetClasses());

      // Initialize the reactive  document
      this.document = document;
      this.options.svelte.props.document = this._createReactiveDocument(this.document, { delete: this.close.bind(this) });

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

   _getSheetID(document) {
      return `document-sheet-${document.id}`;
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

      // Sheet configuration button for documents not in a compendium
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
      // Unsubscribe from the document if still subscribed
      if (this.documentUnsubscribe) {
         this.documentUnsubscribe();
         this.documentUnsubscribe = void 0;
      }

      return super.close(options);
   }


   // Updates the document name
   async updateDocumentTitle(doc, options) {
      const { action } = options;
      if ((action === void 0 || action === 'update' || action === 'subscribe') && doc) {
         this.reactive.title = doc?.name ?? 'No Document Assigned';
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

   // Returns whether this application is currently editable
   get isEditable() {

      // If editable and owner
      if (this.options.editable && this.document.isOwner) {

         // If not in a locked pack
         if (this.document.pack) {
            const pack = game.packs.get(this.document.pack);
            return !pack?.locked;
         }
         return true;
      }
      return false;
   }

   _canDragStart() {
      return this.isEditable;
   }

   _canDragDrop() {
      return this.isEditable;
   }
}
