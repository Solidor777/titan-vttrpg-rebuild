import TitanDataModel from '~/document/data-model/DataModel.js';

/**
 * Data model with extra functionality for actors.
 * @augments TitanDataModel
 */
export default class ActorDataModel extends TitanDataModel {
   onPreCreate(data) {
      super.onPreCreate(data);

      // Initialize prototype token data
      const prototypeTokenData = this._getInitialPrototypeTokenData(data);
      if (prototypeTokenData) {
         this.parent.prototypeToken.updateSource(prototypeTokenData);
      }

      return;
   }

   /**
    * Gets the initial data for the actor's prototype token.
    * @param {object} data            The initial data object provided to the document creation request.
    * @returns {object|boolean}       The initial data for the prototype token,
    *                                 or false if there is no data to initialize.
    * @protected
    */
   // eslint-disable-next-line unused-imports/no-unused-vars
   _getInitialPrototypeTokenData(data) {
      return false;
   }
}
