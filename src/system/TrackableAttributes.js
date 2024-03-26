/**
 * Gets the trackable attributes for the Titan system.
 * @returns {object}    The trackable attributes
 */
export default function getTrackableAttributes() {
   function getCharacterTrackableAttributes() {
      return {
         bar: ['resource.stamina', 'resource.resolve'],
      };
   }

   return {
      player: getCharacterTrackableAttributes(),
      npc: getCharacterTrackableAttributes(),
   };
}
