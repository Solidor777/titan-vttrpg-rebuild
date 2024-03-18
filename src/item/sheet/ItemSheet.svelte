<svelte:options accessors={true} />

<script>
   import { ApplicationShell } from '@typhonjs-fvtt/runtime/svelte/component/core';
   import { setContext } from 'svelte';
   import { getContext } from 'svelte';
   import localize from '~/utility-functions/Localize.js';
   import Tabs from '~/helpers/svelte-components/Tabs.svelte';
   import AbilitySheetHeader from './AbilitySheetHeader.svelte';
   import ItemSheetChecksTab from '~/item/component/check/ItemSheetChecksTab.svelte';
   import ItemSheetDescriptionTab from '~/item/sheet/ItemSheetDescriptionTab.svelte';
   import ItemSheetRulesElementsTab from '~/item/component/rules-element/ItemSheetRulesElementsTab.svelte';
   import ItemSheetSidebar from '~/item/sheet/ItemSheetSidebar.svelte';

   // Header, sidebar, and tabs to allow this layout to be used by multiple item types
   export let header = void 0;
   export let sidebar = void 0;
   export let tabs = void 0;

</script>

<div class="item-sheet">
   <!--Header-->
   <div class="header">
      <svelte:component this={header} />
   </div>

   <!--Sheet body-->
   <div class="body">

      <!--Sidebar-->
      <div class="sidebar">
         <svelte:component this={sidebar} />
      </div>

      <div></div>

      <!--Tabs-->
      <div class="tabs">
         <svelte:component this={tabs} />
      </div>
   </div>
</div>

<style lang="scss">
   .item-sheet {
      @include flex-column;
      @include font-size-normal;

      .header {
         @include border;
      }

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
            @include flex-row;
            margin-top: var(--padding-large);
            width: 100%;
         }
      }
   }
</style>
