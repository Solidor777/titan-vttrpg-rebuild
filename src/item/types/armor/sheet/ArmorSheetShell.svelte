<svelte:options accessors={true} />

<script>
   import { ApplicationShell } from '@typhonjs-fvtt/runtime/svelte/component/core';
   import { setContext } from 'svelte';
   import ArmorSheetHeader from '~/item/types/armor/sheet/ArmorSheetHeader.svelte';
   import ArmorSheetSidebar from '~/item/types/armor/sheet/ArmorSheetSidebar.svelte';
   import ArmorSheetTabs from '~/item/types/armor/sheet/ArmorSheetTabs.svelte';
   import ItemSheetBase from '~/item/sheet/ItemSheetBase.svelte';

   // Setup context variables
   export let elementRoot;
   export let document;
   export let applicationState;
   setContext('document', document);
   setContext('applicationState', applicationState);
</script>

<ApplicationShell bind:elementRoot>
   <ItemSheetBase
      header={ArmorSheetHeader}
      sidebar={ArmorSheetSidebar}
      tabs={ArmorSheetTabs}
   />
</ApplicationShell>
