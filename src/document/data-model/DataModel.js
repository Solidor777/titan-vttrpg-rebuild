import getNumberField from '~/helpers/utility-functions/GetNumberField.js';

/**
 * A specialized subclass of TypeDataModel,
 * with extra functionality to support data model components and version migrations.
 * @augments {TypeDataModel}
 */
export default class TitanDataModel extends foundry.abstract.TypeDataModel {
   constructor(data, options) {
      super(data, options);

      // Construct the document components
      const components = {};
      for (const [key, component] of Object.entries(this.constructor._prototypeComponents)) {
         components[key] = new component(this);
         Object.defineProperty(this.parent, key, {
            get() {
               return this.#components[key];
            },
         });
      }
      this.#components = Object.freeze(components);
   }

   /**
    * Static getter for the data model's latest version number.
    * @type {number}
    * @private
    */
   static get latestVersion() {
      return 0;
   }

   /**
    * Static getter for the base components used for construction.
    * @type {object}
    * @private
    */
   static get _prototypeComponents() {
      return {};
   }

   static defineSchema() {
      // Define the document schema
      const documentSchema = this._defineDocumentSchema();

      // Add each component's schema to the document schema
      for (const [key, component] of Object.entries(this._prototypeComponents)) {
         if (component.defineSchema !== undefined) {
            documentSchema[key] = component.defineSchema();
         }
      }
      return documentSchema;
   }

   /**
    * Defines the schema for the document, minus the component schemas.
    * Component schemas are added later.
    * @returns {object}  The document schema, minus the component schemas.
    * @protected
    */
   static _defineDocumentSchema() {
      return {
         documentVersion: getNumberField(this.latestVersion),
      };
   }

   static migrateData(source) {
      return super.migrateData(this._migrateComponentData(source));
   }

   /**
    * Migrates the data for each component.
    * @param {object} source     The source data.
    * @returns {object}          The migrated data.
    * @protected
    */
   static _migrateComponentData(source) {
      for (const component of Object.entries(this._prototypeComponents)) {
         if (typeof component.migrateData === 'function') {
            component.migrateData(source);
         }
      }
      return source;
   }

   /**
    * The map of the data model's component.
    * @type {object}
    */
   #components;

   /**
    * Getter for the map of the data model's components.
    * @returns {object}    The map of the data model's component.
    */
   get components() {
      return this.#components;
   }

   /**
    * Perform preliminary operations before a data model of this type is created.
    * Pre-creation operations only occur for the client which requested the operation.
    * Modifications to the pending document before it is persisted should be performed with this.parent.updateSource().
    * @param {object} data    The initial data object provided to the document creation request.
    */
   onPreCreate(data) {
      // Initialize document data
      const documentData = this._getInitialDocumentData(data);
      if (documentData) {
         this.parent.updateSource(documentData);
      }

      return;
   }

   /**
    * Gets the initial data for this document.
    * @param {object} data            The initial data object provided to the document creation request.
    * @returns {object|boolean}       The initial data for the character,
    *                                 or false if there is no data to initialize.
    * @protected
    */
   // eslint-disable-next-line unused-imports/no-unused-vars
   _getInitialDocumentData(data) {
      return false;
   }


   prepareDerivedData() {
      this._prepareComponentDerivedData();
      super.prepareDerivedData();

      return;
   }

   /**
    * Prepares the data for each data model component.
    * @protected
    */
   _prepareComponentDerivedData() {
      for (const component of Object.entries(this.components)) {
         if (typeof component.prepareDerivedData === 'function') {
            component.prepareDerivedData();
         }
      }

      return;
   }
}
