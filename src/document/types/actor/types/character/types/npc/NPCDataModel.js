import CharacterDataModel from '~/document/types/actor/types/character/CharacterDataModel.js';
import getStringField from '~/helpers/utility-functions/GetStringField.js';

/**
 * Data model for NPC actors.
 * @augments CharacterDataModel
 */
export default class NPCDataModel extends CharacterDataModel {
   static _defineDocumentSchema() {
      const schema = super._defineDocumentSchema();
      schema.type = getStringField();
      schema.role = getStringField('warrior');

      return schema;
   }
}
