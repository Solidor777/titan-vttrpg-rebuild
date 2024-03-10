<script>
   import ItemSheetDescriptionTab from '~/item/sheet/ItemSheetDescriptionTab.svelte';
   import localize from '~/utility/Localize.js';
</script>

<ItemSheetDescriptionTab
   header={localize('attackNotes')}
   fieldName={'system.attackNotes'}
/>
