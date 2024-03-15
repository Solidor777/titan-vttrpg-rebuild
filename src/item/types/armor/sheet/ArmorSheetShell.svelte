<svelte:options accessors={true} />

<script>
   import { ApplicationShell } from '@typhonjs-fvtt/runtime/svelte/component/core';
   import { setContext } from 'svelte';
   import { getContext } from 'svelte';
   import localize from '~/utility-functions/Localize.js';
   import Tabs from '~/helpers/svelte-components/Tabs.svelte';
   import ItemSheetChecksTab from '~/item/component/check/ItemSheetChecksTab.svelte';
   import ItemSheetRulesElementsTab from '~/item/component/rules-element/ItemSheetRulesElementsTab.svelte';
   import ArmorSheetHeader from './ArmorSheetHeader.svelte';
   import ArmorSheetSidebar from './ArmorSheetSidebar.svelte';
   import ItemSheetDescriptionTab from '~/item/sheet/ItemSheetDescriptionTab.svelte';

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
         component: ItemSheetDescriptionTab,
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
      <div class="header">
         <ArmorSheetHeader />
      </div>

      <!--Content-->
      <div class="body">
         <!--Sidebar-->
         <div class="sidebar"><ArmorSheetSidebar /></div>

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
      display: flex;
      flex: 1;

      .body {
         @include flex-row;
         height: 100%;
         width: 100%;

         .sidebar {
            @include flex-row;
            width: 13rem;
            min-width: 13rem;
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
