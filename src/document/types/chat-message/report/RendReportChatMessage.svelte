<script>
   import { getContext } from 'svelte';
   import localize from '~/helpers/utility-functions/Localize.js';
   import ChatResource from '~/document/types/chat-message/ChatResource.svelte';
   import ReportDoubleHeader from '~/document/types/chat-message/report/components/ReportDoubleHeader.svelte';

   // Document reference
   const document = getContext('document');
   const chatContext = $document.flags.titan;
</script>

<div class="report">
   <!--Header-->
   <ReportDoubleHeader
      name1={chatContext.actorName}
      name2={chatContext.itemName}
      img1={chatContext.actorImg}
      img2={chatContext.itemImg}
      icon={'fas fa-burst'}
      label={chatContext.rendResisted
         ? localize('resisted%xRend').replace('%x', chatContext.rend)
         : localize('lost%xArmor').replace('%x', chatContext.armorLost)}
   />

   <!--Armor-->
   <div class="message">
      <ChatResource
         icon={'fas fa-helmet-battle'}
         label={localize('armor')}
         value={chatContext.armor.value}
         max={chatContext.armor.max}
      />
   </div>
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
         flex-wrap: wrap;
         padding-bottom: var(--padding-large);

         &:not(.tags) {
            margin-top: var(--padding-large);
         }

         &:not(:last-child) {
            @include border-bottom;
         }
      }
   }
</style>
