<svelte:options accessors={true} />

<script>
   import { ApplicationShell } from '@typhonjs-fvtt/runtime/svelte/component/core';
   import { setContext } from 'svelte';
   import NPCSheetHeader from '~/document/types/actor/types/npc/NPCSheetHeader.svelte';
   import CharacterSheetBase from '~/document/types/actor/types/character/sheet/CharacterSheetBase.svelte';

   // Setup context variables
   export let elementRoot;
   export let document = void 0;
   export let applicationState = void 0;
   setContext('document', document);
   setContext('applicationState', applicationState);
</script>

<ApplicationShell bind:elementRoot>
   <CharacterSheetBase header={NPCSheetHeader} />
</ApplicationShell>
