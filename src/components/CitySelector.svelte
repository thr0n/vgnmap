<script lang="ts">
  import {
    detailZoom,
    selectedCity,
    selectedStoreLatLon,
  } from "../stores/selection";
  import type { CitySelectorProps } from "../types/CitySelector";
  import type { IRestaurant } from "../types/Restaurant";

  export let restaurants: IRestaurant[];

  let zoom = 12;

  const handleCitySelection = (city: string) => {
    console.log("Selected: " + city);
    if ($selectedCity === city) return;
    // TODO extrat city configuration
    if (city === "München") {
      $selectedCity = "München";
      $selectedStoreLatLon = [48.1357845607709, 11.543135740571408];
      $detailZoom = false;
      zoom = 16;
    } else if (city === "Berlin") {
      $selectedCity = "Berlin";
      $selectedStoreLatLon = [52.50425369791297, 13.382155237634121];
      $detailZoom = false;
      zoom = 14;
    } else {
      $selectedCity = "Hamburg";
      $selectedStoreLatLon = [53.58, 9.99];
      $detailZoom = false;
      zoom = 12;
    }
  };

  const countRestaurantsGroupedByCity = (restaurants): CitySelectorProps[] => {
    let resultMap = new Map();
    restaurants.map((r) => {
      const { city } = r.address;
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

<div class="city-selector">
  {#each countRestaurantsGroupedByCity(restaurants) as rc (rc.city)}
    <div
      class="city-button"
      class:city-button-active={$selectedCity === rc.city}
      on:click={() => handleCitySelection(rc.city)}
    >
      {rc.city} ({rc.restaurantCount})
    </div>
  {/each}
</div>

<style lang="scss">
  .city-selector {
    display: flex;
    justify-content: center;
    padding: 0 16px 16px 16px;
  }

  .city-button {
    margin-right: 16px;
    background-color: lightsalmon;
    padding: 8px;
    border-radius: 4px;
    cursor: pointer;

    &-active {
      color: white;
      background-color: #ff3e00;
    }
  }
</style>
