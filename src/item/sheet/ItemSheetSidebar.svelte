<script>
   import { getContext } from 'svelte';
   import { slide } from 'svelte/transition';
   import ScrollingContainer from '~/helpers/svelte-components/ScrollingContainer.svelte';
   import ItemSheetSidebarChecks from '~/item/component/check/ItemSheetSidebarChecks.svelte';
   import ItemSheetSidebarTraits from '~/item/sheet/ItemSheetSidebarTraits.svelte';

   // Application statee reference
   const appState = getContext('applicationState');
   const document = getContext('document');
</script>

<div class="sidebar">
   <ScrollingContainer bind:scrollTop={$appState.scrollTop.sidebar}>
      <!--Traits-->
      <div class="section">
         <ItemSheetSidebarTraits />
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
         @include flex-column;
         @include flex-group-top;

         &:not(:first-child) {
            @include border-top;
            margin-top: var(--padding-large);
         }
      }
   }
</style>
