import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  activeStatePage,
  formAddress
} from './form.js';
import {renderOffer} from './render-offer.js';

const SCALE_MAP = 10;
const MAIN_PIN_ICON_SIZE = [52, 52];
const MAIN_PIN_ICON_ANCHOR = [26, 52];
const MAIN_PIN_ICON_IMAGE = '../img/main-pin.svg';
const PIN_ICON_SIZE = [40, 40];
const PIN_ICON_ANCHOR = [20, 40];
const PIN_ICON_IMAGE = '../img/pin.svg';
const FRACTION_DIGITS_AT_COORDS = 5;
const COORD_TOKYO = {
  lat: 35.67860,
  lng: 139.75365,
};

export const DefaultCoord = {
  lat: COORD_TOKYO.lat.toFixed(FRACTION_DIGITS_AT_COORDS),
  lng: COORD_TOKYO.lng.toFixed(FRACTION_DIGITS_AT_COORDS),
};

let map;
let marker;
let mainPinMarker;
let layerGroup;

const mainPinIcon = L.icon({
  iconUrl: MAIN_PIN_ICON_IMAGE,
  iconSize: MAIN_PIN_ICON_SIZE,
  iconAnchor: MAIN_PIN_ICON_ANCHOR,
});

export const renderMainPinMarker = () => {
  mainPinMarker = L.marker(
    {
      lat: COORD_TOKYO.lat,
      lng: COORD_TOKYO.lng,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  ).addTo(map);

  mainPinMarker.on('moveend', (evt) => {
    formAddress.value =
      `${evt.target.getLatLng().lat.toFixed(FRACTION_DIGITS_AT_COORDS)}, ${evt.target.getLatLng().lng.toFixed(FRACTION_DIGITS_AT_COORDS)}`;
  });
};

export const renderPoints = (points) => {
  layerGroup.clearLayers();
  points.forEach((point) => {
    const {location} = point;

    const icon = L.icon({
      iconUrl: PIN_ICON_IMAGE,
      iconSize: PIN_ICON_SIZE,
      iconAnchor: PIN_ICON_ANCHOR,
    });

    marker = L.marker(
      {
        lat: location.lat,
        lng: location.lng,
      },
      {
        icon,
      },
    );

    marker
      .addTo(layerGroup)
      .bindPopup(
        renderOffer(point),
        {
          keepInView: true,
        },
      );
  });
};

export const removeMainMarker = () => {
  mainPinMarker.remove();
};

export const mapInit = () => {
  map = L.map('map-canvas')
    .on('load', () => {
      activeStatePage();
      formAddress.value = `${DefaultCoord.lat}, ${DefaultCoord.lng}`;
    })
    .setView({
      lat: DefaultCoord.lat,
      lng: DefaultCoord.lng,
    }, SCALE_MAP);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
  layerGroup = L.layerGroup().addTo(map);
  renderMainPinMarker();
};
