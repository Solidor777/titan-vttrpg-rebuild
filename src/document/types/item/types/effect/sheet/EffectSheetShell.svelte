<svelte:options accessors={true} />

<script>
   import { ApplicationShell } from '@typhonjs-fvtt/runtime/svelte/component/core';
   import { setContext } from 'svelte';
   import ItemSheetSidebar from '~/document/types/item/sheet/ItemSheetSidebar.svelte';
   import ItemSheetBase from '~/document/types/item/sheet/ItemSheetBase.svelte';
   import EffectSheetTabs from '~/document/types/item/types/effect/sheet/EffectSheetTabs.svelte';
   import EffectSheetHeader from '~/document/types/item/types/effect/sheet/EffectSheetHeader.svelte';

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
