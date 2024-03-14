<script>
   import { getContext } from 'svelte';
   import getActor from '~/utility-functions/GetActor.js';
   import EfxButton from '~/helpers/svelte-components/button/EfxButton.svelte';
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
   <EfxButton on:click={() => removeExpiredEffects()}>
      <i class="fas fa-clock" />
      {localize('removeExpiredEffects')}
   </EfxButton>
</div>

<style lang="scss">
   @import '../../../styles/Mixins.scss';

   .button {
      @include flex-row;
      @include font-size-normal;
      width: 100%;
      --button-border-radius: 10px;
   }
</style>
