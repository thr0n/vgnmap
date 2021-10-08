<script lang="ts">
  import { onMount } from "svelte";
  import axios from "axios";
  import Map from "./components/Map.svelte";
  import Restaurant from "./components/Restaurant.svelte";
  import type { RestaurantPosition, RestaurantProps } from "./types/Restaurant";

  let restaurants: RestaurantProps[] = [];
  let selectedCity = "Hamburg";
  let centerCoordinates: RestaurantPosition = [53.58, 9.99];
  let zoom = 12;

  function toggleCity() {
    if (selectedCity === "Hamburg") {
      selectedCity = "München";
      centerCoordinates = [48.1357845607709, 11.543135740571408];
      zoom = 13;
    } else {
      selectedCity = "Hamburg";
      centerCoordinates = [53.58, 9.99];
      zoom = 12;
    }
  }

  onMount(async () => {
    const response = await axios.get<RestaurantProps[]>(
      process.env.RESTAURANT_API_HOST
    );
    restaurants = response.data;
  });
</script>

<main>
  <div class="app-container">
    <div class="restaurant-tiles">
      <h1>vgn.map</h1>
      <p class="clickable" on:click={toggleCity}>
        Ausgewählte Stadt: <span class="selected-city">{selectedCity}</span>
      </p>
      {#each restaurants.filter((r) => r.city === selectedCity) as restaurant}
        <Restaurant {...restaurant} />
      {/each}
    </div>
    <Map {restaurants} {centerCoordinates} {zoom} />
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
    grid-template-columns: 1fr 2fr;
    height: 100vh;
  }

  .selected-city {
    font-weight: 800;
  }

  .clickable {
    cursor: pointer;
  }
</style>
