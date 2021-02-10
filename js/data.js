import {getRandomArrayElement, getRandomFloatNumber, getRandomLengthArray, getRandomNumber} from './util.js';

const MIN_ROOMS = 1;
const MAX_ROOMS = 7;
const MIN_GUESTS = 1;
const MAX_GUESTS = 10;
const MIN_PRICE = 100000;
const MAX_PRICE = 1000000;
const MIN_USER_COUNT = 1;
const MAX_USER_COUNT = 8;
const SIMILAR_OFFER_COUNT = 10;
const MIN_LOCATION_X = 35.65000;
const MAX_LOCATION_X = 35.70000;
const MIN_LOCATION_Y = 139.70000;
const MAX_LOCATION_Y = 139.80000;
const COUNT_DIGITS_AFTER_POINT = 5;

const TIMES = [
  '12:00',
  '13:00',
  '14:00',
];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const PHOTO_LINKS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];
const DESCRIPTION = 'Описание помещения';
const OfferType = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
};

const createOffer = () => {
  const location = {
    x: getRandomFloatNumber(MIN_LOCATION_X, MAX_LOCATION_X, COUNT_DIGITS_AFTER_POINT),
    y: getRandomFloatNumber(MIN_LOCATION_Y, MAX_LOCATION_Y, COUNT_DIGITS_AFTER_POINT),
  };
  const type = getRandomArrayElement(Object.keys(OfferType));

  return {
    author: {
      avatar: `img/avatars/user0${getRandomNumber(MIN_USER_COUNT, MAX_USER_COUNT)}.png`,
    },
    offer: {
      title: Object.values(OfferType[type]).join(''),
      address: `${location.x}, ${location.y}`,
      price: getRandomNumber(MIN_PRICE, MAX_PRICE),
      type: type,
      rooms: getRandomNumber(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomNumber(MIN_GUESTS, MAX_GUESTS),
      checkin: getRandomArrayElement(TIMES),
      checkout: getRandomArrayElement(TIMES),
      features: getRandomLengthArray(FEATURES),
      description: DESCRIPTION,
      photos: getRandomLengthArray(PHOTO_LINKS),
    },
    location: {
      x: location.x,
      y: location.y,
    },
  }
};

export const similarOffers = new Array(SIMILAR_OFFER_COUNT).fill(null).map(createOffer);
