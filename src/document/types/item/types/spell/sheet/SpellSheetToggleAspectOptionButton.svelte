<script>
   import { getContext } from 'svelte';
   import Button from '~/helpers/svelte-components/button/Button.svelte';

   export let enabled = void 0;
   export let label = void 0;

   // Setup
   const document = getContext('document');

   // Copy of the document data
   let data;
   $: {
      data = {
         img: $document.img,
         system: $document.system,
         flags: $document.flags,
         name: $document.name,
      };
   }
</script>

<div class="toggle enabled-{enabled === true}">
   <Button
      on:click={() => {
         enabled = !enabled;
         $document.update(data);
      }}
   >
      <div class="label">
         {label}
      </div>
   </Button>
</div>

<style lang="scss">
   .toggle {
      --button-font-size: var(--font-size-small);
      --button-padding: 0 var(--padding-standard);
      --button-border-radius: 10px;
      margin: var(--padding-standard);

      &.enabled-true {
         --button-background: var(--active-background);
      }

      .label {
         @include flex-row;
         @include flex-group-center;
      }
   }
</style>
