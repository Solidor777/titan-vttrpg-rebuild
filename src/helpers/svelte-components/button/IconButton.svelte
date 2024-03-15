<script>
   import preventDefault from '~/helpers/svelte-actions/PreventDefault.js';
   import { ripple } from '@typhonjs-fvtt/runtime/svelte/action/animate';

   export let icon = void 0;
   export let efx = ripple();
   export let disabled = false;
</script>

<button on:click on:mousedown={preventDefault} use:efx {disabled}>
   <div><i class={icon} /></div>
</button>

<style lang="scss">
   button {
      @include icon-button;
      cursor: pointer;
   }

   button:hover {
      background: radial-gradient(
         var(--button-background-highlight),
         var(--button-background)
      );
   }
</style>
