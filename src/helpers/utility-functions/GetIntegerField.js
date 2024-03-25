/**
 * Gets a number field set as an integer, required, not nullable, and with an initial value.
 * @param {number} [initial = 0] Initial value for the number field.
 * @returns {NumberField}        The integer number field.
 */
export default function getIntegerField(initial = 0) {
   return new foundry.data.fields.NumberField({
      required: true,
      initial: initial,
      integer: true,
      nullable: false,
   });
}
