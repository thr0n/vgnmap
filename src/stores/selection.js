import { writable } from "svelte/store";

export const selectedStoreLatLon = writable(null);
export const detailZoom = writable(false);
export const selectedCity = writable("Hamburg");
