const URL_GET_DATA = 'https://22.javascript.pages.academy/keksobooking/data';

export const OfferType = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
};

export const fetchData = async () => {
  return fetch(URL_GET_DATA)
    .then((response) => response.json());
};
