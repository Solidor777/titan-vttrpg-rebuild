export default function getControlledTokens() {
   return Array.from(canvas.tokens.controlled).filter((token) => token.actor);
}