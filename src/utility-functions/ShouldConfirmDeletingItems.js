import isModifierActive from '~/utility-functions/IsModifierActive.js';

export default function shouldConfirmDeletingItems() {
   // If confirm deleting items is true, return true unless the modifier key is pressed.
   // Otherwise, return false unless the modfier key is pressed.
   return isModifierActive() ? false : game.settings.get('titan', 'confirmDeletingItems');
}