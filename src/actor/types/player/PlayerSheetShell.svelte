<svelte:options accessors={true} />

<script>
   import { ApplicationShell } from '@typhonjs-fvtt/runtime/svelte/component/core';
   import { setContext } from 'svelte';
   import PlayerSheetHeader from '~/actor/types/player/PlayerSheetHeader.svelte';
   import CharacterSheetBase from '~/actor/types/character/sheet/CharacterSheetBase.svelte';

   // Setup context variables
   export let elementRoot;
   export let document = void 0;
   export let applicationState = void 0;
   setContext('document', document);
   setContext('applicationState', applicationState);
</script>

<ApplicationShell bind:elementRoot>
   <CharacterSheetBase header={PlayerSheetHeader} />
</ApplicationShell>
