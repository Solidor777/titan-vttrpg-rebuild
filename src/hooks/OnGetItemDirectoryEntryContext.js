import localize from '~/helpers/utility-functions/Localize.js';
import onRegenerateDocumentUUID from '~/helpers/utility-functions/OnRegenerateDocumentUUID.js';
import onEditDocumentUUID from '~/helpers/utility-functions/OnEditDocumentUUID.js';

export default function onGetItemDirectoryEntryContext(html, options) {

   // Regenerate UUID
   options.push({
      name: localize('regenerateUUID'),
      icon: '<i class="fas fa-id-card"></i>',
      condition: isItemOwner,
      callback: (li) => onRegenerateDocumentUUID(getItem(li)),
   });

   // Edit UUID
   options.push({
      name: localize('editUUID'),
      icon: '<i class="fas fa-id-card"></i>',
      condition: isItemOwner,
      callback: (li) => onEditDocumentUUID(getItem(li)),
   });
}

function getItem(li) {
   return game.items.get(li.data('document-id'));
}

function isItemOwner(li) {
   return getItem(li)?.isOwner;
}