import TitanActor from '~/document/types/actor/Actor.js';
import TitanItem from '~/document/types/item/Item.js';
import TitanPlayerSheet from '~/document/types/actor/types/character/types/player/PlayerSheet.js';
import TitanNPCSheet from '~/document/types/actor/types/character/types/npc/NPCSheet.js';
import TitanAbilitySheet from '~/document/types/item/types/ability/sheet/AbilitySheet.js';
import TitanArmorSheet from '~/document/types/item/types/armor/sheet/ArmorSheet.js';
import TitanCommoditySheet from '~/document/types/item/types/commodity/sheet/CommoditySheet.js';
import TitanEffectSheet from '~/document/types/item/types/effect/sheet/EffectSheet.js';
import TitanEquipmentSheet from '~/document/types/item/types/equipment/sheet/EquipmentSheet.js';
import TitanShieldSheet from '~/document/types/item/types/shield/sheet/ShieldSheet';
import TitanSpellSheet from '~/document/types/item/types/spell/sheet/SpellSheet.js';
import TitanWeaponSheet from '~/document/types/item/types/weapon/sheet/WeaponSheet.js';
import TitanTokenDocument from '~/document/TokenDocument.js';
import TitanMacros from '~/system/Macros';
import PlayerDataModel from '~/document/types/actor/types/character/types/player/PlayerDataModel.js';
import NPCDataModel from '~/document/types/actor/types/character/types/npc/NPCDataModel.js';
import registerSystemSettings from '~/system/SystemSettings.js';
import registerInitiativeFormula from '~/system/Initiative.js';
import log from '~/helpers/utility-functions/Log';
import warn from '~/helpers/utility-functions/Warn.js';
import error from '~/helpers/utility-functions/Error.js';

export default function onceInit() {
   log('Starting Titan VTTRPG System');

   // Initialize titan namespace
   game.titan = {
      macros: new TitanMacros(),
      warn: warn,
      log: log,
      error: error,
   };

   // Register system settings
   registerSystemSettings();

   // Register initiative settings
   registerInitiativeFormula();

   // Register Document Classes
   CONFIG.Actor.documentClass = TitanActor;
   CONFIG.Actor.dataModels.player = PlayerDataModel;
   CONFIG.Actor.dataModels.npc = NPCDataModel;
   CONFIG.Item.documentClass = TitanItem;
   CONFIG.Token.documentClass = TitanTokenDocument;
   CONFIG.time.roundTime = 6;


   // Register Sheet Classes
   Actors.registerSheet(
      'titan', TitanPlayerSheet, {
         types: ['player'],
         makeDefault: true,
      },
   );
   Actors.registerSheet(
      'titan', TitanNPCSheet, {
         types: ['npc'],
         makeDefault: true,
      },
   );
   Items.registerSheet(
      'titan', TitanAbilitySheet, {
         types: ['ability'],
         makeDefault: true,
      },
   );
   Items.registerSheet(
      'titan', TitanArmorSheet, {
         types: ['armor'],
         makeDefault: true,
      },
   );
   Items.registerSheet(
      'titan', TitanCommoditySheet, {
         types: ['commodity'],
         makeDefault: true,
      },
   );
   Items.registerSheet(
      'titan', TitanEffectSheet, {
         types: ['effect'],
         makeDefault: true,
      },
   );
   Items.registerSheet(
      'titan', TitanEquipmentSheet, {
         types: ['equipment'],
         makeDefault: true,
      },
   );
   Items.registerSheet(
      'titan', TitanShieldSheet, {
         types: ['shield'],
         makeDefault: true,
      },
   );
   Items.registerSheet(
      'titan', TitanSpellSheet, {
         types: ['spell'],
         makeDefault: true,
      },
   );
   Items.registerSheet(
      'titan', TitanWeaponSheet, {
         types: ['weapon'],
         makeDefault: true,
      },
   );

   return;
}
