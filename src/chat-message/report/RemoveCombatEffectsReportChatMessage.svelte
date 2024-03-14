<script>
   import localize from '~/utility-functions/Localize.js';
   import ReportHeader from './components/ReportHeader.svelte';
</script>

<div class="report">
   <!--Header-->
   <ReportHeader
      icon={'fas fa-arrow-rotate-left'}
      label={localize('combatEffectsRemoved')}
   />

   <!--Resolve restored-->
   <div class="message">
      <i class="fas fa-bolt" />
      <div>{localize('resolveFullyRestored')}</div>
   </div>
</div>

<style lang="scss">
   @import '../../styles/Mixins.scss';

   .report {
      @include flex-column;
      @include flex-group-top;
      @include font-size-normal;
      width: 100%;
      font-weight: bold;

      .message {
         @include flex-row;
         @include flex-group-center;
         margin-top: var(--padding-large);
         flex-wrap: wrap;
         padding-bottom: var(--padding-large);

         i {
            margin-right: var(--padding-standard);
         }

         &:not(:last-child) {
            @include border-bottom;
         }
      }
   }
</style>
