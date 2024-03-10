import TitanActor from '~/actor/Actor.js';
import TitanItem from '~/item/Item.js';
import TitanPlayerSheet from '~/actor/types/player/PlayerSheet.js';
import TitanNPCSheet from '~/actor/types/npc/NPCSheet.js';
import TitanAbilitySheet from '~/item/types/ability/sheet/AbilitySheet.js';
import TitanArmorSheet from '~/item/types/armor/sheet/ArmorSheet.js';
import TitanCommoditySheet from '~/item/types/commodity/sheet/CommoditySheet.js';
import TitanEffectSheet from '~/item/types/effect/sheet/EffectSheet.js';
import TitanEquipmentSheet from '~/item/types/equipment/sheet/EquipmentSheet.js';
import TitanShieldSheet from '~/item/types/shield/sheet/ShieldSheet';
import TitanSpellSheet from '~/item/types/spell/sheet/SpellSheet.js';
import TitanWeaponSheet from '~/item/types/weapon/sheet/WeaponSheet.js';
import TitanTokenDocument from '~/documents/TokenDocument.js';
import TitanMacros from '~/system/Macros';
import registerSystemSettings from '~/system/SystemSettings.js';
import registerInitiativeFormula from '~/system/Initiative.js';
import log from '~/utility/Log';

export default function onceInit() {
   log('Starting Titan VTTRPG System');

   // Register system settings
   registerSystemSettings();

   // Register initiative settings
   registerInitiativeFormula();

   // Register Document Classes
   CONFIG.Actor.documentClass = TitanActor;
   CONFIG.Item.documentClass = TitanItem;
   CONFIG.Token.documentClass = TitanTokenDocument;
   CONFIG.time.roundTime = 6;

   // Initialize titan specific game settings
   game.titan = {};

   // Add titan macros class
   game.titan.macros = new TitanMacros();

   // Register Sheet Classes
   Actors.registerSheet('titan', TitanPlayerSheet, {
      types: ['player'],
      makeDefault: true,
   });
   Actors.registerSheet('titan', TitanNPCSheet, {
      types: ['npc'],
      makeDefault: true,
   });
   Items.registerSheet('titan', TitanAbilitySheet, {
      types: ['ability'],
      makeDefault: true,
   });
   Items.registerSheet('titan', TitanArmorSheet, {
      types: ['armor'],
      makeDefault: true,
   });
   Items.registerSheet('titan', TitanCommoditySheet, {
      types: ['commodity'],
      makeDefault: true,
   });
   Items.registerSheet('titan', TitanEffectSheet, {
      types: ['effect'],
      makeDefault: true,
   });
   Items.registerSheet('titan', TitanEquipmentSheet, {
      types: ['equipment'],
      makeDefault: true,
   });
   Items.registerSheet('titan', TitanShieldSheet, {
      types: ['shield'],
      makeDefault: true,
   });
   Items.registerSheet('titan', TitanSpellSheet, {
      types: ['spell'],
      makeDefault: true,
   });
   Items.registerSheet('titan', TitanWeaponSheet, {
      types: ['weapon'],
      makeDefault: true,
   });

   return;
}