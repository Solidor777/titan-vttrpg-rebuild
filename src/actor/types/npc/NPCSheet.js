import NPCSheetShell from '~/actor/types/npc/NPCSheetShell.svelte';
import TitanCharacterSheet from '~/actor/types/character/sheet/CharacterSheet.js';
import createNPCSheetState from '~/actor/types/npc/NPCSheetState';

export default class TitanNPCSheet extends TitanCharacterSheet {

   /**
    * Default Application options
    *
    * @returns {object} options - Application options.
    * @see https://foundryvtt.com/api/Application.html#options
    */
   static get defaultOptions() {
      return foundry.utils.mergeObject(super.defaultOptions, {
         width: 750,
         height: 845,
         svelte: {
            class: NPCSheetShell,
            target: document.body
         },
      });
   }

   _createReactiveState() {
      return createNPCSheetState();
   }

   // Add the npc sheet class
   _getSheetClasses() {
      const retVal = super._getSheetClasses();
      retVal.push('titan-npc-sheet');

      return retVal;
   }
}