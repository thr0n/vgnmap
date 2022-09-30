<script lang="ts">
  import type { IRestaurant } from '../types/Restaurant';
  import RestaurantLabel from './RestaurantLabel.svelte';
  export let restaurant: IRestaurant;
  export let onClick: (restaurant: IRestaurant) => void;
</script>

<div class="restaurant-card" on:click={() => onClick(restaurant)}>
  <div class="restaurant-card-header">
    <h2>{restaurant.name}</h2>
  </div>
  <p class="label-row">
    <RestaurantLabel type={restaurant.restaurantType[0]} />
    {#if restaurant.menu && restaurant.menu.length > 0}
      {#each restaurant.menu as m}
        <RestaurantLabel type={m} />
      {/each}
    {/if}
  </p>
  <div>{restaurant.address.street}</div>
  <div>{restaurant.address.zip} {restaurant.address.city}</div>
  <!--
  {#if restaurant.website}
    <p>
      <a href={restaurant.website}>{restaurant.website}</a>
    </p>
  {/if}
  -->
</div>

<style lang="scss">
  h2 {
    margin: 0;
  }

  .restaurant-card {
    margin-top: 24px;
    &-header {
    }
  }
</style>
