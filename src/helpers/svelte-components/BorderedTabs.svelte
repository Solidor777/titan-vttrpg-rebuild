<script>
   import Tabs from '~/helpers/svelte-components/Tabs.svelte';

   // List of tabs
   export let tabs = [];

   // The active tab
   export let activeTab = void 0;
</script>

<div class="bordered-tabs">
   <Tabs {tabs} {activeTab} />
</div>

<style lang="scss">
   .bordered-tabs {
      @include border;
      overflow: hidden;
      width: 100%;
      height: 100%;
   }
</style>
