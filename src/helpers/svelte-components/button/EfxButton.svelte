<script>
   import preventDefault from '~/helpers/svelte-actions/PreventDefault.js';
</script>

<button on:click on:mousedown={preventDefault}>
   <slot />
</button>

<style lang="scss">
   button {
      @include button;
      width: 100%;
      height: 100%;
   }
</style>
