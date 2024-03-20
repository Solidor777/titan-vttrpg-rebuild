<script>
   import { getContext } from 'svelte';
   import { slide } from 'svelte/transition';
   import localize from '~/utility-functions/Localize.js';
   import DocumentSelect from '~/documents/components/select/DocumentSelect.svelte';
   import IconButton from '~/helpers/svelte-components/button/IconButton.svelte';
   import onRulesElementOperationChanged from '~/item/component/rules-element/RulesElementUpdateOperation';
   import DocumentIntegerInput from '~/documents/components/input/DocumentIntegerInput.svelte';

   // Setup context variables
   const document = getContext('document');

   export let operationOptions = void 0;
   export let idx = void 0;
   export let element = void 0;

   const selectorOptions = [
      {
         label: localize('turnStart'),
         value: 'turnStart',
      },
      {
         label: localize('turnEnd'),
         value: 'turnEnd',
      },
   ];

   // Setup tabs
</script>

{#if element && element.operation === 'fastHealing'}
   <div class="element" transition:slide|local>
      <!--Element Operation-->
      <div class="settings">
         <div class="field select">
            <DocumentSelect
               options={operationOptions}
               bind:value={element.operation}
               on:change={() => onRulesElementOperationChanged($document, idx)}
            />
         </div>

         <!--Selector-->
         <div class="field select">
            <DocumentSelect
               options={selectorOptions}
               bind:value={element.selector}
            />
         </div>

         <!--Value-->
         <div class="field number">
            <DocumentIntegerInput bind:value={element.value} min={1} />
         </div>
      </div>

      <!--Delete Element-->
      <div class="delete-button">
         <IconButton
            icon={'fas fa-trash'}
            on:click={() => {
               $document.typeComponent.removeRulesElement(idx);
            }}
         />
      </div>
   </div>
{/if}

<style lang="scss">
   .element {
      @include flex-row;
      @include flex-space-between;
      @include border;
      @include panel-1;
      width: 100%;
      height: 100%;

      .settings {
         @include flex-row;
         @include flex-group-left;
         flex-wrap: wrap;
         width: 100%;
         margin-bottom: var(--padding-large);

         .field {
            @include flex-row;
            margin: var(--padding-large) var(--padding-standard) 0
               var(--padding-standard);

            &.select {
               @include flex-group-left;
            }

            &.number {
               @include flex-group-center;
               width: 2rem;
            }
         }
      }

      .delete-button {
         @include flex-column;
         @include flex-group-top;
         height: 100%;
         margin: var(--padding-large) var(--padding-standard) 0 0;
      }
   }
</style>
