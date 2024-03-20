<svelte:options accessors={true} />

<script>
   import { ApplicationShell } from '@typhonjs-fvtt/runtime/svelte/component/core';
   import { setContext } from 'svelte';
   import localize from '~/utility-functions/Localize.js';
   import ItemSheetChecksTab from '~/item/component/check/ItemSheetChecksTab.svelte';
   import ItemSheetDescriptionTab from '~/item/sheet/ItemSheetDescriptionTab.svelte';
   import ItemSheetSidebar from '~/item/sheet/ItemSheetSidebar.svelte';
   import ItemSheetBase from '~/item/sheet/ItemSheetBase.svelte';
   import CommoditySheetHeader from '~/item/types/commodity/sheet/CommoditySheetHeader.svelte';
   import CommoditySheetTabs from '~/item/types/commodity/sheet/CommoditySheetTabs.svelte';

   // Setup context variables
   export let elementRoot;
   export let document;
   export let applicationState;
   setContext('document', document);
   setContext('applicationState', applicationState);

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
   ];
</script>

<ApplicationShell bind:elementRoot>
   <ItemSheetBase
      header={CommoditySheetHeader}
      sidebar={ItemSheetSidebar}
      tabs={CommoditySheetTabs}
   />
</ApplicationShell>
