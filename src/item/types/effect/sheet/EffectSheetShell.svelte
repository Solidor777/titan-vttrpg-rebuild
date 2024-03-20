<svelte:options accessors={true} />

<script>
   import { ApplicationShell } from '@typhonjs-fvtt/runtime/svelte/component/core';
   import { setContext } from 'svelte';
   import ItemSheetSidebar from '~/item/sheet/ItemSheetSidebar.svelte';
   import ItemSheetBase from '~/item/sheet/ItemSheetBase.svelte';
   import EffectSheetTabs from '~/item/types/effect/sheet/EffectSheetTabs.svelte';
   import EffectSheetHeader from '~/item/types/effect/sheet/EffectSheetHeader.svelte';

   // Setup context variables
   export let elementRoot;
   export let document;
   export let applicationState;
   setContext('document', document);
   setContext('applicationState', applicationState);
</script>

<ApplicationShell bind:elementRoot>
   <ItemSheetBase
      header={EffectSheetHeader}
      sidebar="{ItemSheetSidebar},"
      tabs={EffectSheetTabs}
   />
</ApplicationShell>
