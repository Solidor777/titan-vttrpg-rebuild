<script>
   import Button from '~/helpers/svelte-components/button/Button.svelte';

   // Check reference
   export let check = void 0;

   export let disabled = void 0;
</script>

<div class="item-check-button {check.attribute}">
   <Button on:click {disabled}>
      <div class="button-inner">
         <i class="fas fa-dice" />
         <div>
            {check.label}
         </div>
      </div>
   </Button>
</div>

<style lang="scss">
   .item-check-button {
      @include flex-row;

      &.body {
         --button-background: var(--body-color);
      }

      &.mind {
         --button-background: var(--mind-color);
      }

      &.soul {
         --button-background: var(--soul-color);
      }

      .button-inner {
         @include flex-row;
         @include flex-group-center;
         @include font-size-normal;
         height: 100%;
         line-height: normal;
         padding: var(--padding-standard);

         i {
            margin-right: var(--padding-standard);
         }
      }
   }
</style>
