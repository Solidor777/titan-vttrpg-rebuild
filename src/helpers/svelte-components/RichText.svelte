<script>
   import { getContext } from 'svelte';

   // Setup context variables
   const document = getContext('document');

   export let text = void 0;
   $: displayText = TextEditor.enrichHTML(text, {
      async: false,
      secrets: true,
   });
</script>

<div class="rich-text {$document.isOwner ? '' : 'not-owner'}">
   {@html displayText}
</div>

<style lang="scss">
   .rich-text {
      overflow: hidden;
      text-align: left;
      margin: 0rem var(--padding-standard);
   }
</style>
