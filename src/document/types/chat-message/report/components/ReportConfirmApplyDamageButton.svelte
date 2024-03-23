<script>
   import { getContext } from 'svelte';
   import getActor from '~/helpers/utility-functions/GetActor.js';
   import Button from '~/helpers/svelte-components/button/Button.svelte';
   import localize from '~/helpers/utility-functions/Localize.js';

   // Context variables
   const document = getContext('document');

   async function confirmdamageApplied() {
      // Get the actor
      const actor = getActor($document.speaker.actor, $document.speaker.token);
      if (actor) {
         const character = actor.character;
         if (character) {
            // Update the actor
            await character.applyDamage(
               $document.flags.titan.damageApplied.total,
               { ignoreArmor: true, report: false },
            );

            // Update the chat document
            await $document.update({
               flags: {
                  titan: {
                     damageApplied: {
                        confirmed: true,
                     },
                     stamina: {
                        value: actor.system.resource.stamina.value,
                     },
                     wounds: {
                        value: actor.system.resource.wounds.value,
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
   <Button on:click={() => confirmdamageApplied()}>
      <i class="fas fa-heart" />
      {localize('apply%xDamage').replace(
         '%x',
         $document.flags.titan.damageApplied.total,
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
