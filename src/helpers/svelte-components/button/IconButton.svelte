<script>
   import preventDefault from '~/helpers/svelte-actions/PreventDefault.js';

   export let icon = void 0;
   export let disabled = false;
</script>

<button on:click on:mousedown={preventDefault}>
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
