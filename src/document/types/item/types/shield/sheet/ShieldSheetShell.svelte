<svelte:options accessors={true} />

<script>
   import { ApplicationShell } from '@typhonjs-fvtt/runtime/svelte/component/core';
   import { setContext } from 'svelte';
   import ItemSheetBase from '~/document/types/item/sheet/ItemSheetBase.svelte';
   import ShieldSheetHeader from '~/document/types/item/types/shield/sheet/ShieldSheetHeader.svelte';
   import ShieldSheetSidebar from '~/document/types/item/types/shield/sheet/ShieldSheetSidebar.svelte';
   import ShieldSheetTabs from '~/document/types/item/types/shield/sheet/ShieldSheetTabs.svelte';

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
