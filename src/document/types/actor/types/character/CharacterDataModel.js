import getStringField from '~/helpers/utility-functions/GetStringField.js';
import getIntegerField from '~/helpers/utility-functions/GetIntegerField.js';
import getSchemaField from '~/helpers/utility-functions/GetSchemaField.js';
import getSetting from '~/helpers/utility-functions/GetSetting.js';
import ActorDataModel from '~/document/types/actor/ActorDataModel.js';

/**
 * Actor data model with extra functionality for characters.
 * @augments ActorDataModel
 */
export default class CharacterDataModel extends ActorDataModel {
   static _defineDocumentSchema() {
      const schema = super._defineDocumentSchema();

      // Gets a schema field formatted as a mod for a character state (skills, attributes, resistances, etc.).
      function getStatModSchema() {
         return getSchemaField({
            static: getIntegerField(0),
         });
      }

      // Gets a schema field formatted as a character attribute (body, mind, or soul).
      function getBaseStatSchema() {
         return getSchemaField({
            baseValue: getIntegerField(1),
            mod: getStatModSchema(),
         });
      }

      // Gets a schema field formatted as a character resistance (reflexes, resilience, or willpower).
      function getDerivedStatSchema() {
         return getSchemaField({
            mod: getStatModSchema(),
         });
      }

      // Gets a schema field formatted as a character skill (athletics, perception, etc.).
      function getSkillSchema(defaultAttribute) {
         return getSchemaField({
            defaultAttribute: getStringField(defaultAttribute),
            training: getBaseStatSchema(),
            expertise: getBaseStatSchema(),
         });
      }

      // Gets a schema field formatted as a character resource (stamina, resolve, or wounds).
      function getResourceSchema(initial) {
         return getSchemaField({
            value: getIntegerField(initial),
            mod: getStatModSchema(),
         });
      }

      // Add attributes
      schema.attribute = getSchemaField({
         body: getBaseStatSchema(),
         mind: getBaseStatSchema(),
         soul: getBaseStatSchema(),
      });

      // Add resistances
      schema.resistance = getSchemaField({
         reflexes: getDerivedStatSchema(),
         resilience: getDerivedStatSchema(),
         willpower: getDerivedStatSchema(),
      });

      // Add skills
      schema.skill = getSchemaField({
         arcana: getSkillSchema('mind'),
         athletics: getSkillSchema('body'),
         deception: getSkillSchema('mind'),
         dexterity: getSkillSchema('body'),
         diplomacy: getSkillSchema('soul'),
         engineering: getSkillSchema('mind'),
         intimidation: getSkillSchema('body'),
         investigation: getSkillSchema('mind'),
         lore: getSkillSchema('mind'),
         medicine: getSkillSchema('mind'),
         meleeWeapons: getSkillSchema('body'),
         metaphysics: getSkillSchema('soul'),
         nature: getSkillSchema('mind'),
         perception: getSkillSchema('mind'),
         performance: getSkillSchema('soul'),
         rangedWeapons: getSkillSchema('body'),
         subterfuge: getSkillSchema('mind'),
         stealth: getSkillSchema('body'),
      });

      // Add ratings
      schema.rating = getSchemaField({
         awareness: getDerivedStatSchema(),
         defense: getDerivedStatSchema(),
         melee: getDerivedStatSchema(),
         accuracy: getDerivedStatSchema(),
         initiative: getDerivedStatSchema(),
      });

      // Add resources
      schema.resource = getSchemaField({
         stamina: getResourceSchema(Math.ceil(3 * getSetting('staminaBaseMultiplier'))),
         resolve: getResourceSchema(Math.ceil(1 * getSetting('resolveBaseMultiplier'))),
         wounds: getResourceSchema(0),
      });

      // Add speeds
      schema.speed = getSchemaField({
         stride: getBaseStatSchema(),
         fly: getBaseStatSchema(),
         climb: getBaseStatSchema(),
         swim: getBaseStatSchema(),
         burrow: getBaseStatSchema(),
      });

      // Add mods
      schema.mod = getSchemaField({
         armor: getDerivedStatSchema(),
         damage: getDerivedStatSchema(),
         healing: getDerivedStatSchema(),
         resolveRegain: getDerivedStatSchema(),
         woundRegain: getDerivedStatSchema(),
      });

      // Add equipment
      schema.equipped = getSchemaField({
         armor: getStringField(null),
         shield: getStringField(null),
      });

      // Add description
      schema.description = getStringField();

      return schema;
   }

   _getInitialPrototypeTokenData(data) {
      const retVal = {
         displayName: data.prototypeToken?.displayName ?? CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER,
         displayBars: data.prototypeToken?.displayBars ?? CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER,
      };

      return retVal;
   }

   _calculateBaseRatings() {
      const systemData = this.parent.system;

      // Calculate the base value of ratings
      // Initiative = (Mind + Perception + Dexterity) / 2 rounded up
      systemData.rating.initiative.baseValue =
         Math.ceil((systemData.attribute.mind.baseValue +
            systemData.skill.perception.training.baseValue +
            systemData.skill.dexterity.training.baseValue) / 2);

      // Awareness = (Mind + Perception) / 2 rounded up
      systemData.rating.awareness.baseValue =
         Math.ceil((systemData.attribute.mind.baseValue +
            systemData.skill.perception.training.baseValue) / 2);

      // Defense = (Body + Dexterity) / 2 rounded up
      systemData.rating.defense.baseValue =
         Math.ceil((systemData.attribute.body.baseValue +
            systemData.skill.dexterity.training.baseValue) / 2);

      // Accuracy = (Mind + Training in Ranged Weapons) / 2 rounded up
      systemData.rating.accuracy.baseValue =
         Math.ceil((systemData.attribute.mind.baseValue +
            systemData.skill.rangedWeapons.training.baseValue) / 2);

      // Melee = (Body + Training in Melee Weapons) / 2 rounded up
      systemData.rating.melee.baseValue =
         Math.ceil((systemData.attribute.body.baseValue +
            systemData.skill.meleeWeapons.training.baseValue) / 2);

      return;
   }
}
