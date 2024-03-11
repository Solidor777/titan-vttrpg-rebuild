import { Hashing } from '@typhonjs-fvtt/runtime/util';

// Randamly Regenerates the UUID for an object
export default async function regenerateUUID(document) {
   if (document) {
      await document.update({
         flags: {
            titan: {
               uuid: Hashing.uuidv4()
            }
         }
      });

      ui.notifications.info(
         localize('regeneratedUUIDForDocument%x').replace('%x', document.name)
      );
   }
}