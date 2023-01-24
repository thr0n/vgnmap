<script lang="ts">
  import type { IRestaurant } from '../types/Restaurant';
  import RestaurantLabel from './RestaurantLabel.svelte';
  import RestaurantMap from './RestaurantMap.svelte';
  export let restaurant: IRestaurant;
  export let onClose: () => any;
  import RestaurantAddress from './RestaurantAddress.svelte';
  import Close from '../icons/Close.svelte';
</script>

<div class="restaurant-details">
  <div class="restaurant-details-headline">
    <h1 class="headline">{restaurant.name}</h1>
    <div
      class="close-icon"
      on:click={() => {
        onClose();
      }}
    >
      <Close />
    </div>
  </div>
  <div>
    <h3>Menü:</h3>
    <div>
      <RestaurantLabel type={restaurant.restaurantType[0]} />
      {#if restaurant.menu && restaurant.menu.length > 0}
        {#each restaurant.menu as m}
          <RestaurantLabel type={m} />
        {/each}
      {/if}
    </div>

    <RestaurantAddress
      address={restaurant.address}
      locations={restaurant.locations}
    />

    {#if restaurant.website}
      <h3>Links:</h3>
      <div class="website">
        <a href={restaurant.website} target="_blank" rel="noreferrer"
          >🌍 Website</a
        >
      </div>
    {/if}
  </div>
  <div class="detail-map-container">
    <RestaurantMap
      restaurants={[restaurant]}
      onMarkerClick={() => {}}
      selected={restaurant}
    />
  </div>
</div>

<style lang="scss">
  .restaurant-details {
    padding: 0px 16px 24px 16px;

    &-headline {
      display: grid;
      align-items: center;
      grid-template-columns: auto 80% auto;
      grid-template-areas: '. headline close-icon';

      .headline {
        grid-area: headline;
      }

      .close-icon {
        grid-area: close-icon;
      }
    }

    .website {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .detail-map-container {
    visibility: hidden;
    @media screen and (max-width: 480px) {
      margin-top: 12px;
      visibility: visible;
      height: 333px;
      margin-left: 0;
    }
  }
</style>
