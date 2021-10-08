<script lang="ts">
  export let restaurants: RestaurantProps[];

let mymap = null

  import { onMount, afterUpdate } from "svelte";
  import L from "leaflet";
  import AddressPopup from "./AddressPopup.svelte";
    import type { RestaurantProps } from "../types/Restaurant";

  const accessToken = process.env.API_KEY;

  function bindPopup(marker, createFn) {
    let popupComponent;
    marker.bindPopup(() => {
      let container = L.DomUtil.create("div");
      popupComponent = createFn(container);
      return container;
    });
  }

  afterUpdate(() => {
      restaurants.map((r) => {
      console.log("Working on: " + r.name);
      let marker = L.marker(r.position).addTo(mymap);
      bindPopup(marker, (container) => {
        let c = new AddressPopup({
          target: container,
          props: {
              name: r.name
          }
        });
        return c
      });
    });
  })

  onMount(() => {
    mymap = L.map("mapid").setView([53.58, 9.99], 12);
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

<div class="veg-map">
  <div id="mapid" />
</div>

<style>
  #mapid {
    height: 512px;
  }
</style>
