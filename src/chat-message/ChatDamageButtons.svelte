<script>
   import applyDamageToTargets from '~/utility-functions/ApplyDamageToTargets.js';
   import applyHealingToTargets from '~/utility-functions/ApplyHealingToTargets.js';
   import localize from '~/utility-functions/Localize.js';
   import tooltip from '~/helpers/svelte-actions/Tooltip.js';
   import Button from '~/helpers/svelte-components/button/Button.svelte';

   export let damage = void 0;
   export let ineffective = false;
   export let penetrating = false;
</script>

<div class="damage-buttons">
   <!--Apply damage button-->
   <div class="button" use:tooltip={{ content: localize('applyDamage') }}>
      <Button
         on:click={() => {
            applyDamageToTargets(damage, {
               ineffective: ineffective,
               penetrating: penetrating,
            });
         }}
         ><i class="fas fa-burst" />
      </Button>
   </div>

   <!--Apply damage ignore armor button-->
   <div
      class="button"
      use:tooltip={{ content: localize('applyDamageIgnoreArmor') }}
   >
      <Button
         on:click={() =>
            applyDamageToTargets(damage, {
               ignoreArmor: true,
               ineffective: ineffective,
               penetrating: penetrating,
            })}
         ><i class="fas fa-shield-slash" />
      </Button>
   </div>

   <!--Apply half damage button-->
   <div class="button" use:tooltip={{ content: localize('applyHalfDamage') }}>
      <Button
         on:click={() =>
            applyDamageToTargets(Math.floor(damage / 2), {
               ineffective: ineffective,
               penetrating: penetrating,
            })}
      >
         <i class="fas fa-heart-half-stroke" />
      </Button>
   </div>

   <!--Apply healing button-->
   <div class="button" use:tooltip={{ content: localize('applyHealing') }}>
      <Button on:click={() => applyHealingToTargets(damage)}>
         <i class="fas fa-heart" />
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
