import getCombatTargets from '~/utility-functions/GetCombatTargets.js';

export default function applyHealingToTargets(healing = 1, options) {
   // Get targets
   const targets = getCombatTargets();

   // Apply healing to each target
   targets.forEach((target) => {
      if (target && target.character) {
         target.character.applyHealing(healing, options);
      }
   });
}