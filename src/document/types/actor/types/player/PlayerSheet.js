import PlayerSheetShell from '~/document/types/actor/types/player/PlayerSheetShell.svelte';
import TitanCharacterSheet from '~/document/types/actor/types/character/sheet/CharacterSheet.js';
import createPlayerSheetState from '~/document/types/actor/types/player/PlayerSheetState';

export default class TitanPlayerSheet extends TitanCharacterSheet {
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
            class: PlayerSheetShell,
         },
      });
   }

   _createReactiveState() {
      return createPlayerSheetState();
   }

   // Add the player sheet class
   _getSheetClasses() {
      const retVal = super._getSheetClasses();
      retVal.push('titan-player-sheet');

      return retVal;
   }
}