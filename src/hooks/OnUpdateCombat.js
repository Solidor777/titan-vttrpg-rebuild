import isModifierActive from '~/helpers/utility-functions/IsModifierActive.js';

export default async function onUpdateCombat(combat, data, diff) {
   // Ensure that this is the result of advancing in turn order
   const isNewCombat = combat.previous?.turn === null;
   const currentCombatant = combat.combatant;
   if (!isModifierActive() && currentCombatant && (diff.direction === 1 || isNewCombat)) {
      // Get the change in initiative
      const currentInitiative = currentCombatant.initiative;
      const previousCombatant = combat.combatants?.get(combat.previous?.combatantId);
      const previousInitiative = isNewCombat ? 0 : previousCombatant ? previousCombatant.initiative : currentInitiative;
      if (currentInitiative === null || previousInitiative === null) {
         game.titan.warn('Current or Previous combatant had an Initiative of null. Initiative based effects will not function.');
      }
      else {
         const isNewRound = currentInitiative > previousInitiative;
         for (const combatant of combat.combatants) {
            const character = combatant?.actor?.character;
            if (character) {
               await character.onInitiativeAdvanced(currentInitiative, previousInitiative, isNewRound);
            }
         }
      }

      // End of turn operations for previous combatant;
      const previousCharacter = previousCombatant?.actor?.character;
      if (previousCharacter) {
         await previousCharacter.onTurnEnd();
      }

      // Start of turn operations for current combatant
      const currentCharacter = currentCombatant.actor?.character;
      if (currentCharacter) {
         await currentCharacter.onTurnStart();
      }
   }

   return;
}