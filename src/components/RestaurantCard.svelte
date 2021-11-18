<script lang="ts">
  import type { IAddress, RestaurantPosition } from "../types/Restaurant";

  export let name: string;
  export let website: string = null;
  export let address: IAddress;
  export let restaurantType: string[];
  export let position: RestaurantPosition; // TODO unused!
</script>

<div class="restaurant-card" id={name}>
  <h2>
    {name}
  </h2>
  <img src="https://via.placeholder.com/200" alt={`${name} restaurant image`} />
  <div class="restaurant-card-type">{restaurantType}</div>
  <p>{address.street}, {address.zip} {address.city}</p>
  <a href={website} target="_blank">{website}</a>
</div>

<style lang="scss">
  .restaurant-card {
    margin: 20px 20px;

    img {
      height: 200px;
    }

    &-type {
      color: green;
      margin: 8px 0 4px 0;
    }
  }
</style>
