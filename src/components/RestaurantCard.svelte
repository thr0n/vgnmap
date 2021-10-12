<script lang="ts">
  import type { RestaurantPosition } from "../types/Restaurant";
  export let name: string;
  export let position: RestaurantPosition;
  export let veganOnly: boolean = false;
  export let website: string = null;
  export let city: string;
</script>

<div class="restaurant-card">
  <h2>
    {name}
  </h2>
  <p>
    {website}
  </p>
</div>

<style lang="scss">
  .restaurant-card {
    border-bottom: 3px dotted #eaeaea;
    margin: 0 20px 8px 20px;
  }
</style>
