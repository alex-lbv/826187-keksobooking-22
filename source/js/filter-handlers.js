import throttle from 'lodash/throttle.js';
import {
  filter,
  FilterType,
  filterHousingFeatures,
  filterHousingGuests,
  filterHousingPrice,
  filterHousingRooms,
  filterHousingType,
  getFilteredList
} from './filter.js';
import {renderPoints} from './map.js';

const RENDER_DELAY = 500;
const MAX_POINTS = 10;

const renderOffers = (data) => {
  const similarOffers = getFilteredList(data);
  renderPoints(similarOffers.slice(0, MAX_POINTS));
};

const inputEventListener = (data, evt) => {
  filter[evt.target.name] = evt.target.value;
  renderOffers(data);
};

const featuresInputEventListener = (data, evt) => {
  if (evt.target.checked) {
    if (!filter[FilterType.FEATURES].includes(evt.target.value)) {
      filter[FilterType.FEATURES].push(evt.target.value);
    }
  } else {
    const index = filter[FilterType.FEATURES].findIndex((element) => element === evt.target.value);
    if (index !== -1) {
      filter[FilterType.FEATURES].splice(index, 1);
    }
  }

  renderOffers(data);
};

export const addFilterListeners = (data) => {
  filterHousingType.addEventListener('change', throttle(inputEventListener
    .bind(null, data), RENDER_DELAY));
  filterHousingRooms.addEventListener('change', throttle(inputEventListener
    .bind(null, data), RENDER_DELAY));
  filterHousingGuests.addEventListener('change', throttle(inputEventListener
    .bind(null, data), RENDER_DELAY));
  filterHousingPrice.addEventListener('change', throttle(inputEventListener
    .bind(null, data), RENDER_DELAY));
  filterHousingFeatures.addEventListener('change', throttle(featuresInputEventListener
    .bind(null, data), RENDER_DELAY));

  renderOffers(data.slice(0, MAX_POINTS));
};
