import { Hashing } from '@typhonjs-fvtt/runtime/util';
import localize from '~/utility-functions/Localize.js';

// Randomly regenerates the UUID of the document
export default async function regenerateDocumentUUID(document) {
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