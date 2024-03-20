// Function used to determine if the current user is the first owner of a document.
// This is used to ensure certain functions only fire once, such as turn updates in compare.
export default function isCurrentUserFirstOwner(document) {
   // Check if a GM is currently active.
   const activeGMUsers = game.users.filter((user) => user.active && user.isGM);

   // Check if the first GM is this user.
   if (activeGMUsers.length > 0) {
      return game.user === activeGMUsers[0];
   }

   // Otherwise check if there is an active owner.
   // If so, return if the current user is the first active owner.
   const activeOwners = game.users.filter((user) => user.active && document.testUserPermission(user, 'OWNER'));
   return activeOwners.length > 0 && game.user === activeOwners[0];
}