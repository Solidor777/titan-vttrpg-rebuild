<script>
   import EfxButton from '~/helpers/svelte-components/button/EfxButton.svelte';

   export let label = void 0;
   export let active = void 0;
</script>

<EfxButton on:click>
   <div class="button-inner">
      <div class="label">
         {label}
      </div>
      <i class={active ? 'fas fa-square-check' : 'fas fa-square'} />
   </div>
</EfxButton>

<style lang="scss">
   .button-inner {
      @include flex-row;
      @include flex-group-center;
      height: 100%;

      :not(:first-child) {
         margin-left: var(--padding-standard);
      }
   }
</style>
