<script>
   import applyRendToTargets from '~/helpers/utility-functions/ApplyRendToTargets.js';
   import applyRepairsToTargets from '~/helpers/utility-functions/ApplyRepairsToTarget.js';
   import tooltip from '~/helpers/svelte-actions/Tooltip.js';
   import Button from '~/helpers/svelte-components/button/Button.svelte';
   import localize from '~/helpers/utility-functions/Localize.js';

   export let rend = void 0;
   export let magical = false;
</script>

<div class="damage-buttons">
   <!--Apply Rend button-->
   <div class="button" use:tooltip={{ content: localize('rendArmor') }}>
      <Button
         on:click={() => {
            applyRendToTargets(rend, {
               magical: magical,
            });
         }}
         ><i class="fas fa-hammer-crash" />
         <div>{localize('rend')}</div>
      </Button>
   </div>

   <!--Repair Rend button-->
   <div class="button" use:tooltip={{ content: localize('repairArmor') }}>
      <Button on:click={() => applyRepairsToTargets(rend)}>
         <i class="fas fa-screwdriver-wrench" />
         <div>{localize('repair')}</div>
      </Button>
   </div>
</div>

<style lang="scss">
   .damage-buttons {
      @include flex-row;
      width: 100%;

      .button {
         @include flex-row;
         width: 100%;
         --button-border-radius: 10px;

         &:not(:first-child) {
            padding-left: var(--padding-standard);
         }

         &:not(:last-child) {
            padding-right: var(--padding-standard);
         }
      }

      .fas {
         @include font-size-extra-large;
         margin-right: var(--padding-standard);
      }
   }
</style>
