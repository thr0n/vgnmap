<script lang="ts">
  import {
    detailZoom,
    selectedCity,
    selectedStoreLatLon,
  } from "../stores/selection";
  import type { CitySelectorProps } from "../types/CitySelector";

  export let restaurantCount: CitySelectorProps[];

  let zoom = 12;

  const handleCitySelection = (city: string) => {
    console.log("Selected: " + city);
    if ($selectedCity === city) return;
    // TODO extrat city configuration
    if (city === "München") {
      $selectedCity = "München";
      $selectedStoreLatLon = [48.1357845607709, 11.543135740571408];
      $detailZoom = false;
      zoom = 13;
    } else if (city === "Berlin") {
      $selectedCity = "Berlin";
      $selectedStoreLatLon = [52.50425369791297, 13.382155237634121];
      $detailZoom = false;
      zoom = 13;
    } else {
      $selectedCity = "Hamburg";
      $selectedStoreLatLon = [53.58, 9.99];
      $detailZoom = false;
      zoom = 12;
    }
  };
</script>

<div class="city-selector">
  {#each restaurantCount as rc (rc.city)}
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
