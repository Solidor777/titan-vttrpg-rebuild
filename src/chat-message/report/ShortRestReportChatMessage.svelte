<script>
   import localize from '~/helpers/utility-functions/Localize.js';
   import ReportHeader from '~/chat-message/report/components/ReportHeader.svelte';
</script>

<div class="report">
   <!--Header-->
   <ReportHeader
      icon={'fas fa-face-exhaling'}
      label={localize('tookAShortRest')}
   />

   <!--Messages-->
   <div class="message">{localize('combatEffectsRemoved')}</div>
   <div class="message">{localize('staminaAndResolveRestored')}</div>
</div>

<style lang="scss">
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

         &:not(:last-child) {
            @include border-bottom;
         }
      }
   }
</style>
