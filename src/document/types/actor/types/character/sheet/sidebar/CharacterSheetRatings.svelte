<script>
   import { getContext } from 'svelte';
   import CharacterSheetRating from '~/document/types/actor/types/character/sheet/sidebar/CharacterSheetRating.svelte';
   import CharacterSheetRatingButton from '~/document/types/actor/types/character/sheet/sidebar/CharacterSheetRatingButton.svelte';

   const document = getContext('document');
</script>

<div class="ratings">
   <!--Initiative-->
   <div class="rating">
      <!-- svelte-ignore missing-declaration -->
      <CharacterSheetRatingButton
         key={'initiative'}
         icon={'clock'}
         onClick={() => {
            $document.typeComponent.rollInitiative();
         }}
      />
   </div>

   <!--Awareness-->
   <div class="rating">
      <CharacterSheetRating key={'awareness'} icon={'eye'} />
   </div>

   <!--Defense-->
   <div class="rating">
      <CharacterSheetRating key={'defense'} icon={'shield'} />
   </div>

   <!--Melee-->
   <div class="rating">
      <CharacterSheetRating key={'melee'} icon={'sword'} />
   </div>

   <!--Accuracy-->
   <div class="rating">
      <CharacterSheetRating key={'accuracy'} icon={'bow-arrow'} />
   </div>
</div>

<style lang="scss">
   .ratings {
      @include flex-column;
      @include flex-group-top;
      width: 100%;
      height: 100%;

      .rating {
         @include flex-row;
         @include flex-group-center;
         width: 100%;

         &:not(:first-child) {
            @include border-top;
            margin-top: var(--padding-standard);
            padding-top: var(--padding-standard);
         }
      }
   }
</style>
