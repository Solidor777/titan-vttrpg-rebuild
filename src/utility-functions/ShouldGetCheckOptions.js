import isModifierActive from '~/utility-functions/IsModifierActive.js';

export default function shouldGetCheckOptions() {
   // If Get Check Options is true by default, return true if modifier is not pressed.
   // Otherwise, return false unless modifer is pressed.
   const retVal = game.settings.get('titan', 'getCheckOptions') === true;
   return isModifierActive() ? !retVal : retVal;
}