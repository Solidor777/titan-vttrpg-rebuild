import TitanActorSheet from "~/actor/sheet/ActorSheet";
import CharacterDocument from '~/actor/types/character/document/CharacterDocument.js';
import CharacterSheetInventoryAddItemDialog from "~/actor/types/character/sheet/tabs/inventory/CharacterSheetInventoryAddItemDialog";

export default class TitanCharacterSheet extends TitanActorSheet {
   addInventoryItem() {
      if (this.actor.isOwner) {
         const dialog = new CharacterSheetInventoryAddItemDialog(this.actor);
         dialog.render(true);
         console.log(this.options.svelte.props.document);
      }
      return;
   }

   // Delete Item from the sheet state
   deleteItem(itemId) {
      this.applicationState.deleteItem(itemId);

      return;
   }

   // Add the npc sheet class
   _getSheetClasses() {
      const retVal = super._getSheetClasses();
      retVal.push('titan-character-sheet');

      return retVal;
   }

   _createReactiveDocument(document, options = {}) {
      return new CharacterDocument(document, options);
   }

}