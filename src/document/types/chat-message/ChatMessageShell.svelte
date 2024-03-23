<svelte:options accessors={true} />

<script>
   import { setContext } from 'svelte';
   import { getContext } from 'svelte';
   import WeaponChatMessage from '~/document/types/item/types/weapon/chat-message/WeaponChatMessage.svelte';
   import ArmorChatMessage from '~/document/types/item/types/armor/chat-message/ArmorChatMessage.svelte';
   import SpellChatMessage from '~/document/types/item/types/spell/chat-message/SpellChatMessage.svelte';
   import AbilityChatMesssage from '~/document/types/item/types/ability/chat-message/AbilityChatMesssage.svelte';
   import EquipmentChatMessage from '~/document/types/item/types/equipment/chat-message/EquipmentChatMessage.svelte';
   import CommodityChatMessage from '~/document/types/item/types/commodity/chat-message/CommodityChatMessage.svelte';
   import EffectChatMessage from '~/document/types/item/types/effect/chat-message/EffectChatMessage.svelte';
   import ShieldChatMessage from '~/document/types/item/types/shield/chat-message/ShieldChatMessage.svelte';
   import AttributeCheckChatMessage from '~/check/types/attribute-check/AttributeCheckChatMessage.svelte';
   import ResistanceCheckChatMessage from '~/check/types/resistance-check/ResistanceCheckChatMessage.svelte';
   import ItemCheckChatMessage from '~/check/types/item-check/ItemCheckChatMessage.svelte';
   import CastingCheckChatMessage from '~/check/types/casting-check/CastingCheckChatMessage.svelte';
   import AttackCheckChatMessage from '~/check/types/attack-check/AttackCheckChatMessage.svelte';
   import PrivateRollChatMessage from '~/document/types/chat-message/PrivateRollChatMessage.svelte';
   import DamageReportChatMessage from '~/document/types/chat-message/report/DamageReportChatMessage.svelte';
   import HealingReportChatMessage from '~/document/types/chat-message/report/HealingReportChatMessage.svelte';
   import SpendResolveReportChatMessage from '~/document/types/chat-message/report/SpendResolveReportChatMessage.svelte';
   import RemoveCombatEffectsReportChatMessage from '~/document/types/chat-message/report/RemoveCombatEffectsReportChatMessage.svelte';
   import ShortRestReportChatMessage from '~/document/types/chat-message/report/ShortRestReportChatMessage.svelte';
   import LongRestReportChatMessage from '~/document/types/chat-message/report/LongRestReportChatMessage.svelte';
   import TurnStartReportChatMessage from '~/document/types/chat-message/report/TurnStartReportChatMessage.svelte';
   import TurnEndReportChatMessage from '~/document/types/chat-message/report/TurnEndReportChatMessage.svelte';
   import EffectsExpiredReportChatMessage from '~/document/types/chat-message/report/EffectsExpiredReportChatMessage.svelte';
   import RendReportChatMessage from '~/document/types/chat-message/report/RendReportChatMessage.svelte';
   import RepairReportChatMessage from '~/document/types/chat-message/report/RepairReportChatMessage.svelte';

   // Context object
   export let documentStore = void 0;

   // Setup
   setContext('document', documentStore);
   const document = getContext('document');

   // Selector for the chat message type
   function selectComponent() {
      if (game.user.isGM || !$document.blind) {
         const chatComponents = {
            attributeCheck: AttributeCheckChatMessage,
            resistanceCheck: ResistanceCheckChatMessage,
            attackCheck: AttackCheckChatMessage,
            castingCheck: CastingCheckChatMessage,
            itemCheck: ItemCheckChatMessage,
            armor: ArmorChatMessage,
            ability: AbilityChatMesssage,
            commodity: CommodityChatMessage,
            equipment: EquipmentChatMessage,
            effect: EffectChatMessage,
            shield: ShieldChatMessage,
            spell: SpellChatMessage,
            weapon: WeaponChatMessage,
            damageReport: DamageReportChatMessage,
            healingReport: HealingReportChatMessage,
            spendResolveReport: SpendResolveReportChatMessage,
            removeCombatEffectsReport: RemoveCombatEffectsReportChatMessage,
            shortRestReport: ShortRestReportChatMessage,
            longRestReport: LongRestReportChatMessage,
            turnStartReport: TurnStartReportChatMessage,
            turnEndReport: TurnEndReportChatMessage,
            effectsExpiredReport: EffectsExpiredReportChatMessage,
            rendReport: RendReportChatMessage,
            repairReport: RepairReportChatMessage,
         };
         return chatComponents[$document.flags.titan.type];
      }
      return PrivateRollChatMessage;
   }
</script>

<div>
   {#if $document}
      <svelte:component this={selectComponent()} />
   {/if}
</div>
