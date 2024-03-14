<script>
   import applyRendToTargets from '~/utility-functions/ApplyRendToTargets.js';
   import applyRepairsToTargets from '~/utility-functions/ApplyRepairsToTarget.js';
   import tooltip from '~/helpers/svelte-actions/Tooltip.js';
   import EfxButton from '~/helpers/svelte-components/button/EfxButton.svelte';
   import localize from '~/utility-functions/Localize.js';

   export let rend = void 0;
   export let magical = false;
</script>

<div class="damage-buttons">
   <!--Apply Rend button-->
   <div class="button" use:tooltip={{ content: localize('rendArmor') }}>
      <EfxButton
         on:click={() => {
            applyRendToTargets(rend, {
               magical: magical,
            });
         }}
         ><i class="fas fa-hammer-crash" />
         <div>{localize('rend')}</div>
      </EfxButton>
   </div>

   <!--Repair Rend button-->
   <div class="button" use:tooltip={{ content: localize('repairArmor') }}>
      <EfxButton on:click={() => applyRepairsToTargets(rend)}>
         <i class="fas fa-screwdriver-wrench" />
         <div>{localize('repair')}</div>
      </EfxButton>
   </div>
</div>

<style lang="scss">
   @import '../styles/Mixins.scss';

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
