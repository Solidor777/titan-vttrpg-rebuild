import localize from '~/helpers/utility-functions/Localize.js';
import shouldConfirmDeletingItems from '~/helpers/utility-functions/ShouldConfirmDeletingItems.js';
import ConfirmDeleteItemDialog from '~/document/types/actor/dialogs/ConfirmDeleteItemDialog';

/**
 * Extends the base Actor class to implement additional system-specific logic.
 * @augments {Actor}
 * @param {object} data                   The initial data object provided to the document creation request
 * @param {object} options                Additional options which modify the creation request
 * @param {documents.BaseUser} user       The User requesting the document creation
 */
export default class TitanActor extends Actor {
   async _preCreate(data, options, user) {
      const retVal = await super._preCreate(data, options, user);

      // Update initial data if provided by the data model
      if (retVal !== false && typeof this.system.onPreCreate === 'function') {
         this.system.onPreCreate(data);
      }

      return retVal;
   }

   /**
    * Deletes an item from the actor,
    * with a dialog to confirm deletion if appropriate
    * @param {string} itemId        The ID of the item being deleted.
    * @param {confirmed} confirmed  Whether deletion of the item is already confirmed.
    * @returns {boolean}            Returns true if the item was deleted or a dialog was created
    *                               or false if the item was invalid.
    */
   async deleteItem(itemId, confirmed) {
      // Ensure that the user is an item owner
      if (this.isOwner) {

         // Ensure the item is valid
         const item = this.items.get(itemId);
         if (!item) {
            return false;
         }

         // Check if the deletion is confirmed
         if (confirmed || !shouldConfirmDeletingItems()) {

            // Delete the item
            if (this._sheet) {
               this._sheet.deleteItem(itemId);
            }

            await item.delete();
            return true;
         }

         // Otherwise, confirm deleting the item
         const dialog = new ConfirmDeleteItemDialog(this, item);
         dialog.render(true);

         return true;
      }
   }

   /**
    * Adds an item of the inputted type to the actor.
    * @param {string} type          The type of item to add.
    */
   async addItem(type) {
      if (this.isOwner) {
         let itemName;
         switch (type) {
            case 'ability': {
               itemName = localize('newAbility');
               break;
            }
            case 'armor': {
               itemName = localize('newArmor');
               break;
            }
            case 'commodity': {
               itemName = localize('newCommodity');
               break;
            }
            case 'effect': {
               itemName = localize('newEffect');
               break;
            }
            case 'equipment': {
               itemName = localize('newEquipment');
               break;
            }
            case 'shield': {
               itemName = localize('newShield');
               break;
            }
            case 'spell': {
               itemName = localize('newSpell');
               break;
            }
            case 'weapon': {
               itemName = localize('newWeapon');
               break;
            }
            default: {
               itemName = localize('newItem');
               break;
            }
         }

         const itemData = {
            name: itemName,
            type: type,
         };

         await this.createEmbeddedDocuments('Item', [itemData]);
         return;
      }
   }
}
