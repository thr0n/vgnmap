<script lang="ts">
  import type { IRestaurant } from '../types/Restaurant';
  import RestaurantLabel from './RestaurantLabel.svelte';
  export let restaurant: IRestaurant;
  export let onClick: (restaurant: IRestaurant) => void;
</script>

<div
  class="restaurant-card"
  on:click={() => onClick(restaurant)}
  on:keydown={() => onClick(restaurant)}
>
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
  <!--
  <div>{restaurant.address.street}</div>
  <div>{restaurant.address.zip} {restaurant.address.city}</div>
  -->
</div>

<style lang="scss">
  h2 {
    margin: 0;
  }

  .restaurant-card {
    display: block;
    top: 0px;
    background-color: #f2f4f5;
    border-radius: 4px;
    padding: 32px 24px;
    margin: 12px;
    text-decoration: none;
    overflow: hidden;
    border: 1px solid #e6e9eb;

    &:hover {
      border: 1px solid #c0c9cc;
      box-shadow: 0px 0px 999px 999px rgba(255, 255, 255, 0.5);
      z-index: 500;
    }
  }

  .card3:hover {
    p {
      color: #00838d;
    }
  }
</style>
