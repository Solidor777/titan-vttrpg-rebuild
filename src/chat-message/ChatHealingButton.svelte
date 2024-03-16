<script>
   import { getContext } from 'svelte';
   import applyHealingToTargets from '~/utility-functions/ApplyHealingToTargets.js';
   import localize from '~/utility-functions/Localize.js';
   import tooltip from '~/helpers/svelte-actions/Tooltip.js';
   import Button from '~/helpers/svelte-components/button/Button.svelte';

   export let healing = void 0;

   // Document reference
   const document = getContext('document');
</script>

<!--Apply healing button-->
<div class="healing-button" use:tooltip={{ content: localize('applyHealing') }}>
   <Button on:click={() => applyHealingToTargets(healing)}>
      <i class="fas fa-heart" />
      {localize('heal%xDamage').replace('%x', healing)}
   </Button>
</div>

<style lang="scss">
   .healing-button {
      @include flex-row;
      @include font-size-normal;
      width: 100%;
      --button-border-radius: 10px;
   }
</style>
