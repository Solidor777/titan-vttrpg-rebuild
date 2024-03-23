import localize from '~/helpers/utility-functions/Localize.js';
import regenerateDocumentUUID from '~/helpers/utility-functions/RegenerateDocumentUUID.js';
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
      regenerateDocumentUUID(this.document);

      return;
   }
}
