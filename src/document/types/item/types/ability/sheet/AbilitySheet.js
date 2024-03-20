import TitanItemSheet from '~/document/types/item/sheet/ItemSheet';
import AbilitySheetShell from '~/document/types/item/types/ability/sheet/AbilitySheetShell.svelte';
import createAbilitySheetState from '~/document/types/item/types/ability/sheet/AbilitySheetState';

export default class TitanAbilitySheet extends TitanItemSheet {
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
            class: AbilitySheetShell,
            target: document.body
         }
      });
   }
   _createReactiveState() {
      return createAbilitySheetState();
   }
}