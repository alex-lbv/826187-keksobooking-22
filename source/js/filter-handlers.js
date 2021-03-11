import {
  filter,
  filterHousingFeatures,
  filterHousingGuests,
  filterHousingPrice,
  filterHousingRooms,
  filterHousingType,
  getFilteredList
} from './filter.js';
import {throttle} from './util.js';
import {renderPoints} from './map.js';

const RERENDER_DELAY = 500;
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
    if (!filter['features'].includes(evt.target.value)) {
      filter['features'].push(evt.target.value);
    }
  } else {
    const index = filter['features'].findIndex((element) => element === evt.target.value);
    if (index !== -1) {
      filter['features'].splice(index, 1);
    }
  }

  renderOffers(data);
};

export const addFilterListeners = (data) => {
  filterHousingType.addEventListener('change', throttle(inputEventListener
    .bind(null, data), RERENDER_DELAY));
  filterHousingRooms.addEventListener('change', throttle(inputEventListener
    .bind(null, data), RERENDER_DELAY));
  filterHousingGuests.addEventListener('change', throttle(inputEventListener
    .bind(null, data), RERENDER_DELAY));
  filterHousingPrice.addEventListener('change', throttle(inputEventListener
    .bind(null, data), RERENDER_DELAY));
  filterHousingFeatures.addEventListener('change', throttle(featuresInputEventListener
    .bind(null, data), RERENDER_DELAY));

  renderOffers(data.slice(0, MAX_POINTS));
};
