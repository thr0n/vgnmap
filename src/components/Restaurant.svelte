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

<style>
  .restaurant-card {
    border-bottom: 3px dotted #EAEAEA;
    margin: 0 auto;
    margin-bottom: 8px;
    margin-left: 20px;
    margin-right: 20px;
    min-height: 330px;
  }
</style>
