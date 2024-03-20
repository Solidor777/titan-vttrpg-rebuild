<script>
   import { getContext } from 'svelte';
   import { slide } from 'svelte/transition';
   import ScrollingContainer from '~/helpers/svelte-components/ScrollingContainer.svelte';
   import ItemSheetSidebarChecks from '~/item/component/check/ItemSheetSidebarChecks.svelte';
   import ItemSheetSidebarTraits from '~/item/sheet/ItemSheetSidebarTraits.svelte';
   import SpellSheetSidebarCastingCheck from '~/item/types/spell/sheet/SpellSheetSidebarCastingCheck.svelte';

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

      <!--Casting Check-->
      <div class="section">
         <SpellSheetSidebarCastingCheck />
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
      @include flex-column;
      @include flex-group-top;
      @include border;
      @include panel-2;
      width: 100%;
      height: 100%;
      padding-bottom: var(--padding-standard);

      .section {
         @include flex-column;
         @include flex-group-top;

         &:not(:first-child) {
            margin-top: var(--padding-large);
         }

         &:not(:first-child) {
            @include border-top;
         }
      }
   }
</style>
