/**
 * Gets a number field set as required, not nullable, and with an initial value.
 * @param {number} [initial = 0] Initial value for the number field.
 * @returns {NumberField}        The number field.
 */
export default function getNumberField(initial = 0) {
   return new foundry.data.fields.NumberField({
      required: true,
      initial: initial,
      nullable: false,
   });
}
