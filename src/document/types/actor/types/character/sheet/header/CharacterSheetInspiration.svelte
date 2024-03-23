<script>
   import { getContext } from 'svelte';
   import localize from '~/helpers/utility-functions/Localize.js';
   import tooltip from '~/helpers/svelte-actions/Tooltip.js';
   import IconButton from '~/helpers/svelte-components/button/IconButton.svelte';

   const document = getContext('document');
</script>

<div class="button" use:tooltip={{ content: localize('inspiration.desc') }}>
   <IconButton
      icon={$document.system.inspiration ? 'fas fa-sun' : ''}
      on:click={() => {
         $document.character.toggleInspiration();
      }}
   />
</div>

<style lang="scss">
   .button {
      --icon-button-padding: 0;
      --icon-button-font-size: 1.5rem;
   }
</style>
