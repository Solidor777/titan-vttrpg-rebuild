<script>
   import { getContext } from 'svelte';
   import localize from '~/helpers/utility-functions/Localize.js';
   import ChatEffects from '~/document/types/chat-message/ChatEffects.svelte';
   import ReportConfirmResolveRegainButton from '~/document/types/chat-message/report/components/ReportConfirmResolveRegainButton.svelte';
   import ReportRemoveExpiredEffectsButton from '~/document/types/chat-message/report/components/ReportRemoveExpiredEffectsButton.svelte';
   import ReportConfirmApplyHealingButton from '~/document/types/chat-message/report/components/ReportConfirmApplyHealingButton.svelte';
   import ReportConfirmApplyDamageButton from '~/document/types/chat-message/report/components/ReportConfirmApplyDamageButton.svelte';
   import ReportHeader from '~/document/types/chat-message/report/components/ReportHeader.svelte';
   import ChatFastHealingTag from '~/document/types/chat-message/ChatFastHealingTag.svelte';
   import ChatPersistentDamageTag from '~/document/types/chat-message/ChatPersistentDamageTag.svelte';
   import RichText from '~/helpers/svelte-components/RichText.svelte';

   // Document reference
   const document = getContext('document');
   const chatContext = $document.flags.titan;
</script>

<div class="report">
   <!--Header-->
   <ReportHeader
      icon={'fas fa-hourglass-start'}
      label={localize('turnStart')}
   />

   <!--Messages-->
   {#if chatContext.message}
      <div class="messages">
         {#each Object.values(chatContext.message) as message}
            <div class="message">
               <RichText text={message} />
            </div>
         {/each}
      </div>
   {/if}

   <!--Effects-->
   {#if chatContext.permanentEffects || chatContext.turnEndEffects || chatContext.turnStartEffects || chatContext.initiativeEffects || chatContext.customEffects || chatContext.expiredEffects}
      <ChatEffects />
   {/if}

   <!--Fast Healing-->
   {#if chatContext.fastHealing}
      <div class="tag">
         <ChatFastHealingTag fastHealing={chatContext.fastHealing} />
      </div>
   {/if}

   <!--Persistent Damage-->
   {#if chatContext.persistentDamage}
      <div class="tag">
         <ChatPersistentDamageTag
            persistentDamage={chatContext.persistentDamage}
         />
      </div>
   {/if}

   <!--Stamina-->
   {#if chatContext.stamina}
      <div class="section">
         {`${localize('stamina')}: ${$document.flags.titan.stamina.value} / ${
            $document.flags.titan.stamina.max
         }`}
      </div>
   {/if}

   <!--Wounds-->
   {#if chatContext.wounds}
      <div class="section">
         {`${localize('wounds')}: ${$document.flags.titan.wounds.value} / ${
            $document.flags.titan.wounds.max
         }`}
      </div>
   {/if}

   <!--Resolve-->
   {#if chatContext.resolve}
      <div class="section">
         {`${localize('resolve')}: ${$document.flags.titan.resolve.value} / ${
            $document.flags.titan.resolve.max
         }`}
      </div>
   {/if}

   <!--Resolve Regain-->
   {#if chatContext.resolveRegain}
      <!--If confirmed, show how much was was regained-->
      {#if $document.flags.titan.resolveRegain.confirmed}
         <div class="section">
            <i class="fas fa-bolt" />
            <div>
               {localize('regained%xResolve').replace(
                  '%x',
                  chatContext.resolveRegain.total,
               )}
            </div>
         </div>
      {:else}
         <div class="button">
            <ReportConfirmResolveRegainButton />
         </div>
      {/if}
   {/if}

   <!--Healing applied-->
   {#if chatContext.healingApplied}
      <!--If confirmed, show how much was was regained-->
      {#if $document.flags.titan.healingApplied.confirmed === true}
         <div class="section">
            <i class="fas fa-heart" />
            <div>
               {localize('healed%xDamage').replace(
                  '%x',
                  chatContext.healingApplied.total,
               )}
            </div>
         </div>
      {:else if $document.flags.titan.healingApplied.confirmed === false}
         <div class="button">
            <ReportConfirmApplyHealingButton />
         </div>
      {/if}
   {/if}

   <!--Damage applied-->
   {#if chatContext.damageApplied}
      <!--If confirmed, show how much was was regained-->
      {#if $document.flags.titan.damageApplied.confirmed === true}
         <div class="section">
            <i class="fas fa-burst" />
            <div>
               {localize('took%xDamage').replace(
                  '%x',
                  chatContext.damageApplied.total,
               )}
            </div>
         </div>
      {:else if $document.flags.titan.damageApplied.confirmed === false}
         <div class="button">
            <ReportConfirmApplyDamageButton />
         </div>
      {/if}
   {/if}

   <!--Remove Expired Effects Button-->
   {#if $document.flags.titan.expiredEffectsRemoved === false}
      <div class="button">
         <ReportRemoveExpiredEffectsButton />
      </div>
   {/if}
</div>

<style lang="scss">
   .report {
      @include flex-column;
      @include flex-group-top;
      @include font-size-normal;
      width: 100%;
      font-weight: bold;

      .tag {
         margin-top: var(--padding-large);
      }

      .section {
         @include flex-row;
         @include flex-group-center;
         margin-top: var(--padding-large);
         flex-wrap: wrap;
         padding-bottom: var(--padding-large);

         &:not(:last-child) {
            @include border-bottom;
         }

         .fas {
            margin-right: var(--padding-standard);
         }
      }

      .messages {
         @include flex-column;
         @include flex-group-top-left;
         width: 100%;

         .message {
            @include panel-1;
            @include border;
            margin-top: var(--padding-large);
            padding: var(--padding-standard);
         }
      }

      .button {
         @include flex-row;
         @include flex-group-center;
         width: 100%;
         margin-top: var(--padding-large);
      }
   }
</style>
