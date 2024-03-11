import getCombatTargets from '~/utility-functions/GetCombatTargets.js';

export default function applyRepairsToTargets(repairs, options) {
   // Get targets
   const targets = getCombatTargets();

   // Apply healing to each target
   targets.forEach((target) => {
      if (target && target.character) {
         target.character.applyRepairs(repairs, options);
      }
   });
}