<script lang="ts">
  import { onMount } from "svelte";
  import { getRestaurants } from "./services/ContentfulService";
  import type { IRestaurant, RestaurantPosition } from "./types/Restaurant";
  import RestaurantMap from "./components/RestaurantMap.svelte";
  import RestaurantCard from "./components/RestaurantCard.svelte";
  import CitySelector from "./components/CitySelector.svelte";

  let restaurants: IRestaurant[] = [];
  let zoom = 12;
  let detailZoom = false;
  let selectedStoreLatLon: RestaurantPosition = [53.58, 9.99];
  let selectedCity = "Hamburg";
  let theme = "light";
  $: themeLabel = theme === "light" ? "Lights off" : "Lights on";

  const onRestaurantClick = (position: RestaurantPosition) => {
    selectedStoreLatLon = position;
    detailZoom = true;
  };

  const onCitySelection = (location: RestaurantPosition, city: string) => {
    selectedCity = city;
    selectedStoreLatLon = location;
    detailZoom = false;
  };

  $: restaurantsToShow = restaurants
    .filter((r) => r.address.city === selectedCity)
    .sort((a, b) =>
      a.position[1] > b.position[1] ? 1 : a.position[1] < b.position[1] ? -1 : 0
    );

  onMount(async () => {
    restaurants = await getRestaurants();
  });
</script>

<main>
  <div class="app-container">
    <div class="restaurant-section">
      <div class="header-container">
        <h1>Vegan essen in:</h1>
        <CitySelector {restaurants} {selectedCity} {onCitySelection} />
        <button
          on:click={() => { // TODO refactor
            if (theme === "dark") {
              theme = "light";
            } else {
              theme = "dark";
            }
          }}>{themeLabel}</button
        >
      </div>
      <div class="restaurant-list">
        {#each restaurantsToShow as restaurant (restaurant.name)}
          <div
            class="restaurant-list-item"
            on:mouseover={() => {
              onRestaurantClick(restaurant.position);
            }}
            on:focus={() => {
              onRestaurantClick(restaurant.position);
            }}
            on:mouseenter={() => {
              onRestaurantClick(restaurant.position);
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
          centerCoordinates={selectedStoreLatLon}
          {zoom}
          {detailZoom}
          onMarkerClick={onRestaurantClick}
          {theme}
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

  .restaurant-list {
    &-item:not(:first-child) {
      border-top: 3px dotted #eaeaea;
    }
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
