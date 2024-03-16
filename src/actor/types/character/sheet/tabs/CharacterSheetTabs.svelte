<svelte:options accessors={true} />

<script>
   import { getContext } from 'svelte';
   import localize from '~/utility-functions/Localize.js';
   import Tabs from '~/helpers/svelte-components/Tabs.svelte';
   import CharacterSheetSkillsTab from '~/actor/types/character/sheet/tabs/skills/CharacterSheetSkillsTab.svelte';
   import CharacterSheetAbilitiesTab from '~/actor/types/character/sheet/tabs/CharacterSheetAbilitiesTab.svelte';
   import CharacterSheetInventoryTab from '~/actor/types/character/sheet/tabs/inventory/CharacterSheetInventoryTab.svelte';
   import CharacterSheetSpellsTab from '~/actor/types/character/sheet/tabs/CharacterSheetSpellsTab.svelte';
   import CharacterSheetEffectsTab from '~/actor/types/character/sheet/tabs/CharacterSheetEffectsTab.svelte';
   import CharacterSheetNotesTab from '~/actor/types/character/sheet/tabs/CharacterSheetNotesTab.svelte';

   const appState = getContext('applicationState');

   // Tabs
   const tabs = [
      {
         label: localize('skills'),
         id: 'skills',
         component: CharacterSheetSkillsTab,
      },
      {
         label: localize('inventory'),
         id: 'inventory',
         component: CharacterSheetInventoryTab,
      },
      {
         label: localize('abilities'),
         id: 'abilities',
         component: CharacterSheetAbilitiesTab,
      },
      {
         label: localize('spells'),
         id: 'spells',
         component: CharacterSheetSpellsTab,
      },
      {
         label: localize('effects'),
         id: 'effects',
         component: CharacterSheetEffectsTab,
      },
      {
         label: localize('notes'),
         id: 'notes',
         component: CharacterSheetNotesTab,
      },
   ];
</script>

<Tabs {tabs} bind:activeTab={$appState.activeTab} />
