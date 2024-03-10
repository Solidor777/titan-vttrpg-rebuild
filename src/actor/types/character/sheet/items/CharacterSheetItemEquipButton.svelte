<script>
   import { localize } from '~/helpers/Utility.js';
   import { getContext } from 'svelte';
   import ToggleButton from '~/helpers/svelte-components/button/ToggleButton.svelte';

   // Item reference
   export let item = void 0;
   export let equipped = void 0;

   // Reference to the application
   const document = getContext('DocumentStore');
</script>

<ToggleButton
   active={equipped}
   label={localize('equipped')}
   on:click={() => $document.typeComponent.toggleEquipped(item._id)}
/>
