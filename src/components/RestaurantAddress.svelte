<script lang="ts">
  import type { IAddress } from '../types/Restaurant.ts';

  export let address: IAddress;
  export let locations: IAddress[] | undefined;

  const headline = locations && locations.length > 0 ? 'Adressen' : 'Adresse';
</script>

<h3>{headline}:</h3>
<div>
  {#if locations && locations.length > 0}
    {#each locations as location}
      <div class="address-line">
        <div>{location.street}</div>
        <div>{location.zip} {location.city}</div>
      </div>
    {/each}
  {:else}
    <div>{address.street}</div>
    <div>{address.zip} {address.city}</div>
  {/if}
</div>

<style lang="scss">
  .address-line:not(:last-child) {
    margin-bottom: 12px;
  }
</style>
