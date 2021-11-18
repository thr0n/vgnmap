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

  var baselayers = {
    dark: L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    ),
    light: L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
    ),
  };

  let map = null;

  afterUpdate(() => {
    console.log("updated");
    map.setView(centerCoordinates, detailZoom ? zoom + 2 : zoom);
    if (theme === "dark") {
      map.removeLayer(baselayers.light);
      map.addLayer(baselayers.dark);
    } else {
      map.removeLayer(baselayers.dark);
      map.addLayer(baselayers.light);
    }
  });

  onMount(() => {
    map = L.map("mapid").setView([53.58, 9.99], zoom);
    restaurants.map((r) => {
      let marker = L.marker(r.position)
        .addTo(map)
        .on("click", () => {
          document.getElementById(r.name).scrollIntoView();
          onMarkerClick(r);
        });
    });

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }
    ).addTo(map);

    L.control.scale({ imperial: false, metric: true }).addTo(map);
  });
</script>

<div id="mapid" />

<style langs="scss">
  #mapid {
    min-height: 100%;
  }
</style>
