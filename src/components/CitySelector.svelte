<script lang="ts">
  import type { CitySelectorProps } from "../types/CitySelector";
  import type { IRestaurant } from "../types/Restaurant";

  export let onCitySelection;
  export let restaurants: IRestaurant[];
  export let selectedCity: string;
  let latLon;

  const handleCitySelection = (city: string) => {
    //if (selectedCity === city) return;
    // TODO extract city configuration
    if (city === "München") {
      selectedCity = "München";
      latLon = [48.1357845607709, 11.543135740571408];
    } else if (city === "Berlin") {
      selectedCity = "Berlin";
      latLon = [52.50425369791297, 13.382155237634121];
    } else {
      selectedCity = "Hamburg";
      latLon = [53.58, 9.99];
    }
    onCitySelection(latLon, selectedCity);
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
  <!--
  <div class="city-buttons-container"></div>
  {#each countRestaurantsGroupedByCity(restaurants) as rc (rc.city)}
    <div
      class="city-button"
      class:city-button-active={selectedCity === rc.city}
      on:click={() => handleCitySelection(rc.city)}
    >
      {rc.city} ({rc.restaurantCount})
    </div>
  {/each}
-->
  <div class="city-select-container">
    <select
      bind:value={selectedCity}
      on:change={() => {
        handleCitySelection(selectedCity);
      }}
    >
      {#each countRestaurantsGroupedByCity(restaurants) as option}
        <option value={option.city}>
          {option.city}
        </option>
      {/each}
    </select>
  </div>
</div>

<style lang="scss">
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
