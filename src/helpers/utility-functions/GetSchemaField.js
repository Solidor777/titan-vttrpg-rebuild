/**
 * Gets a schema field containing the inputted fields.
 * @param {object} [schema = {} ]   Object containing the fields to wrap in the Schema field.
 * @returns {SchemaField}           The schema field.
 */
export default function getSchemaField(schema = {}) {
   return new foundry.data.fields.SchemaField(schema);
}
