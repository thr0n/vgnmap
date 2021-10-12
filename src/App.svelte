<script lang="ts">
  import { onMount } from "svelte";
  import axios from "axios";
  import type { RestaurantPosition, RestaurantProps } from "./types/Restaurant";
  import type { CitySelectorProps } from "./types/CitySelector";
  import RestaurantMap from "./components/RestaurantMap.svelte";
  import RestaurantCard from "./components/RestaurantCard.svelte";
  import CitySelector from "./components/CitySelector.svelte";
  import {
    detailZoom,
    selectedCity,
    selectedStoreLatLon,
  } from "./stores/selection";

  let restaurants: RestaurantProps[] = [];
  let zoom = 12;

  const handleRestaurantFocus = (position: RestaurantPosition) => {
    $selectedStoreLatLon = position;
    $detailZoom = true;
  };

  $selectedStoreLatLon = [53.58, 9.99];

  onMount(async () => {
    const response = await axios.get<RestaurantProps[]>(
      process.env.RESTAURANT_API_HOST
    );
    restaurants = response.data;
  });

  const countRestaurantsGroupedByCity = (restaurants): CitySelectorProps[] => {
    let resultMap = new Map();
    restaurants.map((r) => {
      const { city } = r;
      resultMap.set(
        city,
        resultMap.get(city) === undefined ? 1 : resultMap.get(city) + 1
      );
    });
    return Array.from(resultMap, ([city, restaurantCount]) => ({
      city,
      restaurantCount,
    })).sort((a, b) =>
      a.restaurantCount < b.restaurantCount
        ? 1
        : a.restaurantCount > b.restaurantCount
        ? -1
        : 0
    );
  };
</script>

<main>
  <div class="app-container">
    <div class="restaurant-section">
      <div class="header-container">
        <h1>Vegan essen in:</h1>
        <CitySelector
          restaurantCount={countRestaurantsGroupedByCity(restaurants)}
        />
      </div>
      <div class="restaurant-list">
        {#each restaurants
          .filter((r) => r.city === $selectedCity)
          .sort( (a, b) => (a.position[1] > b.position[1] ? 1 : a.position[1] < b.position[1] ? -1 : 0) ) as restaurant (restaurant.name)}
          <div
            on:mouseover={() => {
              handleRestaurantFocus(restaurant.position);
            }}
            on:focus={() => {
              handleRestaurantFocus(restaurant.position);
            }}
            on:mouseenter={() => {
              handleRestaurantFocus(restaurant.position);
            }}
          >
            <RestaurantCard {...restaurant} />
          </div>
        {/each}
      </div>
    </div>
    <div class="map-container">
      {#if restaurants.length > 0}
        <RestaurantMap
          {restaurants}
          centerCoordinates={$selectedStoreLatLon}
          {zoom}
        />
      {/if}
    </div>
  </div>
</main>

<style lang="scss">
  main {
    text-align: center;
    padding: 0em;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  .app-container {
    display: grid;
    grid-template-rows: auto 300px;
    grid-gap: 10px;
    height: 100vh;
  }

  .header-container {
    padding: 8px;
    border-bottom: 3px #ff3e00 dotted;
    margin: 0 20px 0 20px;
  }

  .restaurant-section {
    overflow-y: scroll;
  }

  @media (max-width: 860px) {
    h1 {
      font-size: 3em;
    }
  }

  @media (min-width: 601px) {
    .app-container {
      grid-template-rows: none;
      grid-template-columns: 3fr 2fr;
    }
  }
</style>
