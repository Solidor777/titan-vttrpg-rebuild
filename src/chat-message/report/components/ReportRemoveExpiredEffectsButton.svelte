<script>
   import { getContext } from 'svelte';
   import getActor from '~/utility-functions/GetActor.js';
   import Button from '~/helpers/svelte-components/button/Button.svelte';
   import localize from '~/utility-functions/Localize.js';

   // Context variables
   const document = getContext('document');
   function removeExpiredEffects() {
      // Update the actor
      const character = getActor(
         $document.speaker.actor,
         $document.speaker.token,
      )?.character;
      if (character) {
         character.removeExpiredEffects(true);
         $document.flags.titan.expiredEffectsRemoved = true;
         $document.update({
            flags: {
               titan: {
                  expiredEffectsRemoved: true,
                  expiredEffects: false,
               },
            },
         });
      }
   }
</script>

<!--Apply healing button-->
<div class="button">
   <Button on:click={() => removeExpiredEffects()}>
      <i class="fas fa-clock" />
      {localize('removeExpiredEffects')}
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
