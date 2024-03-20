import ConfirmRegenerateUUIDDialog from '~/document/dialogs/ConfirmRegenerateUUIDDialog.js';
import getSetting from '~/helpers/utility-functions/GetSetting.js';

// Randomly regenerate the UUID of an document
export default function onRegenerateDocumentUUID(document) {
   if (document) {

      // If the system is set confirm the UUID regeneration, then bring up a dialog
      if (getSetting('confirmRegenerateUUID')) {
         const dialog = new ConfirmRegenerateUUIDDialog(document);
         dialog.render(true);
      }

      // Otherwise, immediately regeneration the UUID
      else {
         regenerateUUID(document);
      }
   }

   return;
}