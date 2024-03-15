<script>
   import preventDefault from '~/helpers/svelte-actions/PreventDefault.js';
   import { ripple } from '@typhonjs-fvtt/runtime/svelte/action/animate';

   // List of tabs
   export let tabs = [];

   // The active tab
   export let activeTab = void 0;
</script>

<!--List of tabs-->
<div class="tabs">
   <!--Tab List-->
   <div class="tab-list">
      <!--For each tab-->
      {#each tabs as tab}
         <button
            class={activeTab === tab.id ? 'active ' : ''}
            on:click={() => {
               activeTab = tab.id;
            }}
            on:mousedown={preventDefault}
         >
            {tab.label}
         </button>
      {/each}
   </div>

   <!--Tab Content-->
   <div class="tab-content">
      {#each tabs as tab}
         {#if tab.id === activeTab}
            <svelte:component this={tab.component} />
         {/if}
      {/each}
   </div>
</div>

<style lang="scss">
   .tabs {
      @include flex-column;
      flex-grow: 1;
      width: 100%;

      .tab-list {
         @include flex-row;
         @include border-bottom;
         @include panel-1;
         list-style: none;
         margin: 0;
         padding: var(--padding-standard);
         height: 100%;
         width: 100%;
         flex: 0;

         button {
            --button-border-radius: 5px;
            --button-line-height: var(--tab-line-height);
            --button-font-size: var(--tab-font-size);
            @include button;
            height: 100%;
            width: 100%;
            font-weight: normal;

            &.active {
               background: var(--highlight-background);
            }
         }
      }

      .tab-content {
         @include flex-column;
         @include flex-group-top;
         flex-grow: 1;
         flex: 2;
      }
   }
</style>
