import './scss/app.scss';
import {leafletInit} from "./js/map-leaflet";
import {activateListeners} from "./js/listeners";

document.addEventListener('DOMContentLoaded', () => {
  const map = leafletInit();
  activateListeners(map);
})
