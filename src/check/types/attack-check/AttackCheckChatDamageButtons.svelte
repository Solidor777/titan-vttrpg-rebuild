<script>
   import applyDamageToTargets from '~/utility-functions/ApplyDamageToTargets.js';
   import applyHealingToTargets from '~/utility-functions/ApplyHealingToTargets.js';
   import tooltip from '~/helpers/svelte-actions/Tooltip.js';
   import EfxButton from '~/helpers/svelte-components/button/EfxButton.svelte';
   import localize from '~/utility-functions/Localize.js';

   export let damage = void 0;
   export let ineffective = false;
   export let penetrating = false;
   export let cleave = 0;
</script>

<div class="damage-buttons">
   <!--Apply damage button-->
   <div class="button" use:tooltip={{ content: localize('applyDamage') }}>
      <EfxButton
         on:click={() => {
            applyDamageToTargets(damage, {
               ineffective: ineffective,
               penetrating: penetrating,
            });
         }}
         ><i class="fas fa-burst" />
      </EfxButton>
   </div>

   <!--Cleave Button-->
   {#if cleave > 0}
      <div
         class="button"
         use:tooltip={{ content: localize('applyCleaveDamage') }}
      >
         <EfxButton
            on:click={() => {
               applyDamageToTargets(cleave, {
                  ineffective: ineffective,
                  penetrating: penetrating,
               });
            }}
         >
            <i class="fas fa-scythe" />
         </EfxButton>
      </div>
   {/if}

   <!--Apply damage ignore armor button-->
   <div
      class="button"
      use:tooltip={{ content: localize('applyDamageIgnoreArmor') }}
   >
      <EfxButton
         on:click={() => {
            applyDamageToTargets(damage, {
               ineffective: ineffective,
               penetrating: penetrating,
               ignoreArmor: true,
            });
         }}
         ><i class="fas fa-shield-slash" />
      </EfxButton>
   </div>

   <!--Apply half damage button-->
   <div class="button" use:tooltip={{ content: localize('applyHalfDamage') }}>
      <EfxButton
         on:click={() => {
            applyDamageToTargets(Math.max(Math.floor(damage / 2), 1), {
               ineffective: ineffective,
               penetrating: penetrating,
            });
         }}
      >
         <i class="fas fa-heart-half-stroke" />
      </EfxButton>
   </div>

   <!--Apply healing button-->
   <div class="button" use:tooltip={{ content: localize('applyHealing') }}>
      <EfxButton on:click={() => applyHealingToTargets(damage)}>
         <i class="fas fa-heart" />
      </EfxButton>
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
