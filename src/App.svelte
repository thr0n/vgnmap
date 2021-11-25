<script lang="ts">
  import { onMount } from "svelte";
  import { getRestaurants } from "./services/ContentfulService";
  import type { IRestaurant, RestaurantPosition } from "./types/Restaurant";
  import RestaurantMap from "./components/RestaurantMap.svelte";
  import RestaurantCard from "./components/RestaurantCard.svelte";
  import CitySelector from "./components/CitySelector.svelte";
  import "../public/global.scss";

  let restaurants: IRestaurant[] = [];
  let zoom = 12;
  let detailZoom = false;
  let selectedStoreLatLon: RestaurantPosition = [53.58, 9.99];
  let selectedCity = "Hamburg";
  let theme = "dark";
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
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
    }
  });
</script>

<main>
  <div class="app-container">
    <div
      class="restaurant-section"
      class:restaurant-section-dark={theme === "dark"}
    >
      <div
        class="header-container"
        class:header-container-dark={theme === "dark"}
      >
        <h1 class:darkMode={theme === "dark"}>Vegan essen in:</h1>
        <div class="header-controls">
          <CitySelector {restaurants} {selectedCity} {onCitySelection} />
        </div>
      </div>
      <div class="restaurant-list">
        {#each restaurantsToShow as restaurant (restaurant.name)}
          <div
            class="restaurant-list-item"
            on:click={() => {
              onRestaurantClick(restaurant.position);
            }}
          >
            <RestaurantCard
              address={restaurant.address}
              name={restaurant.name}
              restaurantType={restaurant.restaurantType[0]}
              menu={restaurant.menu}
              website={restaurant.website}
            />
          </div>
        {/each}
      </div>
      <button
        on:click={() => {
          // TODO refactor
          if (theme === "dark") {
            theme = "light";
          } else {
            theme = "dark";
          }
          document.body.classList.toggle("dark-mode");
        }}
        >{themeLabel}
      </button>
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
  @import "../public/global.scss";

  main {
    text-align: center;
    padding: 0em;
    margin: 0 auto;
  }

  h1 {
    color: $primary-color;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
    margin-bottom: 8px;
  }

  .darkMode {
    color: $primary-color-dark;
  }

  .app-container {
    display: grid;
    grid-template-rows: auto 300px;
    height: 100vh;
  }

  .header-container {
    padding: 8px 8px 12px 8px;
    border-bottom: 3px $primary-color dotted;
    margin: 0 20px;
    &-dark {
      border-color: $primary-color-dark;
    }
  }

  .restaurant-section {
    overflow-y: scroll;
  }

  .restaurant-list {
    &-item:not(:first-child) {
      border-top: 3px dotted darkgray;
    }
    &-item {
      cursor: pointer;
      margin: 0 20px;
    }
  }

  @media (max-width: 868px) {
    h1 {
      font-size: 3em;
    }
  }

  @media (max-width: 402px) {
    h1 {
      font-size: 2em;
    }
  }

  @media (min-width: 601px) {
    .app-container {
      grid-template-rows: none;
      grid-template-columns: 3fr 2fr;
    }
  }

  @media (min-width: 601px) and (max-width: 681px) {
    h1 {
      font-size: 2em;
    }
  }
</style>
