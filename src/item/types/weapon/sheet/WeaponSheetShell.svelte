<svelte:options accessors={true} />

<script>
   import { ApplicationShell } from '@typhonjs-fvtt/runtime/svelte/component/core';
   import { setContext } from 'svelte';
   import { getContext } from 'svelte';
   import localize from '~/utility-functions/Localize.js';
   import Tabs from '~/helpers/svelte-components/Tabs.svelte';
   import ItemSheetChecksTab from '~/item/component/check/ItemSheetChecksTab.svelte';
   import ItemSheetRulesElementsTab from '~/item/component/rules-element/ItemSheetRulesElementsTab.svelte';
   import WeaponSheetAttacksTab from './WeaponSheetAttacksTab.svelte';
   import WeaponSheetDescriptionTab from './WeaponSheetDescriptionTab.svelte';
   import WeaponSheetHeader from './WeaponSheetHeader.svelte';
   import WeaponSheetSidebar from './WeaponSheetSidebar.svelte';

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
         label: localize('description'),
         id: 'description',
         component: WeaponSheetDescriptionTab,
      },
      {
         label: localize('attacks'),
         id: 'attacks',
         component: WeaponSheetAttacksTab,
      },
      {
         label: localize('checks'),
         id: 'checks',
         component: ItemSheetChecksTab,
      },
      {
         label: localize('rulesElements'),
         id: 'rulesElements',
         component: ItemSheetRulesElementsTab,
      },
   ];
</script>

<ApplicationShell bind:elementRoot>
   <div class="item-sheet">
      <!--Header-->
      <WeaponSheetHeader />

      <!--Content-->
      <div class="body">
         <!--Sidebar-->
         <div class="sidebar">
            <WeaponSheetSidebar />
         </div>

         <!--Tabs-->
         <div class="tabs">
            <Tabs {tabs} bind:activeTab={$appState.activeTab} />
         </div>
      </div>
   </div>
</ApplicationShell>

<style lang="scss">
   .item-sheet {
      @include flex-column;
      @include font-size-normal;

      .body {
         @include flex-row;
         flex-grow: 1;

         .sidebar {
            margin: var(--padding-large) var(--padding-large) 0 0;
         }

         .tabs {
            @include border;
            margin-top: var(--padding-large);
            flex-grow: 1;
         }
      }
   }
</style>
