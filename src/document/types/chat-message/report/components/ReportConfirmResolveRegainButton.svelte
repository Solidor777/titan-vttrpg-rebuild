<script>
   import { getContext } from 'svelte';
   import getActor from '~/helpers/utility-functions/GetActor.js';
   import Button from '~/helpers/svelte-components/button/Button.svelte';
   import localize from '~/helpers/utility-functions/Localize.js';

   // Context variables
   const document = getContext('document');

   async function confirmRegainResolve() {
      // Get the actor
      const actor = getActor($document.speaker.actor, $document.speaker.token);
      if (actor) {
         const character = actor.character;
         if (character) {
            // Update the actor
            await character.regainResolve(
               $document.flags.titan.resolveRegain.total,
               true,
            );

            // Update the chat document
            $document.update({
               flags: {
                  titan: {
                     resolveRegain: {
                        confirmed: true,
                     },
                     resolve: {
                        value: actor.system.resource.resolve.value,
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
   <Button on:click={() => confirmRegainResolve()}>
      <i class="fas fa-bolt" />
      {localize('regain%xResolve').replace(
         '%x',
         $document.flags.titan.resolveRegain.total,
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
