<script>
   import applyDamageToTargets from '~/helpers/utility-functions/ApplyDamageToTargets.js';
   import tooltip from '~/helpers/svelte-actions/Tooltip.js';
   import localize from '~/helpers/utility-functions/Localize.js';
   import Button from '~/helpers/svelte-components/button/Button.svelte';

   export let damage = void 0;
</script>

<div class="damage-buttons">
   <!--Apply damage ignore armor button-->
   <div
      class="button"
      use:tooltip={{ content: localize('applyOverkillDamage') }}
   >
      <Button
         on:click={() =>
            applyDamageToTargets(damage, {
               ignoreArmor: true,
            })}
         ><i class="fas fa-explosion" />
         {localize('%xOverkillDamage').replace('%x', damage)}
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
      }
   }
</style>
