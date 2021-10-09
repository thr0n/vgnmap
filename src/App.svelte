<script lang="ts">
  import { onMount } from "svelte";
  import axios from "axios";
  import Map from "./components/Map.svelte";
  import Restaurant from "./components/Restaurant.svelte";
  import type { RestaurantPosition, RestaurantProps } from "./types/Restaurant";
  import { detailZoom, selectedCity, selectedStoreLatLon } from "./stores/selection";

  let restaurants: RestaurantProps[] = [];
  let zoom = 12;

  function toggleCity() {
    // TODO extract city configuration
    if ($selectedCity === "Hamburg") {
      $selectedCity = "München";
      $selectedStoreLatLon = [48.1357845607709, 11.543135740571408];
      $detailZoom = false
      zoom = 13;
    } else {
      $selectedCity = "Hamburg";
      $selectedStoreLatLon = [53.58, 9.99];
      $detailZoom = false
      zoom = 12;
    }
  }

  const handleRestaurantFocus = (position: RestaurantPosition) => {
    $selectedStoreLatLon = position;
    $detailZoom = true;
  }

  $selectedStoreLatLon = [53.58, 9.99];

  onMount(async () => {
    const response = await axios.get<RestaurantProps[]>(
      process.env.RESTAURANT_API_HOST
    );
    restaurants = response.data;
  });
</script>

<main>
  <div class="app-container">
    <div class="restaurant-section">
      <div class="header-container">
        <h1>Vegan essen in...</h1>
          <h2 class="clickable" on:click={toggleCity}>{$selectedCity}</h2>
      </div>
      <div class="restaurant-list">
        {#each restaurants.filter((r) => r.city === $selectedCity).sort((a, b) => a.position[1] > b.position[1] ? 1 : a.position[1] < b.position[1] ? -1 : 0) as restaurant (restaurant.name)}
          <div
            on:mouseover={() => {handleRestaurantFocus(restaurant.position)}}
            on:focus={() => {handleRestaurantFocus(restaurant.position)}}
            on:mouseenter={() => {handleRestaurantFocus(restaurant.position)}}
          >
            <Restaurant {...restaurant} />
          </div>
        {/each}
      </div>
    </div>
    {#if restaurants.length > 0}
      <Map {restaurants} centerCoordinates={$selectedStoreLatLon} {zoom} />
    {/if}
  </div>
</main>

<style lang="scss">
  main {
    text-align: center;
    padding: 0em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }

  .app-container {
    display: grid;
    grid-template-columns: 2fr 1fr;
    height: 100vh;
  }

  .clickable {
    cursor: pointer;
  }  

  .header-container {
    margin: 0 auto;
    width: 66%;
    border-bottom: 3px dotted #ff3e00; 
    margin-bottom: 24px;
  }
  
  .restaurant-list {
    overflow-y: scroll;
    height: 79vh;
  }
</style>
