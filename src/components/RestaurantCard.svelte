<script lang="ts">
  import type { RestaurantPosition } from "../types/Restaurant";
  export let name: string;
  export let position: RestaurantPosition;
  export let veganOnly: boolean = false;
  export let website: string = null;
  export let city: string;
</script>

<div class="restaurant-card" id={name}>
  <h2>
    {name}
  </h2>
  <img src="https://via.placeholder.com/200" alt={`${name} restaurant image`} />
  <p>
    <a href={website} target="_blank">{website}</a>
  </p>
</div>

<style lang="scss">
  .restaurant-card {
    margin: 20px 20px;
  }
</style>
