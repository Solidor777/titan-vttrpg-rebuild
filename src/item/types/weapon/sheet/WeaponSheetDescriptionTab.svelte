<script>
   import { getContext } from 'svelte';
   import localize from '~/utility-functions/Localize.js';
   import Tabs from '~/helpers/svelte-components/Tabs.svelte';
   import WeaponSheetAttackNotesTab from './WeaponSheetAttackNotesTab.svelte';
   import WeaponSheetItemDescriptionTab from './WeaponSheetItemDescriptionTab.svelte';

   // Setup context variables
   const appState = getContext('applicationState');

   // Tabs
   const tabs = [
      {
         label: localize('itemDescription'),
         id: 'itemDescription',
         component: WeaponSheetItemDescriptionTab,
      },
      {
         label: localize('attackNotes'),
         id: 'attackNotes',
         component: WeaponSheetAttackNotesTab,
      },
   ];
</script>

<div class="tab">
   <Tabs {tabs} bind:activeTab={$appState.activeDescriptionTab} />
</div>

<style lang="scss">
   .tab {
      @include flex-column;
      width: 100%;
      flex-grow: 1;
   }
</style>
