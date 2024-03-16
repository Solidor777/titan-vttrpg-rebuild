<svelte:options accessors={true} />

<script>
   import localize from '~/utility-functions/Localize.js';
   import { getContext } from 'svelte';
   import Button from '~/helpers/svelte-components/button/Button.svelte';

   // Character Sheet
   export let headers = void 0;
   export let message = void 0;
   export let confirmLabel = void 0;

   const application = getContext('#external').application;
</script>

<div class="add-item-dialog">
   <!--Headers-->
   {#each headers as header}
      <div class="header">
         {header}
      </div>
   {/each}

   <!--Message-->
   <div class="message">
      {message}
   </div>

   <!--Confirm Button-->
   <div class="button">
      <Button
         on:click={() => {
            application.confirmed();
            if (typeof application.confirmationCallback === 'function') {
               application.confirmationCallback();
            }
            application.close();
         }}
      >
         {confirmLabel}
      </Button>
   </div>

   <!--Cancel button-->
   <div class="button">
      <Button
         on:click={() => {
            application.close();
         }}
         >{localize('cancel')}
      </Button>
   </div>
</div>

<style lang="scss">
   .add-item-dialog {
      @include flex-column;
      @include flex-group-top;
      width: 100%;

      .header {
         @include flex-row;
         @include flex-group-center;
         @include font-size-normal;

         width: 100%;
         font-weight: bold;
         flex-wrap: wrap;
      }

      .message {
         @include flex-row;
         @include flex-group-center;
         @include font-size-normal;
         padding: var(--padding-standard);
      }

      .button {
         @include flex-row;
         @include flex-group-center;
         width: 100%;
         margin-top: var(--padding-standard);
         --button-border-radius: 10px;
      }
   }
</style>
