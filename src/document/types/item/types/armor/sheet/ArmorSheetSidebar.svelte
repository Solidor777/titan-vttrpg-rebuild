<script>
   import { getContext } from 'svelte';
   import { slide } from 'svelte/transition';
   import ScrollingContainer from '~/helpers/svelte-components/ScrollingContainer.svelte';
   import ItemSheetSidebarChecks from '~/document/types/item/component/check/ItemSheetSidebarChecks.svelte';
   import ArmorSheetSidebarTraits from '~/document/types/item/types/armor/sheet/ArmorSheetSidebarTraits.svelte';

   // Application statee reference
   const appState = getContext('applicationState');
   const document = getContext('document');
</script>

<div class="sidebar">
   <!--Attacks-->
   <ScrollingContainer bind:scrollTop={$appState.scrollTop.sidebar}>
      <!--Traits-->
      <div class="section" transition:slide|local>
         <ArmorSheetSidebarTraits />
      </div>

      <!--Checks-->
      {#if $document.system.check.length > 0}
         <div class="section" transition:slide|local>
            <ItemSheetSidebarChecks />
         </div>
      {/if}
   </ScrollingContainer>
</div>

<style lang="scss">
   .sidebar {
      @include border;
      @include flex-column;
      @include flex-group-top;
      @include panel-2;
      min-width: 13rem;
      width: 100%;
      height: 100%;

      .section {
         &:not(:first-child) {
            @include border-top;
            margin-top: var(--padding-large);
         }
      }
   }
</style>
