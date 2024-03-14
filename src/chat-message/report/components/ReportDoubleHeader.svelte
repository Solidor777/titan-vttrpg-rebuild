<script>
   import { getContext } from 'svelte';

   // Document reference
   const document = getContext('document');
   const chatContext = $document.flags.titan;

   export let icon = void 0;
   export let label = void 0;
   export let img1;
   export let img2;
   export let name1;
   export let name2;
</script>

<div class="header">
   <!--Images-->
   <div class="images">
      <img src={img1} alt="img1" />
      <img src={img2} alt="img2" />
   </div>

   <!--Header-->
   <div class="label">
      <!--Sub Headers-->
      <div class="name">
         {name1}
      </div>
      <div class="name">
         {name2}
      </div>

      <!--Main Header-->
      <div class="main">
         <!--Icon-->
         <i class={icon} />
         {label}
      </div>
   </div>
</div>

<style lang="scss">
   .header {
      @include flex-column;
      @include flex-group-top;
      @include font-size-normal;
      width: 100%;
      font-weight: bold;

      img {
         @include panel-1;
         @include border;
         width: 5rem;
         margin-bottom: var(--padding-large);

         &:not(:first-child) {
            margin-left: var(--padding-standard);
         }
      }

      .label {
         @include flex-column;
         @include flex-group-top;
         @include panel-1;
         @include border;
         width: 100%;
         padding: var(--padding-standard);

         .main {
            @include flex-row;
            @include flex-group-center;
            @include font-size-large;
            width: 100%;
            margin: var(--padding-standard) 0 var(--padding-standard);
            flex-wrap: wrap;

            i {
               margin-right: var(--padding-standard);
            }
         }

         .name {
            @include flex-row;
            @include flex-group-center;
            width: 100%;
            flex-wrap: wrap;

            &:not(:first-child) {
               margin-top: var(--padding-standard);
            }
         }
      }
   }
</style>
