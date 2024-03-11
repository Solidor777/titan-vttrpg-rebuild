import localize from '~/utility-functions/Localize.js';
import TitanDocumentSheet from '~/documents/DocumentSheet';
export default class TitanItemSheet extends TitanDocumentSheet {

   item = this.document;

   _getHeaderButtons() {
      const buttons = super._getHeaderButtons();

      buttons.unshift({
         class: 'send-to-chat',
         icon: 'fas fa-comment',
         label: localize('sendToChat'),
         onclick: () => this.document.sendToChat(),
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
      return this.item.collection
         .importFromCompendium(this.item.compendium, this.item.id);
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