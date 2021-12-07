<script lang="ts">
  import type { IRestaurant, RestaurantPosition } from "../types/Restaurant";
  import { onMount, afterUpdate } from "svelte";
  import L from "leaflet";

  export let restaurants: IRestaurant[];
  export let centerCoordinates: RestaurantPosition;
  export let zoom: number;
  export let onMarkerClick;
  export let detailZoom;
  export let theme;

  let map = null;

  const setTileLayer = () => {
    L.tileLayer(
      theme === "dark"
        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }
    ).addTo(map);
  };

  afterUpdate(() => {
    map.setView(centerCoordinates, detailZoom ? zoom + 2 : zoom);
    setTileLayer();
  });

  onMount(() => {
    map = L.map("mapid").setView([53.58, 9.99], zoom);
    restaurants.map((r) => {
      let marker = L.marker(r.position)
        .addTo(map)
        .on("click", () => {
          document.getElementById(r.name).scrollIntoView();
          onMarkerClick(r.position);
        });
    });
    setTileLayer();
    L.control.scale({ imperial: false, metric: true }).addTo(map);
  });
</script>

<div id="mapid" />

<style lang="scss">
  #mapid {
    min-height: 100%;
  }
</style>
