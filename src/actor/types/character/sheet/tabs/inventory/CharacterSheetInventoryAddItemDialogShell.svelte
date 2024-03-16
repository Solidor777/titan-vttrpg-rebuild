<svelte:options accessors={true} />

<script>
   import localize from '~/utility-functions/Localize.js';
   import { getContext } from 'svelte';
   import Button from '~/helpers/svelte-components/button/Button.svelte';
   import Select from '~/helpers/svelte-components/select/Select.svelte';

   // Character Sheet
   export let actor = void 0;

   const application = getContext('#external').application;

   const options = [
      {
         value: 'armor',
         label: localize('armor'),
      },
      {
         value: 'commodity',
         label: localize('commodity'),
      },
      {
         value: 'equipment',
         label: localize('equipment'),
      },
      {
         value: 'shield',
         label: localize('shield'),
      },
      {
         value: 'weapon',
         label: localize('weapon'),
      },
   ];

   let value = 'armor';
</script>

<div class="add-item-dialog">
   <!--Header-->
   <div class="header">
      {actor.name}
   </div>

   <!--Type Select-->
   <div class="select">
      <Select {options} bind:value />
   </div>

   <!--Buttons-->
   <div class="button">
      <Button
         on:click={() => {
            actor.addItem(value);
            application.close();
         }}
      >
         {localize('addNewItem')}
      </Button>
   </div>

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

      .select {
         @include flex-row;
         @include flex-group-center;

         width: 100%;
         margin-top: var(--padding-standard);
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
