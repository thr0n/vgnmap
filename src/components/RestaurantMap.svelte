<script lang="ts">
  import type {
    RestaurantPosition,
    RestaurantProps,
  } from "../types/Restaurant";
  import { onMount, afterUpdate } from "svelte";
  import L from "leaflet";
  import AddressPopup from "./AddressPopup.svelte";
  import { detailZoom } from "../stores/selection";

  export let restaurants: RestaurantProps[];
  export let centerCoordinates: RestaurantPosition;
  export let zoom: number;

  let map = null;

  afterUpdate(() =>
    map.setView(centerCoordinates, $detailZoom ? zoom + 2 : zoom)
  );

  onMount(() => {
    map = L.map("mapid").setView([53.58, 9.99], zoom);

    restaurants.map((r) => {
      let marker = L.marker(r.position)
        .addTo(map)
        .on("click", () => {
          console.log("clicked " + r.name);
          document.getElementById(r.name).scrollIntoView();
        });
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
    }).addTo(map);

    L.control.scale({ imperial: false, metric: true }).addTo(map);
  });
</script>

<div id="mapid" />

<style langs="scss">
  #mapid {
    min-height: 100%;
  }
</style>
