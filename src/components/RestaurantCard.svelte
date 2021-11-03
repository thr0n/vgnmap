<script lang="ts">
  import type { IAddress } from "../types/Restaurant";

  export let name: string;
  export let website: string = null;
  export let address: IAddress;
  export let restaurantType: string[];
</script>

<div class="restaurant-card" id={name}>
  <h2>
    {name} <span style={"font-size: 10px"}>{restaurantType}</span>
  </h2>
  <img src="https://via.placeholder.com/200" alt={`${name} restaurant image`} />
  <p>{address.street}, {address.zip} {address.city}</p>
  <a href={website} target="_blank">{website}</a>
</div>

<style lang="scss">
  .restaurant-card {
    margin: 20px 20px;
  }
</style>
