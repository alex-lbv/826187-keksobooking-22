export const filterForm = document.querySelector('.map__filters');
export const filterHousingType = filterForm.querySelector('#housing-type');
export const filterHousingRooms = filterForm.querySelector('#housing-rooms');
export const filterHousingGuests = filterForm.querySelector('#housing-guests');
export const filterHousingPrice = filterForm.querySelector('#housing-price');
export const filterHousingFeatures = filterForm.querySelector('#housing-features');
const featuresList = document.querySelector('.map__features');

export const FilterType = {
  TYPE: 'housing-type',
  PRICE: 'housing-price',
  ROOMS: 'housing-rooms',
  GUESTS: 'housing-guests',
  FEATURES: 'features',
};

export const filter = {
  [FilterType.TYPE]: '',
  [FilterType.PRICE]: '',
  [FilterType.ROOMS]: '',
  [FilterType.GUESTS]: '',
  [FilterType.FEATURES]: [],
};

const ValueTypeToFilter = {
  [FilterType.TYPE]: 'any',
  [FilterType.PRICE]: 'any',
  [FilterType.ROOMS]: 'any',
  [FilterType.GUESTS]: 'any',
};

const HousingPrice = {
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high',
};

const PriceTypeToRange = {
  [HousingPrice.LOW]: 10000,
  [HousingPrice.MIDDLE]: 50000,
};

const filterType = (offer) => {
  return (!filter[FilterType.TYPE]
    || filter[FilterType.TYPE] === ValueTypeToFilter[FilterType.TYPE]) ? true
    : offer.type === filter[FilterType.TYPE];
};

const filterPrice = (offer) => {
  if (!filter[FilterType.PRICE]
    || filter[FilterType.PRICE] === ValueTypeToFilter[FilterType.PRICE]) {
    return true;
  } else if (filter[FilterType.PRICE] === HousingPrice.LOW
    && offer.price < PriceTypeToRange[HousingPrice.LOW]) {
    return true;
  } else if (filter[FilterType.PRICE] === HousingPrice.MIDDLE
    && offer.price >= PriceTypeToRange[HousingPrice.LOW]
    && offer.price <= PriceTypeToRange[HousingPrice.MIDDLE]) {
    return true;
  } else if (filter[FilterType.PRICE] === HousingPrice.HIGH
    && offer.price > PriceTypeToRange[HousingPrice.MIDDLE]) {
    return true;
  }
  return false;
};

const filterRooms = (offer) => {
  return (!filter[FilterType.ROOMS]
    || filter[FilterType.ROOMS] === ValueTypeToFilter[FilterType.ROOMS]) ? true
    : offer.rooms === +filter[FilterType.ROOMS];
};

const filterGuests = (offer) => {
  return (!filter[FilterType.GUESTS]
    || filter[FilterType.GUESTS] === ValueTypeToFilter[FilterType.GUESTS]) ? true
    : offer.guests === +filter[FilterType.GUESTS];
};

const filterFeatures = (offer) => {
  const checkedList = featuresList.querySelectorAll('input[type=checkbox]:checked');
  return Array.from(checkedList).every((feature) => offer.features.includes(feature.value));
};

export const getFilteredList = (list, maxSize) => {
  const newList = [];
  let item;
  for (let i = 0; i < list.length; i++) {
    item = list[i];
    if (filterType(item.offer)
      && filterPrice(item.offer)
      && filterRooms(item.offer)
      && filterGuests(item.offer)
      && filterFeatures(item.offer)) {
      newList.push(item);
    }

    if (newList.length === maxSize) {
      break;
    }
  }
  return newList;
};
