export const filterForm = document.querySelector('.map__filters');
export const filterHousingType = filterForm.querySelector('#housing-type');
export const filterHousingRooms = filterForm.querySelector('#housing-rooms');
export const filterHousingGuests = filterForm.querySelector('#housing-guests');
export const filterHousingPrice = filterForm.querySelector('#housing-price');
export const filterHousingFeatures = filterForm.querySelector('#housing-features');

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

export const getFilteredList = (list) => {
  return list
    .filter(({offer}) => {
      return (!filter[FilterType.TYPE] || filter[FilterType.TYPE] === ValueTypeToFilter[FilterType.TYPE]) ? true
        : offer.type === filter[FilterType.TYPE];
    })
    .filter(({offer}) => {
      if (!filter[FilterType.PRICE] || filter[FilterType.PRICE] === ValueTypeToFilter[FilterType.PRICE]) {
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
    })
    .filter(({offer}) => {
      return (!filter[FilterType.ROOMS] || filter[FilterType.ROOMS] === ValueTypeToFilter[FilterType.ROOMS]) ? true
        : offer.rooms === +filter[FilterType.ROOMS];
    })
    .filter(({offer}) => {
      return (!filter[FilterType.GUESTS] || filter[FilterType.GUESTS] === ValueTypeToFilter[FilterType.GUESTS]) ? true
        : offer.guests === +filter[FilterType.GUESTS];
    })
    .filter(({offer}) => {
      return (!filter[FilterType.FEATURES] || !filter[FilterType.FEATURES].length) ? true
        : filter[FilterType.FEATURES].every((feature) => offer.features.includes(feature));
    })
};
