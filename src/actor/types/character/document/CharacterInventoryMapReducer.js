import { DynMapReducer } from '@typhonjs-fvtt/runtime/svelte/store/reducer';
import sort from '~/utility-functions/Sort.js';

export default class CharacterInventoryMapReducer extends DynMapReducer {
   initialize() {
      // Get the items of the currect type
      const inventoryTypes = ['armor', 'commodity', 'equipment', 'shield', 'weapon'];
      this.filters.add((item) => inventoryTypes.includes(item.type));
      this.sort.set((a, b) => sort(a.sort, b.sort));

      // Create sub reducers for each item type
      this.types = {};
      for (const type of inventoryTypes) {
         this.types[type] = this.derived.create([type]);
         this.types[type].filters.add((item) => item.type === type);
      }
   }
}
