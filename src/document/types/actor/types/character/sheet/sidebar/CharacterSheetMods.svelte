<script>
   import CharacterSheetMod from '~/document/types/actor/types/character/sheet/sidebar/CharacterSheetMod.svelte';
</script>

<div class="mods">
   <div class="mod">
      <CharacterSheetMod key={'armor'} icon={'helmet-battle'} />
   </div>

   <div class="mod">
      <CharacterSheetMod key={'damage'} icon={'burst'} />
   </div>

   <div class="mod">
      <CharacterSheetMod key={'healing'} icon={'heart'} />
   </div>
</div>

<style lang="scss">
   .mods {
      @include flex-column;
      @include flex-group-top;
      width: 100%;
      height: 100%;

      .mod {
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
