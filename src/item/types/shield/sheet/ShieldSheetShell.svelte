<svelte:options accessors={true} />

<script>
   import { ApplicationShell } from '@typhonjs-fvtt/runtime/svelte/component/core';
   import { setContext } from 'svelte';
   import ItemSheetBase from '~/item/sheet/ItemSheetBase.svelte';
   import ShieldSheetHeader from '~/item/types/shield/sheet/ShieldSheetHeader.svelte';
   import ShieldSheetSidebar from '~/item/types/shield/sheet/ShieldSheetSidebar.svelte';
   import ShieldSheetTabs from '~/item/types/shield/sheet/ShieldSheetTabs.svelte';

   // Setup context variables
   export let elementRoot;
   export let document;
   export let applicationState;
   setContext('document', document);
   setContext('applicationState', applicationState);
</script>

<ApplicationShell bind:elementRoot>
   <ItemSheetBase
      header={ShieldSheetHeader}
      sidebar={ShieldSheetSidebar}
      tabs={ShieldSheetTabs}
   />
</ApplicationShell>
