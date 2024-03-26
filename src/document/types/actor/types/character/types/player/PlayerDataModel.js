import CharacterDataModel from '~/document/types/actor/types/character/CharacterDataModel.js';
import getSchemaField from '~/helpers/utility-functions/GetSchemaField.js';
import getNumberField from '~/helpers/utility-functions/GetNumberField.js';
import getBooleanField from '~/helpers/utility-functions/GetBooleanField.js';

/**
 * Data model for player actors.
 * @augments CharacterDataModel
 */
export default class PlayerDataModel extends CharacterDataModel {
   static _defineDocumentSchema() {
      const schema = super._defineDocumentSchema();
      schema.xp = getSchemaField({
         earned: getNumberField(),
      });
      schema.inspiration = getBooleanField(false);

      return schema;
   }

   _getInitialPrototypeTokenData(data) {
      const retVal = super._getInitialPrototypeTokenData(data);
      retVal.actorLink = data.prototypeToken?.actorLink ?? true;
      retVal.disposition = data.prototypeToken?.disposition ?? CONST.TOKEN_DISPOSITIONS.FRIENDLY;
      retVal.sight = {
         enabled: data.prototypeToken?.sight?.enabled ?? true,
      };

      return retVal;
   }
}
