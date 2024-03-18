<svelte:options accessors={true} />

<script>
   import { ApplicationShell } from '@typhonjs-fvtt/runtime/svelte/component/core';
   import { setContext } from 'svelte';
   import ItemSheetBase from '~/item/sheet/ItemSheetBase.svelte';
   import ItemSheetSidebar from '~/item/sheet/ItemSheetSidebar.svelte';
   import AbilitySheetHeader from '~/item/types/ability/sheet/AbilitySheetHeader.svelte';
   import AbilitySheetTabs from '~/item/types/ability/sheet/AbilitySheetTabs.svelte';

   // Setup context variables
   export let elementRoot;
   export let document;
   export let applicationState;
   setContext('document', document);
   setContext('applicationState', applicationState);
</script>

<ApplicationShell bind:elementRoot>
   <ItemSheetBase
      header={AbilitySheetHeader}
      sidebar={ItemSheetSidebar}
      tabs={AbilitySheetTabs}
   />
</ApplicationShell>
