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

  var burgerIcon = L.icon({
    iconUrl:
      'https://img.icons8.com/external-smashingstocks-glyph-smashing-stocks/132/external-burger-food-smashingstocks-glyph-smashing-stocks.png',
    iconSize: [22, 22], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

  const deriveMapCenter = (restaurants: IRestaurant[]) => {
    if (restaurants.length > 1) {
      const index = Math.floor(restaurants.length / 2);
      return restaurants[index];
    }
    return restaurants[0];
  };

  afterUpdate(() => {
    restaurants.map((r) => {
      console.log("Adde " + r.name)
      let marker = L.marker(r.position, { icon: burgerIcon })
        .addTo(map)
        .on('click', () => {
          onMarkerClick(r);
        });
      markers.push(marker);
    });

    if (restaurants.length === 1) {
      map.setView(restaurants[0].position, 16);
    } else if (coordinates != null) {
      map.setView(coordinates, 16);
      const selectedMarker = markers.find((marker) => {
        return (
          marker._latlng.lat === coordinates[0] &&
          marker._latlng.lng === coordinates[1]
        );
      });
      //selectedMarker && selectedMarker.openPopup();
    } else {
      console.log(restaurants);
      const centralRestaurant = deriveMapCenter(restaurants);
      map.setView(centralRestaurant.position, 12);

      //map.closePopup();
    }
  });

  const createMap = (container) => {
    let m = L.map(container, { zoomControl: false }).setView([53.58, 9.99], 12);
    L.tileLayer(
      'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
      {
        maxZoom: 16,
        minZoom: 12,
        attribution:
          '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>'
      }
    ).addTo(m);

    L.control
      .zoom({
        position: 'topright'
      })
      .addTo(m);

    restaurants.map((r) => {
      let marker = L.marker(r.position, { icon: burgerIcon })
        //.bindPopup('<p>' + r.name + '</p>')
        .addTo(m)
        .on('click', () => {
          onMarkerClick(r);
        });
      markers.push(marker);
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
