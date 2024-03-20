import TitanItemSheet from '~/document/types/item/sheet/ItemSheet';
import createArmorSheetState from '~/document/types/item/types/armor/sheet/ArmorSheetState.js';
import ArmorSheetShell from '~/document/types/item/types/armor/sheet/ArmorSheetShell.svelte';

export default class TitanArmorSheet extends TitanItemSheet {
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
            class: ArmorSheetShell,
            target: document.body
         }
      });
   }

   _createReactiveState() {
      return createArmorSheetState();
   }
}