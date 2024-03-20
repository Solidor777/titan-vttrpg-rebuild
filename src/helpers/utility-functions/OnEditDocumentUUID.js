import EditUUIDDialog from '~/documents/dialogs/EditUUIDDialog.js';

// Manually edit the UUID of the document
export default function onEditDocumentUUID(document) {
   if (document) {
      const dialog = new EditUUIDDialog(document);
      dialog.render(true);
   }

   return;
}