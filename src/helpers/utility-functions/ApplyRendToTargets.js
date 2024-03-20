import getCombatTargets from '~/helpers/utility-functions/GetCombatTargets.js';

export default function applyRendToTargets(rend, options) {
   // Get targets
   const targets = getCombatTargets();

   // Apply healing to each target
   targets.forEach((target) => {
      if (target && target.character) {
         target.character.applyRend(rend, options);
      }
   });
}