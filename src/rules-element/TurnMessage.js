import { Hashing } from '@typhonjs-fvtt/runtime/util';
import sortObjectsIntoContainerByKeyValue from '~/utility-functions/SortObjectsIntoContainerByKeyValue.js';
import isHTMLBlank from '~/utility-functions/IsHTMLBlank.js';

export function getTurnMessageTemplate(uuid, type) {
   return {
      operation: 'turnMessage',
      selector: 'turnStart',
      message: '',
      uuid: uuid ?? Hashing.uuidv4(),
      type: type ?? ''
   };
}

export function applyTurnMessageElements(elements) {
   if (elements.length > 0) {
      const turnMessage = {};
      // Sort elements by selector
      const selectors = sortObjectsIntoContainerByKeyValue(elements, 'selector');

      // For each selector
      for (const [selector, selectorElements] of Object.entries(selectors)) {
         const selectorMessages = [];
         for (const element of selectorElements) {
            if (!isHTMLBlank(element.message) && selectorMessages.indexOf(element.message) < 0) {
               selectorMessages.push(element.message);
            }
         }

         if (selectorMessages.length > 0) {
            turnMessage[selector] = selectorMessages;
         }
      }

      if (Object.keys(turnMessage).length > 0) {
         this.turnMessage = turnMessage;
         return;
      }

   }
   this.turnMessage = false;
   return;
}