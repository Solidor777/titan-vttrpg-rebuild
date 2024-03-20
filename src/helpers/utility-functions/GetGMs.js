// Returns a list of use gms
export default function getGMs() {
   return game.users.filter((user) =>
      user.isGM
   );
}