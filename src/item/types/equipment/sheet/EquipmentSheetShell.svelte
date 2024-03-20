<svelte:options accessors={true} />

<script>
   import { ApplicationShell } from '@typhonjs-fvtt/runtime/svelte/component/core';
   import { setContext } from 'svelte';
   import ItemSheetBase from '~/item/sheet/ItemSheetBase.svelte';
   import ItemSheetSidebar from '~/item/sheet/ItemSheetSidebar.svelte';
   import EquipmentSheetHeader from '~/item/types/equipment/sheet/EquipmentSheetHeader.svelte';
   import EquipmentSheetTabs from '~/item/types/equipment/sheet/EquipmentSheetTabs.svelte';

   // Setup context variables
   export let elementRoot;
   export let document;
   export let applicationState;
   setContext('document', document);
   setContext('applicationState', applicationState);
</script>

<ApplicationShell bind:elementRoot>
   <ItemSheetBase
      header={EquipmentSheetHeader}
      sidebar={ItemSheetSidebar}
      tabs={EquipmentSheetTabs}
   />
</ApplicationShell>
