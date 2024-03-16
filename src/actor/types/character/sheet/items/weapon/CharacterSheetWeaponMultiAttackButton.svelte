<script>
   import localize from '~/utility-functions/Localize.js';
   import { getContext } from 'svelte';
   import Button from '~/helpers/svelte-components/button/Button.svelte';

   // Item Reference
   export let item = void 0;
   // Reference to the application
   const document = getContext('document');
</script>

<Button on:click={() => $document.typeComponent.toggleMultiAttack(item._id)}>
   <div class="button-inner">
      <i class={item.system.multiAttack ? 'fas fa-swords' : 'fas fa-sword'} />
      <div class="label">
         {localize('multiAttack')}
      </div>
      <i
         class={item.system.multiAttack
            ? 'fas fa-square-check'
            : 'fas fa-square'}
      />
   </div>
</Button>

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
