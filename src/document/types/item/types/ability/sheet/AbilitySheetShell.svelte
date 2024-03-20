<svelte:options accessors={true} />

<script>
   import { ApplicationShell } from '@typhonjs-fvtt/runtime/svelte/component/core';
   import { setContext } from 'svelte';
   import ItemSheetBase from '~/document/types/item/sheet/ItemSheetBase.svelte';
   import ItemSheetSidebar from '~/document/types/item/sheet/ItemSheetSidebar.svelte';
   import AbilitySheetHeader from '~/document/types/item/types/ability/sheet/AbilitySheetHeader.svelte';
   import AbilitySheetTabs from '~/document/types/item/types/ability/sheet/AbilitySheetTabs.svelte';

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
