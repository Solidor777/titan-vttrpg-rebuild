<svelte:options accessors={true} />

<script>
   import { ApplicationShell } from '@typhonjs-fvtt/runtime/svelte/component/core';
   import { setContext } from 'svelte';
   import { getContext } from 'svelte';
   import localize from '~/utility-functions/Localize.js';
   import Tabs from '~/helpers/svelte-components/Tabs.svelte';
   import CharacterSheetSkillsTab from '~/actor/types/character/sheet/tabs/skills/CharacterSheetSkillsTab.svelte';
   import CharacterSheetAbilitiesTab from '~/actor/types/character/sheet/tabs/CharacterSheetAbilitiesTab.svelte';
   import CharacterSheetInventoryTab from '~/actor/types/character/sheet/tabs/inventory/CharacterSheetInventoryTab.svelte';
   import CharacterSheetSpellsTab from '~/actor/types/character/sheet/tabs/CharacterSheetSpellsTab.svelte';
   import CharacterSheetEffectsTab from '~/actor/types/character/sheet/tabs/CharacterSheetEffectsTab.svelte';
   import CharacterSheetNotesTab from '~/actor/types/character/sheet/tabs/CharacterSheetNotesTab.svelte';
   import NPCSheetSidebar from './NPCSidebar.svelte';
   import NPCSheetHeader from './NPCSheetHeader.svelte';

   // Setup context variables
   export let elementRoot;
   export let document;
   export let applicationState;
   setContext('document', document);
   setContext('applicationState', applicationState);
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

<ApplicationShell bind:elementRoot>
   <!--Sheet-->
   <div class="actor-sheet">
      <!--Sidebar-->
      <div class="sidebar">
         <NPCSheetSidebar />
      </div>

      <!--Sheet Body-->
      <div class="body">
         <!--Header -->
         <div class="header">
            <NPCSheetHeader />
         </div>

         <!--Tab Content-->
         <div class="tabs">
            <Tabs {tabs} bind:activeTab={$appState.activeTab} />
         </div>
      </div>
   </div>
</ApplicationShell>

<style lang="scss">
   .actor-sheet {
      @include flex-row;
      @include font-size-normal;
      display: flex;
      flex-grow: 1;

      .sidebar {
         margin-right: var(--padding-large);
      }

      .body {
         @include flex-column;
         flex-grow: 1;

         .tabs {
            @include border;
            margin-top: var(--padding-large);
            flex-grow: 1;
         }
      }
   }
</style>
