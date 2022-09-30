<script lang="ts">
  import type { RestaurantTypeLabel } from '../types/Restaurant';

  export let type: RestaurantTypeLabel | string;
</script>

<span class={`type-label type-label-${type}`}>
  {type}
</span>

<style lang="scss">
  .type-label {
    display: inline-block;
    color: white;
    margin: 0 2px;
    margin-top: 4px;
    padding: 4px 8px;
    border-radius: 3px;
    font-size: 12px;
    background-color: #000000;

    &-omnivore {
      background-color: #ff3e00;
    }
    &-vegetarian {
      background-color: #15b097;
    }
    &-vegan {
      background-color: #2ba84a;
    }
  }
</style>
