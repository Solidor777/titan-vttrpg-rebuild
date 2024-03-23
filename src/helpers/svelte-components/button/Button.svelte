<script>
  import preventDefault from '~/helpers/svelte-actions/PreventDefault.js';
  export let disabled = false;
</script>

<button on:click on:mousedown={preventDefault} {disabled}>
  <slot />
</button>

<style lang="scss">
  button {
    @include button;
  }
</style>
