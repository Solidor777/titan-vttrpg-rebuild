<script>
   import localize from '~/utility-functions/Localize.js';
   export let value = void 0;
</script>

<div class="stat">
   <i class="fas fa-coins" />
   <div class="label">
      {localize('value')}
   </div>
   <div class="value">
      {value}
   </div>
</div>

<style lang="scss">
   @import '../../../styles/mixins.scss';

   .stat {
      @include flex-row;
      @include flex-group-center;
      @include border;
      @include label;
      padding: var(--padding-standard);

      .label {
         @include border-right;
         font-weight: bold;
         padding-right: var(--padding-standard);
         margin: 0 var(--padding-standard);
      }
   }
</style>
