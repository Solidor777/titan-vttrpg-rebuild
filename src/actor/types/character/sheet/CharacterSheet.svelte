<svelte:options accessors={true} />

<script>
   import CharacterSheetTabs from '~/actor/types/character/sheet/tabs/CharacterSheetTabs.svelte';
   import CharacterSheetSidebar from '~/actor/types/character/sheet/sidebar/CharacterSheetSidebar.svelte';

   // Header to allow this sheet to be used with players or NPCs
   export let header = void 0;
</script>

<!--Sheet-->
<div class="actor-sheet">
   <!--Sidebar-->
   <div class="sidebar">
      <CharacterSheetSidebar />
   </div>

   <!--Sheet Body-->
   <div class="body">
      <!--Header -->
      <div class="header">
         <svelte:component this={header} />
      </div>

      <!--Tab Content-->
      <div class="tabs">
         <CharacterSheetTabs />
      </div>
   </div>
</div>

<style lang="scss">
   .actor-sheet {
      @include flex-row;
      @include font-size-normal;

      .sidebar {
         @include border;
         margin-right: var(--padding-large);
      }

      .body {
         @include flex-column;
         flex-grow: 1;

         .header {
            @include border;
         }

         .tabs {
            @include border;
            margin-top: var(--padding-large);
            flex-grow: 1;
         }
      }
   }
</style>
