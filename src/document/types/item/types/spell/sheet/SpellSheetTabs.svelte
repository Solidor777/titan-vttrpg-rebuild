<script>
   import { getContext } from 'svelte';
   import localize from '~/helpers/utility-functions/Localize.js';
   import ItemSheetChecksTab from '~/document/types/item/component/check/ItemSheetChecksTab.svelte';
   import SpellSheetCastingCheckTab from '~/document/types/item/types/spell/sheet/SpellSheetCastingCheckTab.svelte';
   import SpellSheetStandardAspectsTab from '~/document/types/item/types/spell/sheet/SpellSheetStandardAspectsTab.svelte';
   import SpellSheetCustomAspectsTab from '~/document/types/item/types/spell/sheet/SpellSheetCustomAspectsTab.svelte';
   import ItemSheetDescriptionTab from '~/document/types/item/sheet/ItemSheetDescriptionTab.svelte';
   import BorderedTabs from '~/helpers/svelte-components/BorderedTabs.svelte';

   const appState = getContext('applicationState');

   // Tabs
   const tabs = [
      {
         label: localize('description'),
         id: 'description',
         component: ItemSheetDescriptionTab,
      },
      {
         label: localize('standardAspects'),
         id: 'standardAspects',
         component: SpellSheetStandardAspectsTab,
      },
      {
         label: localize('customAspects'),
         id: 'customAspects',
         component: SpellSheetCustomAspectsTab,
      },
      {
         label: localize('castingCheck'),
         id: 'castingCheck',
         component: SpellSheetCastingCheckTab,
      },
      {
         label: localize('checks'),
         id: 'checks',
         component: ItemSheetChecksTab,
      },
   ];
</script>

<BorderedTabs {tabs} bind:activeTab={$appState.activeTab} />
