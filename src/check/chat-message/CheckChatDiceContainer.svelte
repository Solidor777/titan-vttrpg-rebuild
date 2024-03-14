<script>
   import { getContext } from 'svelte';
   import CheckChatDie from './CheckChatDie.svelte';

   const document = getContext('document');
</script>

<div class="container">
   <!--For each dice-->
   {#each $document.flags.titan.results.dice as die, idx}
      <!-- svelte-ignore missing-declaration -->
      <div class="dice">
         <CheckChatDie {idx} />
      </div>
   {/each}
</div>

<style lang="scss">
   .container {
      @include flex-row;
      @include flex-group-center;
      width: 100%;
      flex-wrap: wrap;

      .dice {
         @include tag-margin;
      }
   }
</style>
