<script lang="ts">
  export let label: string;
  export let type: string;
</script>

<span class={`restaurant-tag restaurant-tag-${type}`}>
  {label}
</span>

<style lang="scss">
  .restaurant-tag {
    display: inline-block;
    color: white;
    padding: 4px 8px;
    border-radius: 3px;
    font-size: 12px;
    background-color: #15b097;

    &-vegetarian {
      background-color: #2ba84a;
    }

    &-omnivore {
      background-color: #ff3e00;
    }

    &-food {
      background-color: #533745;
    }
  }
</style>
