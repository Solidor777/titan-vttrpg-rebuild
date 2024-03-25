import CharacterDataModel from '~/document/types/actor/types/character/CharacterDataModel.js';
import getSchemaField from '~/helpers/utility-functions/GetSchemaField.js';
import getNumberField from '~/helpers/utility-functions/GetNumberField.js';
import getBooleanField from '~/helpers/utility-functions/GetBooleanField.js';

/**
 * Data model for NPC actors.
 * @augments CharacterDataModel
 */
export default class NPCDataModel extends CharacterDataModel {
   static _defineDocumentSchema() {
      const schema = super._defineDocumentSchema();
      schema.xp = getSchemaField({
         earned: getNumberField(),
      });
      schema.inspiration = getBooleanField(false);

      return schema;
   }
}
