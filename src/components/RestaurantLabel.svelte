<script lang="ts">
  import type { RestaurantTypeLabel } from '../types/Restaurant';

  export let type: RestaurantTypeLabel;

  console.log(type);
  console.log(type === 'omnivore');
</script>

<span class={`type-label type-label-${type}`}>
  {type}
</span>

<style lang="scss">
  .type-label {
    display: inline-block;
    color: white;
    margin: 0 2px;
    padding: 4px 8px;
    border-radius: 3px;
    font-size: 12px;
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
