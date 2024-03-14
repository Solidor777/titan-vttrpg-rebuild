<script>
   import EfxButton from '~/helpers/svelte-components/button/EfxButton.svelte';
   export let label = void 0;
   export let icon = void 0;
</script>

<div class="button">
   <EfxButton on:click>
      <div class="label">
         {#if icon}
            <i class={`fas fa-${icon}`} />
         {/if}
         <div>
            {label}
         </div>
      </div>
   </EfxButton>
</div>

<style lang="scss">
   .button {
      --button-font-size: var(--font-size-small);
      --button-padding: var(--padding-standard);
      --button-line-height: normal;
      --button-border-radius: 10px;

      .label {
         @include flex-row;
         @include flex-group-center;

         i {
            margin-right: var(--padding-standard);
         }
      }
   }
</style>
