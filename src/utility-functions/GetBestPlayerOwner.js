import getPlayerOwners from '~/utility-functions/GetPlayerOwners.js';

// Gets the first player owner of this document, prioritizing active players
export default function getBestPlayerOwner(document) {

   // Get Players
   const playerOwners = getPlayerOwners(document);
   if (playerOwners.length > 0) {

      // If there are multiple players
      if (playerOwners.length > 1) {

         // Get active players
         const activeOwners = playerOwners.filter((owner) => owner.active);
         if (activeOwners.length > 0) {

            // If there are multiple active players
            if (activeOwners.length > 1) {

               // Check if one is the active user
               const userPlayerOwner = activeOwners.filter(owner.id === game.user.id);
               if (userPlayerOwner) {
                  // return active user
                  return userPlayerOwner;
               }
            }

            // Return first active player
            return activeOwners[0];
         }
      }
      // Return first player
      return playerOwners[0];
   }

   // Found no player owners
   return false;
}