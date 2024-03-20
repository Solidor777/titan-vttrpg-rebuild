import TitanItemSheet from '~/document/types/item/sheet/ItemSheet';
import EffectSheetShell from '~/document/types/item/types/effect/sheet/EffectSheetShell.svelte';
import createEffectSheetState from '~/document/types/item/types/effect/sheet/EffectSheetState';

export default class TitanEffectSheet extends TitanItemSheet {
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
            class: EffectSheetShell,
            target: document.body
         }
      });
   }

   _createReactiveState() {
      return createEffectSheetState();
   }
}