<script>
   import { getContext } from 'svelte';
   import localize from '~/helpers/utility-functions/Localize.js';
   import ChatResource from '~/document/types/chat-message/ChatResource.svelte';
   import ReportHeader from '~/document/types/chat-message/report/components/ReportHeader.svelte';

   // Document reference
   const document = getContext('document');
   const chatContext = $document.flags.titan;
</script>

<div class="report">
   <!--Header-->
   <ReportHeader
      icon={'fas fa-bolt'}
      label={localize(
         chatContext.resolveShortage
            ? 'attemptedToSpend%xResolve'
            : 'spent%xResolve',
      ).replace('%x', chatContext.resolveSpent)}
   />

   <!--Resolve Shortage-->
   {#if chatContext.resolveShortage}
      <div class="message">
         <div>
            {localize('need%xMoreResolve').replace(
               '%x',
               chatContext.resolveShortage,
            )}
         </div>
      </div>
   {/if}

   <!--Resolve-->
   <div class="message">
      <ChatResource
         icon={'fas fa-bolt'}
         label={localize('resolve')}
         value={chatContext.resolve.value}
         max={chatContext.resolve.max}
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
         margin-top: var(--padding-large);
         flex-wrap: wrap;
         padding-bottom: var(--padding-large);

         &:not(:last-child) {
            @include border-bottom;
         }
      }
   }
</style>
