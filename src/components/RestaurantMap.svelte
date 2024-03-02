<script lang="ts">
  import * as L from 'leaflet';
  // If you're playing with this in the Svelte REPL, import the CSS using the
  // syntax in svelte:head instead. For normal development, this is better.
  import 'leaflet/dist/leaflet.css';
  import { afterUpdate } from 'svelte';
  import type { IRestaurant } from '../types/Restaurant.ts';

  export let restaurants: IRestaurant[];
  export let onMarkerClick: (r: IRestaurant) => void;
  export let selected: IRestaurant | null = null;

  let src = './icons/active-marker.png';
  let map: L.Map;

  const markers_: any[] = [];
  let selectedMarkers: any[] = [];

  let burgerIcon = L.icon({
    iconUrl:
      'https://img.icons8.com/external-smashingstocks-glyph-smashing-stocks/132/external-burger-food-smashingstocks-glyph-smashing-stocks.png',
    iconSize: [22, 22], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

  let activeIcon = L.icon({
    iconUrl: src,
    iconSize: [34, 34], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [5, 5], // point of the icon which will correspond to marker's location
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

  const initializeMarkersOn = (map: L.Map) => {
    restaurants.map((r: IRestaurant) => {
      if (r.multipleAddresses) {
        r.locations.map((location) => {
          let marker = L.marker(location.position, {
            icon: burgerIcon,
            title: r.name
          })
            .addTo(map)
            .on('click', () => {
              onMarkerClick(r);
            });
          markers_.push({
            name: r.name,
            marker
          });
        });
      } else {
        let marker = L.marker(r.position, { icon: burgerIcon, title: r.name })
          .addTo(map)
          .on('click', () => {
            onMarkerClick(r);
          });

        markers_.push({
          name: r.name,
          marker
        });
      }
    });
  };

  const resetMarkers = () => {
    markers_.forEach((m) => {
      m.marker.remove(map);
      m.marker.addTo(map);
    });
    selectedMarkers.forEach((sm) => {
      sm.remove(map);
    });
    selectedMarkers = [];
  };

  afterUpdate(() => {
    initializeMarkersOn(map);
    resetMarkers();

    if (!selected) {
      map.setView(deriveMapCenter(restaurants).position, 12);
      return;
    }

    // TODO: refactor if/else content
    if (!selected.multipleAddresses) {
      const filtered = markers_.filter((m) => m.name === selected.name);
      filtered.forEach((m) => m.marker.remove(map));
      const selectedMarker = L.marker(selected.position, { icon: activeIcon });
      selectedMarker.addTo(map);
      selectedMarkers.push(selectedMarker);
      map.setView(selected.position, 16);
    } else {
      const filtered = markers_.filter((m) => {
        return m.name === selected.name;
      });
      filtered.forEach((m) => m.marker.remove(map));

      selected.locations.map((location) => {
        const selectedMarker = L.marker(location.position, {
          icon: activeIcon
        });
        selectedMarker.addTo(map);
        selectedMarkers.push(selectedMarker);
      });

      let group = L.featureGroup(selectedMarkers);
      map.fitBounds(group.getBounds());
    }
  });

  const createMap = (container) => {
    let map = L.map(container, { zoomControl: false }).setView(
      [53.58, 9.99],
      12
    );
    L.tileLayer(
      'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
      {
        maxZoom: 16,
        minZoom: 12,
        attribution:
          '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>'
      }
    ).addTo(map);

    L.control
      .zoom({
        position: 'topright'
      })
      .addTo(map);

    initializeMarkersOn(map);

    return map;
  };

  const mapAction = (container: any) => {
    map = createMap(container);
    return {
      destroy: () => {
        map.remove();
      }
    };
  };
</script>

<div style="height:100%;z-index:0;" use:mapAction />
