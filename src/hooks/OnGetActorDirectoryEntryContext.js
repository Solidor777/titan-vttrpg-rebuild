import localize from '~/utility-functions/Localize.js';
import onRegenerateDocumentUUID from '~/utility-functions/OnRegenerateDocumentUUID.js';
import onEditDocumentUUID from '~/utility-functions/OnEditDocumentUUID.js';

export default function onGetActorDirectoryEntryContext(html, options) {

   // Regenerate UUID
   options.push({
      name: localize('regenerateUUID'),
      icon: '<i class="fas fa-id-card"></i>',
      condition: isActorOwner,
      callback: (li) => onRegenerateDocumentUUID(getActor(li)),
   });

   // Edit UUID
   options.push({
      name: localize('editUUID'),
      icon: '<i class="fas fa-id-card"></i>',
      condition: isActorOwner,
      callback: (li) => onEditDocumentUUID(getActor(li)),
   });
}

function getActor(li) {
   return game.actors.get(li.data('document-id'));
}

function isActorOwner(li) {
   return getActor(li)?.isOwner;
}