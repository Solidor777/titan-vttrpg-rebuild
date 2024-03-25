/**
 * Gets a boolean field set as required, not nullable, and with an initial value.
 * @param {boolean} [initial = 0] Initial value for the number field.
 * @returns {NumberField}        The boolean field.
 */
export default function getBooleanField(initial = false) {
   return new foundry.data.fields.NumberField({
      required: true,
      initial: initial,
      nullable: false,
   });
}
