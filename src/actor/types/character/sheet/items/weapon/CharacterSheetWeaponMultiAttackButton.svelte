<script>
   import localize from '~/utility-functions/Localize.js';
   import { getContext } from 'svelte';
   import EfxButton from '~/helpers/svelte-components/button/EfxButton.svelte';

   // Item Reference
   export let item = void 0;
   // Reference to the application
   const document = getContext('document');
</script>

<EfxButton on:click={() => $document.typeComponent.toggleMultiAttack(item._id)}>
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
</EfxButton>

<style lang="scss">
   @import '../../../../../../Styles/Mixins.scss';

   .button-inner {
      @include flex-row;
      @include flex-group-center;
      height: 100%;

      :not(:first-child) {
         margin-left: var(--padding-standard);
      }
   }
</style>
