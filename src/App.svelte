<script lang="ts">
  import { onMount } from 'svelte';
  import type { IRestaurant, RestaurantPosition } from './types/Restaurant';
  import { getRestaurants } from './services/ContentfulService';
  import ArrowRight from './icons/ArrowRight.svelte';
  import Close from './icons/Close.svelte';
  import RestaurantCard from './components/RestaurantCard.svelte';
  import RestaurantMap from './components/RestaurantMap.svelte';

  let restaurants: IRestaurant[] = [];
  let selected: IRestaurant = null;
  let menuOpen: boolean = false;

  onMount(async () => {
    restaurants = await getRestaurants();
    restaurants = restaurants.filter((r) => r.address.city === 'Hamburg');
  });

  const onRestaurantClick = (r: IRestaurant) => {
    selected = r;
  };

  const onNavClose = () => {
    selected = null;
    menuOpen = false;
  };

  const onBack = () => {
    selected = null;
  };

  const onNavOpen = () => {
    menuOpen = true;
  };

  const onMarkerClick = (restaurant: IRestaurant) => {
    menuOpen = true;
    selected = restaurant;
  };
</script>

<main class="app-container">
  <div class="sidenav" class:sidenav-closed={!menuOpen}>
    <h1>Vegan Food</h1>
    {#if menuOpen}
      <div on:click={onNavClose} class="sidenav-close-icon"><Close /></div>
    {:else}
      <span on:click={onNavOpen}>
        <ArrowRight />
      </span>
    {/if}
    {#if menuOpen}
      {#if !selected}
        <ul>
          {#each restaurants as r}
            <li style="cursor: pointer;" on:click={() => onRestaurantClick(r)}>
              {r.name}
            </li>
          {/each}
        </ul>
      {:else}
        <RestaurantCard
          {selected}
          name={selected.name}
          city={selected.address.city}
          street={selected.address.street}
          zip={selected.address.zip}
          type={selected.restaurantType[0]}
          website={selected.website}
          menu={selected.menu}
          {onBack}
        />
      {/if}
    {/if}
  </div>

  <div class="map-container">
    {#if restaurants.length > 0}
      <RestaurantMap
        {restaurants}
        {onMarkerClick}
        coordinates={selected != null ? selected.position : null}
      />
    {/if}
    {#if selected !== null}
      <div>
        {JSON.stringify(selected)}
      </div>
    {/if}
  </div>
</main>

<style lang="scss">
  main {
    text-align: center;
    // max-width: 240px;
  }

  h1 {
    color: green;
    text-transform: uppercase;
    font-weight: 100;
    margin: 4px;
  }

  .sidenav {
    box-shadow: 4px 0px 4px -2px lightslategray;
    height: 100%;
    width: 300px;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #fff;
    overflow-x: hidden;
    transition: width 0.2s ease-in-out;
    h1 {
      transition: transform 0.1s ease-in-out;
    }

    &-closed {
      width: 48px;

      @media screen and (max-width: 480px) {
        height: 100px;
      }
      @media screen and (min-width: 481px) {
        h1 {
          transform: rotate(-90deg);
          height: 200px;
          width: 200px;
        }
      }
    }

    @media screen and (max-width: 480px) {
      width: 100vw;
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
