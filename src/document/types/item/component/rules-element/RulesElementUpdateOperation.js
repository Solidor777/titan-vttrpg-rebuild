import { getFlatModifierTemplate } from '~/document/types/item/rules-element/FlatModifier.js';
import { getMulBaseTemplate } from '~/document/types/item/rules-element/MulBase.js';
import { getFastHealingTemplate } from '~/document/types/item/rules-element/FastHealing.js';
import { getPersistentDamageTemplate } from '~/document/types/item/rules-element/PersistentDamage';
import { getTurnMessageTemplate } from '~/document/types/item/rules-element/TurnMessage';
import { getRollMessageTemplate } from '~/document/types/item/rules-element/RollMessage';
import { getConditionalRatingModifierTemplate } from '~/document/types/item/rules-element/ConditionalRatingModifier';
import { getConditionalCheckModifierTemplate } from '~/document/types/item/rules-element/ConditionalCheckModifier';

export default async function onRulesElementOperationChanged(document, elementIdx) {
   const element = document.system.rulesElement[elementIdx];
   switch (element.operation) {
      case 'flatModifier': {
         document.system.rulesElement[elementIdx] = getFlatModifierTemplate(element.uuid, element.type);
         break;
      }
      case 'mulBase': {
         document.system.rulesElement[elementIdx] = getMulBaseTemplate(element.uuid, element.type);
         break;
      }
      case 'fastHealing': {
         document.system.rulesElement[elementIdx] = getFastHealingTemplate(element.uuid, element.type);
         break;
      }
      case 'persistentDamage': {
         document.system.rulesElement[elementIdx] = getPersistentDamageTemplate(element.uuid, element.type);
         break;
      }
      case 'turnMessage': {
         document.system.rulesElement[elementIdx] = getTurnMessageTemplate(element.uuid, element.type);
         break;
      }
      case 'rollMessage': {
         document.system.rulesElement[elementIdx] = getRollMessageTemplate(element.uuid, element.type);
         break;
      }
      case 'conditionalRatingModifier': {
         document.system.rulesElement[elementIdx] = getConditionalRatingModifierTemplate(element.uuid, element.type);
         break;
      }
      case 'conditionalCheckModifier': {
         document.system.rulesElement[elementIdx] = getConditionalCheckModifierTemplate(element.uuid, element.type);
         break;
      }
      default: {
         console.error(`TITAN: Invalid Rules Element operation ${element.operation}`);
         console.trace();
         return;
      }
   }

   return await document.update({
      system: {
         rulesElement: document.system.rulesElement
      }
   });
}