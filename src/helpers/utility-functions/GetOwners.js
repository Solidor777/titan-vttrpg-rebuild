// Returns the list of user owners for a document
export default function getOwners(document) {
   return game.users.filter((user) =>
      document.testUserPermission(user, 'OWNER')
   );
}