<script>
   import { getContext } from 'svelte';
   import { ATTACK_TRAIT_DESCRIPTIONS } from '~/document/types/item/types/weapon/AttackTraits.js';
   import localize from '~/helpers/utility-functions/Localize.js';
   import tooltip from '~/helpers/svelte-actions/Tooltip.js';
   import appendUniqueWithFilter from '~/helpers/utility-functions/AppendUniqueWithFilter.js';
   import IconStatTag from '~/helpers/svelte-components/tag/IconStatTag.svelte';
   import IconTag from '~/helpers/svelte-components/tag/IconTag.svelte';
   import StatTag from '~/helpers/svelte-components/tag/StatTag.svelte';
   import Tag from '~/helpers/svelte-components/tag/Tag.svelte';

   // Document reference
   const document = getContext('document');
   let customTraits = [];

   function traitFilter(value, match) {
      return (
         value.name === match.name && value.description === match.description
      );
   }

   $: {
      customTraits = [];
      const itemTraits = $document.flags.titan.parameters.itemTrait;
      const attackTraits = $document.flags.titan.parameters.attack.customTrait;
      appendUniqueWithFilter(customTraits, itemTraits, traitFilter);
      appendUniqueWithFilter(customTraits, attackTraits, traitFilter);
   }

   const traitDescriptions = ATTACK_TRAIT_DESCRIPTIONS;
</script>

<div class="stats">
   <!--Type-->
   <div class="stat">
      <IconTag
         icon={$document.flags.titan.parameters.type === 'melee'
            ? 'fas fa-sword'
            : 'fas fa-bow-arrow'}
         label={localize($document.flags.titan.parameters.type)}
      />
   </div>

   <!--Range-->
   {#if $document.flags.titan.parameters.attack.range !== 1}
      <div class="stat">
         <IconStatTag
            label={localize('range')}
            value={$document.flags.titan.parameters.attack.range}
            icon={'fas fa-ruler'}
         />
      </div>
   {/if}

   <!--Multi-Attack-->
   {#if $document.flags.titan.parameters.multiAttack}
      <div class="stat">
         <IconTag label={localize('multiAttack')} icon={'fas fa-swords'} />
      </div>
   {/if}

   <!--Custom Traits-->
   {#each customTraits as trait}
      <div class="stat" use:tooltip={{ content: trait.description }}>
         <Tag label={trait.name} />
      </div>
   {/each}

   <!--Attack Traits-->
   {#each $document.flags.titan.parameters.attack.trait as trait}
      <div
         class="stat"
         use:tooltip={{ content: localize(traitDescriptions[trait.name]) }}
      >
         {#if trait.type === 'number'}
            <StatTag label={localize(trait.name)} value={trait.value} />
         {:else}
            <Tag label={localize(trait.name)} />
         {/if}
      </div>
   {/each}
</div>

<style lang="scss">
   .stats {
      @include flex-row;
      @include flex-group-center;
      width: 100%;
      flex-wrap: wrap;

      .stat {
         @include tag-margin;
      }
   }
</style>
