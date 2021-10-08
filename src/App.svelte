<script lang="ts">
  import { onMount } from "svelte";
  import axios from "axios";
  import Map from "./components/Map.svelte";
  import Restaurant from "./components/Restaurant.svelte";
  import type { RestaurantProps } from "./types/Restaurant";

  let restaurants: RestaurantProps[] = [];

  onMount(async () => {
    const response = await axios.get<RestaurantProps[]>(
      process.env.RESTAURANT_API_HOST
    );
    restaurants = response.data;
  });
</script>

<main>
  <h1>vgn.map</h1>
  {#each restaurants as restaurant}
    <Restaurant {...restaurant} />
  {/each}
  <Map {restaurants} />
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
	width: 50%;
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
</style>
