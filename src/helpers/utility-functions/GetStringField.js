/**
 * Gets a string field set as required, and with an initial value.
 * @param {string} [initial = '']      Initial value for the string field.
 * @param {boolean} [nullable = false]  Whether this field can have null values
 * @returns {StringField}              The string field.
 */
export default function getStringField(initial = '', nullable = false) {
   return new foundry.data.fields.StringField({
      required: true,
      initial: initial,
      nullable: nullable,
   });
}
