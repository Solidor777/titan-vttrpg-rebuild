export default function getCombatTargets() {
   // Get the user targets
   let userTargets = Array.from(game.user.targets).filter((target) => target.actor);

   // If no targets, get controlled tokens
   if (userTargets.length < 1 && game.user.isGM) {
      userTargets = Array.from(canvas.tokens.controlled).filter((target) => target.actor);
   }

   return userTargets.map((target) => target.actor);
}