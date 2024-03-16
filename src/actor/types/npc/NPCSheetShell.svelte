<svelte:options accessors={true} />

<script>
   import { ApplicationShell } from '@typhonjs-fvtt/runtime/svelte/component/core';
   import { setContext } from 'svelte';
   import NPCSheetHeader from '~/actor/types/npc/NPCSheetHeader.svelte';
   import CharacterSheet from '~/actor/types/character/sheet/CharacterSheet.svelte';

   // Setup context variables
   export let elementRoot;
   export let document = void 0;
   export let applicationState = void 0;
   setContext('document', document);
   setContext('applicationState', applicationState);
</script>

<ApplicationShell bind:elementRoot>
   <CharacterSheet header={NPCSheetHeader} />
</ApplicationShell>
