import TitanDataModel from '~/document/data-model/DataModel.js';
import getStringField from '~/helpers/utility-functions/GetStringField.js';
import getIntegerField from '~/helpers/utility-functions/GetIntegerField.js';
import getSchemaField from '~/helpers/utility-functions/GetSchemaField.js';
import getSetting from '~/helpers/utility-functions/GetSetting.js';

/**
 * Data model for Character actors.
 * @augments TitanDataModel
 */
export default class CharacterDataModel extends TitanDataModel {
   static _defineDocumentSchema() {
      const schema = super._defineDocumentSchema();

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
         stamina: getResourceSchema(3 * getSetting('staminaBaseMultiplier')),
         resolve: getResourceSchema(1 * getSetting('resolveBaseMultiplier')),
         wounds: getResourceSchema(0),
      });

      // Add speeds
      schema.speeds = getSchemaField({
         stride: getBaseStatSchema(),
         fly: getBaseStatSchema(),
         climb: getBaseStatSchema(),
         swim: getBaseStatSchema(),
         burrow: getBaseStatSchema(),
      });

      // Add mods
      schema.mod = getSchemaField({
         armor: getStatModSchema(),
         damage: getStatModSchema(),
         healing: getStatModSchema(),
         resolveRegain: getStatModSchema(),
         woundRegain: getStatModSchema(),
      });

      // Add equipment
      schema.equipped = getSchemaField({
         armor: getStringField(null, true),
         shield: getStringField(null, true),
      });

      // Add description
      schema.description = getStringField();

      return schema;
   }
}

/**
 * Gets a schema field formatted as a mod for a character state (skills, attributes, resistances, etc.).
 * @returns {SchemaField}  The complete stat mod schema field.
 */
function getStatModSchema() {
   return getSchemaField({
      static: getIntegerField(0),
   });
}

/**
 * Gets a schema field formatted as a character attribute (body, mind, or soul).
 * @returns {SchemaField}  The complete attribute schema field.
 */
function getBaseStatSchema() {
   return getSchemaField({
      baseValue: getIntegerField(1),
      mod: getStatModSchema(),
   });
}

/**
 * Gets a schema field formatted as a character resistance (reflexes, resilience, or willpower).
 * @returns {SchemaField}      The complete resistance schema field.
 */
function getDerivedStatSchema() {
   return getSchemaField({
      mod: getStatModSchema(),
   });
}

/**
 * Gets a schema field formatted as a character skill (athletics, perception, etc.).
 * @param {string} defaultAttribute    The default attribute for the skill.
 * @returns {SchemaField}              The complete skill schema field.
 */
function getSkillSchema(defaultAttribute) {
   return getSchemaField({
      defaultAttribute: getStringField(defaultAttribute),
      training: getBaseStatSchema(),
      expertise: getBaseStatSchema(),
   });
}

/**
 * Gets a schema field formatted as a character resource (stamina, resolve, or wounds).
 * @param {number} initial    The initial value for the resource.
 * @returns {SchemaField}     The complete skill schema field.
 */
function getResourceSchema(initial) {
   return getSchemaField({
      value: getIntegerField(initial),
      mod: getStatModSchema(),
   });
}


