import getSetting from '~/utility-functions/GetSetting.js';
import localize from '~/utility-functions/Localize.js';
import ConfirmRegenerateUUIDDialog from '~/documents/dialogs/ConfirmRegenerateUUIDDialog';
import EditUUIDDialog from '~/documents/dialogs/EditUUIDDialog';
import regenerateUUID from '~/utility-functions/RegenerateUUID.js';

export default function onGetItemDirectoryEntryContext(html, options) {
   // Only present these options for the gm
   if (game.user.isGM) {

      // Regenerate UUID
      options.push({
         name: localize('regenerateUUID'),
         icon: '<i class="fas fa-id-card"></i>',
         condition: true,
         callback: onRegenerateUUID
      });

      // Edit UUID
      options.push({
         name: localize('editUUID'),
         icon: '<i class="fas fa-id-card"></i>',
         condition: true,
         callback: editUUID
      });
   }
}

// Utility function for getting an item
function getItem(li) {
   const itemId = li.data('document-id');
   return game.items.get(itemId);
}

// Returns whether we can edit the UUID of this item
// Return true if the item exists
function canEditUUID(li) {
   return getItem(li) ? true : false;
}

// Randomly regenerations the UUID of the item
async function onRegenerateUUID(li) {
   const item = getItem(li);
   if (item) {

      // If the system is set confirm the UUID regeneration, then bring up a dialog
      if (getSetting('confirmRegenerateUUID')) {
         const dialog = new ConfirmRegenerateUUIDDialog(item);
         dialog.render(true);
      }

      // Otherwise, immediately regeneration the UUID
      else {
         regenerateUUID(item);
      }
   }

   return;
}

// Manually edit the UUID of the item
async function editUUID(li) {

   // Create a dialog for manually editing the UUID
   const item = getItem(li);
   if (item) {
      const dialog = new EditUUIDDialog(item);
      dialog.render(true);
   }

   return;
}
