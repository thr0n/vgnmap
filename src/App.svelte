<script lang="ts">
  import { onMount } from 'svelte';
  import RestaurantCard from './components/RestaurantCard.svelte';
  import RestaurantMap from './components/RestaurantMap.svelte';
  import { getRestaurants } from './services/ContentfulService';
  import type { IRestaurant } from './types/Restaurant';

  import viewport from './actions/useViewportAction';

  let restaurants: IRestaurant[] = [];
  let selected: IRestaurant = null;
  let selectedCity: string;

  const urlParams = new URLSearchParams(window.location.search);
  const city = urlParams.has('city');

  if (city) {
    selectedCity = urlParams.get('city');
  } else {
    selectedCity = 'hamburg';
  }

  const sortRestaurants = (a: IRestaurant, b: IRestaurant) => {
    if (a.position[1] > b.position[1]) {
      return 1;
    }
    if (a.position[1] < b.position[1]) {
      return -1;
    }
    return 0;
  };

  onMount(async () => {
    const places: IRestaurant[] = await getRestaurants();

    const updated = places.map((p) => {
      if (p.address.city.includes('ü')) {
        return {
          ...p,
          address: {
            ...p.address,
            city: p.address.city.replace(/\u00fc/g, 'ue')
          }
        };
      }
      return p;
    });
    restaurants = updated
      .filter((r) => r.address.city.toLowerCase() === selectedCity)
      .sort(sortRestaurants);

    onRestaurantClick(restaurants[0]);
  });

  const onRestaurantClick = (r: IRestaurant) => {
    selected = r;
  };

  const onMarkerClick = (restaurant: IRestaurant) => {
    selected = restaurant;
  };
</script>

<main class="app-container">
  <div class="sidenav">
    <div class="restaurant-section">
      {#each restaurants as r}
        <div use:viewport on:enterViewport={() => onRestaurantClick(r)}>
          <RestaurantCard restaurant={r} onClick={() => onRestaurantClick(r)} />
        </div>
      {/each}
    </div>
  </div>

  <div class="map-container">
    {#if restaurants.length > 0}
      <RestaurantMap
        {restaurants}
        {onMarkerClick}
        coordinates={selected != null ? selected.position : null}
      />
    {/if}
  </div>
</main>

<style lang="scss">
  @import '../public/global.scss';

  .sidenav {
    overflow-y: scroll;
  }

  main {
    text-align: center;
    padding: 0em;
    margin: 0 auto;
  }

  h1 {
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
    margin-bottom: 8px;
  }

  .app-container {
    display: grid;
    height: 100vh;
    grid-template-rows: none;
    grid-template-columns: 66% auto;
  }

  .header-container {
    padding: 8px 8px 12px 8px;
    border-bottom: 3px #000000 dotted;
    margin: 0 20px;
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

  .theme-toggle {
    font-size: 10px;
    padding-bottom: 16px;
    cursor: pointer;
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
    }
  }

  @media (min-width: 601px) and (max-width: 681px) {
    h1 {
      font-size: 2em;
    }
  }

  .map-container {
    height: 100vh;
    margin-left: 30px;

    @media screen and (max-width: 480px) {
      margin-left: 0;
    }
  }
</style>
