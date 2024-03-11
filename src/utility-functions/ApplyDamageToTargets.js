import getCombatTargets from '~/utility-functions/GetCombatTargets.js';

export default function applyDamageToTargets(damage, options) {
   // Get targets
   const targets = getCombatTargets();

   // Apply damage to each target
   targets.forEach((target) => {
      if (target && target.character) {
         target.character.applyDamage(damage, options);
      }
   });
}
