import CharacterInventoryMap from '~/actor/types/character/document/CharacterInventoryMapReducer.js';
import { TJSDocument } from '@typhonjs-fvtt/runtime/svelte/store/fvtt/document';

export default class CharacterDocument extends TJSDocument {
   constructor(character, options) {
      super(character, options);

   }
}