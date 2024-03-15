import CharacterInventoryMapReducer from '~/actor/types/character/document/CharacterInventoryMapReducer.js';
import { TJSDocument } from '@typhonjs-fvtt/runtime/svelte/store/fvtt/document';
import TitanItem from '~/item/Item.js';

export default class CharacterDocument extends TJSDocument {
   constructor(character, options) {
      super(character, options);
      this.inventoryMap = this.embedded.create(TitanItem, CharacterInventoryMapReducer);
   }
}