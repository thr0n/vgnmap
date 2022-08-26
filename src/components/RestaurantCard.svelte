<script lang="ts">
  import RestaurantLabel from './RestaurantLabel.svelte';

  export let name;
  export let city;
  export let street;
  export let zip;
  export let type;
  export let menu;
  export let website;
  export let onBack: () => void;
</script>

<div>
  <div class="restaurant-card-header">
    <h2>{name}</h2>
    <span on:click={onBack}> Back </span>
  </div>
  <p><RestaurantLabel {type} /> {JSON.stringify(menu)}</p>
  <div>{street}</div>
  <div>{zip} {city}</div>
  {#if website}
    <p>
      <a href={website}>{website}</a>
    </p>
  {/if}
</div>
