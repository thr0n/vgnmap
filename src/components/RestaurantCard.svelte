<script lang="ts">
  import type { IAddress } from "../types/Restaurant";
  import RestaurantTag from "./RestaurantTag.svelte";

  export let name: string;
  export let website: string = null;
  export let address: IAddress;
  export let restaurantType: string;
  export let menu: string[] = [];
</script>

<div class="restaurant-card" id={name}>
  <h2>
    {name}
  </h2>
  <div class="restaurant-tags">
    <RestaurantTag label={restaurantType} type={restaurantType} />
    {#each menu as entry}
      <RestaurantTag label={entry} type="food" />
    {/each}
  </div>
  <div class="restaurant-address">
    <span>{address.street}</span>
    <span>{address.zip} {address.city}</span>
  </div>
  {#if website}
  <a class="restaurant-link" href={website} target="_blank">{website}</a>
  {/if}
</div>

<style lang="scss">
  .restaurant-card {
    margin: 20px 20px;

    img {
      height: 200px;
    }
  }

  .restaurant-tags {
    margin: 4px 0;
    display: flex;
    justify-content: center;
    column-gap: 2px;
  }

  .restaurant-address {
    display: grid;
    padding: 8px;
    grid-template-rows: 1fr 1fr;
    row-gap: 4px;
  }

  .restaurant-link {
    font-size: 14px;
  }
</style>
