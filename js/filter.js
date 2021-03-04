const filterForm = document.querySelector('.map__filters');
export const filterHousingType = filterForm.querySelector('#housing-type');
export const filterHousingRooms = filterForm.querySelector('#housing-rooms');
export const filterHousingGuests = filterForm.querySelector('#housing-guests');
export const filterHousingPrice = filterForm.querySelector('#housing-price');
const filterHousingFeatures = filterForm.querySelector('#housing-features');
export const filterFeatures = filterHousingFeatures.querySelectorAll('input');

export const filter = {
  'housing-type': '',
  'housing-price': '',
  'housing-rooms': '',
  'housing-guests': '',
  'features': [],
};

export const getFilteredList = (list) => {
  return list
    .filter(({offer}) => {
      return (!filter['housing-type'] || filter['housing-type'] === 'any') ? true
        : offer.type === filter['housing-type'];
    })
    .filter(({offer}) => {
      if (!filter['housing-price'] || filter['housing-price'] === 'any') {
        return true;
      } else if (filter['housing-price'] === 'low' && offer.price < 10000) {
        return true;
      } else if (filter['housing-price'] === 'middle' && offer.price >= 10000 && offer.price <= 50000) {
        return true;
      } else if (filter['housing-price'] === 'high' && offer.price > 50000) {
        return true;
      }
      return false;
    })
    .filter(({offer}) => {
      return (!filter['housing-rooms'] || filter['housing-rooms'] === 'any') ? true
        : offer.rooms === +filter['housing-rooms'];
    })
    .filter(({offer}) => {
      return (!filter['housing-guests'] || filter['housing-guests'] === 'any') ? true
        : offer.guests === +filter['housing-guests'];
    })
    .filter(({offer}) => {
      return (!filter['features'] || !filter['features'].length) ? true
        : filter['features'].every((feature) => offer.features.includes(feature));
    })
};
