import { getSetting } from '~/helpers/Utility.js';
import localize from '~/utility/Localize.js';
import ConfirmRegenerateUUIDDialog from '~/documents/dialogs/ConfirmRegenerateUUIDDialog';
import EditUUIDDialog from '~/documents/dialogs/EditUUIDDialog';

export default function onGetActorDirectoryEntryContext(html, options) {
   // Only present these options for the gm
   if (game.user.isGM) {
      // Regenerate UUID
      options.push({
         name: localize('regenerateUUID'),
         icon: '<i class="fas fa-id-card"></i>',
         condition: canEditUUID,
         callback: regenerateUUID
      });

      // Edit UUID
      options.push({
         name: localize('editUUID'),
         icon: '<i class="fas fa-id-card"></i>',
         condition: canEditUUID,
         callback: editUUID
      });
   }
}

// Utility function for getting an actor
function getActor(li) {
   const actorID = li.data('document-id');
   return game.actors.get(actorID);
}


// Returns whether we can edit the UUID of this actor
// Return true if the actor exists
function canEditUUID(li) {
   return getActor(li) ? true : false;
}

// Randomly regenerations the UUID of an actor
async function regenerateUUID(li) {
   const actor = getActor(li);
   if (actor) {
      // If the system is set confirm the UUID regeneration, then bring up a macro
      if (getSetting('confirmRegenerateUUID')) {
         const dialog = new ConfirmRegenerateUUIDDialog(actor);
         dialog.render(true);
      }

      // Otherwise, immediately regeneration the UUID
      else {
         regenerateUUID(actor);
      }
   }

   return;
}

// Manually edit the UUID of the actor
async function editUUID(li) {

   // Create a dialog for manually editing the UUID
   const actor = getActor(li);
   if (actor) {
      const dialog = new EditUUIDDialog(actor);
      dialog.render(true);
   }

   return;
}
