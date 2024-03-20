// Returns the list of player user owners for a document 
export default function getPlayerOwners(document) {
   return game.users.filter((user) => document.testUserPermission(user, 'OWNER') && !user.isGM);
}