import {
  activeStatePage,
  formAddress,
  formOffer,
  resetButton,
  resetInputImages
} from './form.js';
import {fetchData, setUserFormSubmit} from './data.js';
import {renderOffer} from './render-offer.js';
import {showMessage, showModal, modalSuccessTemplate} from './modal.js';
import {
  filterHousingType,
  filterHousingRooms,
  filterHousingGuests,
  filterHousingPrice,
  filterFeatures,
  filter,
  getFilteredList
} from './filter.js';
import {moveElementToEnd} from './util.js';

const MAX_POINTS = 10
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

const DefaultCoord = {
  lat: COORD_TOKYO.lat.toFixed(FRACTION_DIGITS_AT_COORDS),
  lng: COORD_TOKYO.lng.toFixed(FRACTION_DIGITS_AT_COORDS),
};
/* global L */
let map;
let marker;
let mainPinMarker;

const mapInit = () => {
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
};

mapInit();

const mainPinIcon = L.icon({
  iconUrl: MAIN_PIN_ICON_IMAGE,
  iconSize: MAIN_PIN_ICON_SIZE,
  iconAnchor: MAIN_PIN_ICON_ANCHOR,
});

const renderMainPinMarker = () => {
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

renderMainPinMarker();

const renderPoints = (array) => {
  array.forEach((point) => {
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
      .addTo(map)
      .bindPopup(
        renderOffer(point),
        {
          keepInView: true,
        },
      );
  });
};

const reinitializationMap = (list) => {
  map.remove();
  mapInit();
  renderMainPinMarker();
  renderPoints(list);
};

const processData = async () => {
  let data = [];

  try {
    data = await fetchData();
  } catch (err) {
    showMessage('При загрузке данных с сервера произошла ошибка запроса');
  }

  let similarOffers = data;

  const inputEventListener = (evt) => {
    filter[evt.target.name] = evt.target.value;
    similarOffers = getFilteredList(data);
    reinitializationMap(similarOffers.slice(0, MAX_POINTS));
  };

  filterHousingType.addEventListener('change', inputEventListener);
  filterHousingRooms.addEventListener('change', inputEventListener);
  filterHousingGuests.addEventListener('change', inputEventListener)
  filterHousingPrice.addEventListener('change', inputEventListener)

  filterFeatures.forEach((el) => {
    el.addEventListener('change', (evt) => {
      (evt.target.checked) ? filter['features'].push(evt.target.value)
        : moveElementToEnd(filter['features']).pop();
      similarOffers = getFilteredList(data);
      reinitializationMap(similarOffers.slice(0, MAX_POINTS));
    });
  })

  renderPoints(similarOffers.slice(0, MAX_POINTS));
};

processData();

const defaultMarkerState = () => {
  formAddress.value = `${DefaultCoord.lat}, ${DefaultCoord.lng}`;
  mainPinMarker.remove();
  renderMainPinMarker();
};

const defaultFormState = () => {
  formOffer.reset();
  resetInputImages();
  defaultMarkerState();
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  defaultFormState();
})

const onSuccess = () => {
  showModal(modalSuccessTemplate);
  defaultFormState();
};

setUserFormSubmit(formOffer, onSuccess);
