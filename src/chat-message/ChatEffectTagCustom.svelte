<script>
   import checkAddDarkSVGClass from '~/utility-functions/CheckAddDarkSVGClass.js';
   import tooltip from '~/helpers/svelte-actions/Tooltip.js';
   import localize from '~/utility-functions/Localize.js';
   import isHTMLBlank from '~/utility-functions/IsHTMLBlank.js';

   export let label = void 0;
   export let custom = void 0;
   export let img = void 0;
   export let description = void 0;
   export let remaining = void 0;

   // Calclate the tooltip
   const formattedTooltip = !isHTMLBlank(description)
      ? `${localize('effect.custom.desc')}${description}`
      : localize('effect.custom.desc');
</script>

<div class="tag" use:tooltip={{ content: formattedTooltip }}>
   <!--Image-->
   <img src={img} alt="img" class={checkAddDarkSVGClass(img)} />

   <!--Label-->
   <div>
      {label}
   </div>

   <!--Time Remaining-->
   <div class="time">
      {`${remaining} (${custom})`}
   </div>

   <!--Icon-->
   <i class={'fas fa-star'} />
</div>

<style lang="scss">
   .tag {
      @include flex-row;
      @include flex-group-center;
      @include border;
      @include font-size-small;
      @include effect-turn-start;
      font-weight: bold;
      padding: var(--padding-standard);

      .time {
         @include border-left;
         margin-left: var(--padding-standard);
         padding-left: var(--padding-standard);
      }

      img {
         width: 1.5rem;
         border: none;
         margin-right: var(--padding-standard);
      }

      i {
         margin-left: var(--padding-standard);
      }
   }
</style>
