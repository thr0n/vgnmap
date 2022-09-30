<script lang="ts">
  import { onMount } from 'svelte';
  import type { IRestaurant } from './types/Restaurant';
  import { getRestaurants } from './services/ContentfulService';
  import ArrowRight from './icons/ArrowRight.svelte';
  import Close from './icons/Close.svelte';
  import RestaurantCard from './components/RestaurantCard.svelte';
  import RestaurantMap from './components/RestaurantMap.svelte';
  import RestaurantListItem from './components/RestaurantListItem.svelte'

  let restaurants: IRestaurant[] = [];
  let selected: IRestaurant = null;
  let menuOpen: boolean = false;
  let selectedCity: string

  const urlParams = new URLSearchParams(window.location.search)
  const city = urlParams.has('city')

  if (city) {
    selectedCity = urlParams.get('city')
  } else {
    selectedCity = 'hamburg'
  }

  const sortRestaurants = (a: IRestaurant, b: IRestaurant) => {
    if (a.position[1] > b.position[1]) {
        return 1
     }
     if (a. position[1] < b.position[1]) {
      return -1
     }
     return 0
  }
  
  onMount(async () => {
    const places: IRestaurant[] = await getRestaurants()
    
    const updated = places.map(p => {
      if (p.address.city.includes('ü')) {
        return {
          ...p,
          address: {
            ...p.address,
            city: p.address.city.replace(/\u00fc/g, 'ue')
          }
        }
      }
      return p
    })
    restaurants = updated.filter((r) => r.address.city.toLowerCase() === selectedCity)//.sort(sortRestaurants)
  })

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
    {#if menuOpen}
      <div on:click={onNavClose} class="sidenav-close-icon"><Close /></div>
    {:else}
      <span on:click={onNavOpen}>
        <ArrowRight />
      </span>
    {/if}
    {#if menuOpen}
      {#if !selected}
        <div>
          {#each restaurants as r}
            <RestaurantListItem restaurant={r} onClick={() => onRestaurantClick(r)}/>
          {/each}
        </div>
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
    padding: 12px 4px 0 0;
    display: grid;
    grid-template-rows: 30px max-content;

    h1 {
      color: green;
      text-transform: uppercase;
      font-weight: 100;
      margin: 4px;
      transition: transform 0.1s ease-in-out;
    }

    &-close-icon {
      display: flex;
      align-items: center;
      justify-content: end;
      padding-right: 12px;
    }

    &-closed {
      width: 48px;
      //width: 400px;

      @media screen and (max-width: 480px) {
        height: 48px;
      }
      @media screen and (min-width: 481px) {
        h1 {
          transform: rotate(-90deg) translate(-100%, 0);
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
