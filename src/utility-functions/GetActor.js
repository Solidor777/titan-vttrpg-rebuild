// Gets the actor on the canvas from the token ID.
// If no token on the canvas, get the actor from the actor's directory as a fallback.
export default function getActor(actorId, tokenId) {
   const token = canvas?.tokens?.placeables?.find((currentToken) => currentToken.id === tokenId);
   return token ? token.actor : game.actors.get(actorId);
}