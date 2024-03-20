import localize from '~/helpers/utility-functions/Localize.js';
import TitanDocumentSheet from '~/document/sheet/DocumentSheet';
export default class TitanItemSheet extends TitanDocumentSheet {

   constructor(document, options = {}) {
      super(document, options);
      this.item = document;
   }

   /**
    * Default Application options
    *
    * @returns {object} options - Application options.
    * @see https://foundryvtt.com/api/Application.html#options
    */
   static get defaultOptions() {
      return foundry.utils.mergeObject(super.defaultOptions, {
         baseApplication: 'ItemSheet',
      });
   }

   _getSheetID(document) {
      return `item-sheet-${document.id}`;
   }

   // Add the item sheet class
   _getSheetClasses() {
      const retVal = super._getSheetClasses();
      retVal.push('titan-item-sheet');

      return retVal;
   }

   _getHeaderButtons() {
      const buttons = super._getHeaderButtons();

      buttons.unshift({
         class: 'send-to-chat',
         icon: 'fas fa-comment',
         label: localize('sendToChat'),
         onclick: () => this.item.sendToChat(),
      });

      if (this.item.pack) {
         buttons.unshift({
            class: 'import',
            icon: 'fas fa-download',
            label: localize('import'),
            onclick: (event) => this._onImport(event)
         });
      }

      return buttons;
   }

   _onImport(event) {
      if (event) {
         event.preventDefault();
      }
      return this.item.collection.importFromCompendium(this.item.compendium, this.item.id);
   }

   addCheck() {
      this.applicationState.addCheck();

      return;
   }

   async removeCheck(idx) {
      this.applicationState.removeCheck(idx);

      return;
   }
}