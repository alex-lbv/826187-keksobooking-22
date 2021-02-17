import {activeStatePage, formAddress} from './form.js';
import {similarOffers} from './data.js';
import {renderOffer} from './render-offer.js';

const LATITUDE_TOKYO = 35.67860;
const LONGITUDE_TOKYO = 139.75365;
const SCALE_MAP = 13;
const MAIN_PIN_ICON_SIZE = [52, 52];
const MAIN_PIN_ICON_ANCHOR = [26, 52];
const MAIN_PIN_ICON_IMAGE = '../img/main-pin.svg';
const PIN_ICON_SIZE = [40, 40];
const PIN_ICON_ANCHOR = [20, 40];
const PIN_ICON_IMAGE = '../img/pin.svg';
const FRACTION_DIGITS_AT_COORDS = 5;

const DefaultCoord = {
  X: LATITUDE_TOKYO.toFixed(FRACTION_DIGITS_AT_COORDS),
  Y: LONGITUDE_TOKYO.toFixed(FRACTION_DIGITS_AT_COORDS),
};
/* global L */
const map = L.map('map-canvas')
  .on('load', () => {
    activeStatePage();
    formAddress.value = `${DefaultCoord.X}, ${DefaultCoord.Y}`;
  })
  .setView({
    lat: DefaultCoord.X,
    lng: DefaultCoord.Y,
  }, SCALE_MAP);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: MAIN_PIN_ICON_IMAGE,
  iconSize: MAIN_PIN_ICON_SIZE,
  iconAnchor: MAIN_PIN_ICON_ANCHOR,
});

const mainPinMarker = L.marker(
  {
    lat: LATITUDE_TOKYO,
    lng: LONGITUDE_TOKYO,
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

similarOffers.forEach((point) => {
  const {location} = point;

  const icon = L.icon({
    iconUrl: PIN_ICON_IMAGE,
    iconSize: PIN_ICON_SIZE,
    iconAnchor: PIN_ICON_ANCHOR,
  });

  const marker = L.marker(
    {
      lat: location.x,
      lng: location.y,
    },
    {
      icon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(
      renderOffer(point),
      {
        keepInView: true,
      },
    );
});
