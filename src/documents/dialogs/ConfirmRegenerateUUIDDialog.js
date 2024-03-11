import localize from '~/utility-functions/Localize.js';
import regenerateUUID from '~/utility-functions/RegenerateUUID.js';
import ConfirmationDialog from '~/helpers/dialogs/ConfirmationDialog';
export default class ConfirmRegenerateUUIDDialog extends ConfirmationDialog {
   constructor(document) {
      super(
         localize('regenerateUUID'),
         [document.name],
         localize('confirmRegenerateUUID'),
         localize('regenerate'),
         300,
         250
      );

      this.document = document;
   }

   confirmed() {
      regenerateUUID(this.document);

      return;
   }
}
