<script>
   export let label = void 0;
</script>

<div class="tag">
   {label}
</div>

<style lang="scss">
   .tag {
      @include flex-row;
      @include flex-group-center;
      @include border;
      @include label;
      font-weight: bold;
      padding: var(--padding-standard);
   }
</style>
