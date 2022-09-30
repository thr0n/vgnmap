<script lang="ts">
  import * as L from 'leaflet';
  // If you're playing with this in the Svelte REPL, import the CSS using the
  // syntax in svelte:head instead. For normal development, this is better.
  import 'leaflet/dist/leaflet.css';
  import { afterUpdate } from 'svelte';
  import type { IRestaurant, RestaurantPosition } from '../types/Restaurant';

  export let restaurants: IRestaurant[];
  export let onMarkerClick: (r: IRestaurant) => void;
  export let coordinates: RestaurantPosition;

  let map;
  let markers = new Array();

  afterUpdate(() => {
    if (coordinates != null) {
      map.setView(coordinates, 17);
      const selectedMarker = markers.find((marker) => {
        return marker._latlng.lat === coordinates[0] && marker._latlng.lng === coordinates[1]
      })
      selectedMarker && selectedMarker.openPopup()
    } else {
      map.setView([53.58, 9.99], 12);
      map.closePopup();
    }
  });

  const createMap = (container) => {
    let m = L.map(container).setView([53.58, 9.99], 12);
    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      {
        attribution: `&copy;<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>,
            &copy;<a href="https://carto.com/attributions" target="_blank">CARTO</a>`,
        subdomains: 'abcd',
        maxZoom: 14
      }
    ).addTo(m);

    restaurants.map((r) => {
      let marker = L.marker(r.position)
        .bindPopup('<p>' + r.name + '</p>')
        .addTo(m)
        .on('click', () => {
          onMarkerClick(r);
        });
      markers.push(marker)
    });

    return m;
  };

  const mapAction = (container) => {
    map = createMap(container);
    return {
      destroy: () => {
        map.remove();
      }
    };
  };
</script>

<div style="height:100%;z-index:0;" use:mapAction />
