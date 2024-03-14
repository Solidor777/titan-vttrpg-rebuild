import isHTMLBlank from '~/utility-functions/IsHTMLBlank.js';
import TitanItemSheet from '~/item/sheet/ItemSheet.js';
import WeaponSheetShell from '~/item/types/weapon/sheet/WeaponSheetShell.svelte';
import createWeaponSheetState from '~/item/types/weapon/sheet/WeaponSheetState.js';

export default class TitanWeaponSheet extends TitanItemSheet {

   /**
    * Default Application options
    *
    * @returns {object} options - Application options.
    * @see https://foundryvtt.com/api/Application.html#options
    */
   static get defaultOptions() {
      return foundry.utils.mergeObject(super.defaultOptions, {
         width: 650,
         height: 650,
         svelte: {
            class: WeaponSheetShell,
            target: document.body
         }
      });
   }

   _createReactiveState() {
      return createWeaponSheetState(isHTMLBlank(object.system.attackNotes) ? 'itemDescription' : 'attackNotes');
   }

   addAttack() {
      this.applicationState.addAttack();
   }

   removeAttack(idx) {
      this.applicationState.removeAttack(idx);
   }
}