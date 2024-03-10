import localize from '~/utility/Localize.js';
import ConfirmationDialog from '~/helpers/dialogs/ConfirmationDialog';
export default class ConfirmDeleteItemDialog extends ConfirmationDialog {
   constructor(actor, item) {
      super(
         localize('deleteItem'),
         [actor.name, item.name],
         localize('confirmDeleteItem'),
         localize('deleteItem'),
         300,
         210
      );

      this.actor = actor;
      this.itemId = item._id;
   }

   confirmed() {
      if (this.actor) {
         this.actor.deleteItem(this.itemId, true);
      }

      return;
   }
}
