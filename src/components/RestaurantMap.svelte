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

  const bindPopup = (marker, createFn) => {
    let popupComponent;
    marker.bindPopup(() => {
      let container = L.DomUtil.create("div");
      popupComponent = createFn(container);
      return container;
    });
  };

  afterUpdate(() =>
    map.setView(centerCoordinates, $detailZoom ? zoom + 2 : zoom)
  );

  onMount(() => {
    map = L.map("mapid").setView([53.58, 9.99], zoom);
    restaurants.map((r) => {
      let marker = L.marker(r.position).addTo(map);
      bindPopup(marker, (container) => {
        let c = new AddressPopup({
          target: container,
          props: {
            name: r.name,
          },
        });
        return c;
      });
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
      }).addTo(map);

      L.control.scale({imperial: false, metric: true}).addTo(map);
  });
</script>

<div id="mapid" />

<style langs="scss">
  #mapid {
    min-height: 100%;
  }
</style>
