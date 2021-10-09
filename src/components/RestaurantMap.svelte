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

  const accessToken = process.env.API_KEY;

  let mymap = null;

  const bindPopup = (marker, createFn) => {
    let popupComponent;
    marker.bindPopup(() => {
      let container = L.DomUtil.create("div");
      popupComponent = createFn(container);
      return container;
    });
  };

  afterUpdate(() =>
    mymap.setView(centerCoordinates, $detailZoom ? zoom + 2 : zoom)
  );

  onMount(() => {
    mymap = L.map("mapid").setView([53.58, 9.99], zoom);
    restaurants.map((r) => {
      let marker = L.marker(r.position).addTo(mymap);
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
    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken,
      }
    ).addTo(mymap);
  });
</script>

<div id="mapid" />

<style>
  #mapid {
    min-height: 100vh;
  }
</style>
