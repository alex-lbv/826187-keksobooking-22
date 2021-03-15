import throttle from 'lodash/throttle.js';
import {
  filter,
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
  const similarOffers = getFilteredList(data, MAX_POINTS);
  renderPoints(similarOffers);
};

const getInputEventListener = (data, evt) => {
  filter[evt.target.name] = evt.target.value;
  renderOffers(data);
};

const getFeaturesInputEventListener = (data) => {
  renderOffers(data);
};

export const addFilterListeners = (data) => {
  filterHousingType.addEventListener('change', throttle(getInputEventListener
    .bind(null, data), RENDER_DELAY));
  filterHousingRooms.addEventListener('change', throttle(getInputEventListener
    .bind(null, data), RENDER_DELAY));
  filterHousingGuests.addEventListener('change', throttle(getInputEventListener
    .bind(null, data), RENDER_DELAY));
  filterHousingPrice.addEventListener('change', throttle(getInputEventListener
    .bind(null, data), RENDER_DELAY));
  filterHousingFeatures.addEventListener('change', throttle(getFeaturesInputEventListener
    .bind(null, data), RENDER_DELAY));

  renderOffers(data);
};
