/**
 * Gets a string field set as required, and with an initial value.
 * Will be nullable if the initial value is null.
 * @param {string|null} [initial = '']      Initial value for the string field.
 * @returns {StringField}                   The string field.
 */
export default function getStringField(initial = '') {
   return new foundry.data.fields.StringField({
      required: true,
      initial: initial,
      nullable: initial === null,
   });
}
