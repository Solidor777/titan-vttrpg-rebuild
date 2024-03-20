<script>
   import { getContext } from 'svelte';
   import getActor from '~/helpers/utility-functions/GetActor.js';
   import Button from '~/helpers/svelte-components/button/Button.svelte';
   import localize from '~/helpers/utility-functions/Localize.js';

   // Context variables
   const document = getContext('document');

   async function confirmhealingApplied() {
      // Get the actor
      const actor = getActor($document.speaker.actor, $document.speaker.token);
      if (actor) {
         const character = actor.character;
         if (character) {
            // Update the actor
            await character.applyHealing(
               $document.flags.titan.healingApplied.total,
               { report: false },
            );

            // Update the chat document
            await $document.update({
               flags: {
                  titan: {
                     healingApplied: {
                        confirmed: true,
                     },
                     stamina: {
                        value: actor.system.resource.stamina.value,
                     },
                  },
               },
            });
         }
      }
   }
</script>

<!--Regain resolve button-->
<div class="button">
   <Button on:click={() => confirmhealingApplied()}>
      <i class="fas fa-heart" />
      {localize('heal%xDamage').replace(
         '%x',
         $document.flags.titan.healingApplied.total,
      )}
   </Button>
</div>

<style lang="scss">
   .button {
      @include flex-row;
      @include font-size-normal;
      width: 100%;
      --button-border-radius: 10px;
   }
</style>
