'use strict';

const getRandomNumber = (min, max) => {
  if (min < 0 || max < 0) {
    throw new Error('Отрицательные значения запрещены');
  } else if (min > max) {
    throw new Error('Значение "до" меньшее, чем значение "от"');
  } else if (min === max) {
    return min;
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloatNumber = (min, max, digits = 1) => {
  if (min < 0 || max < 0) {
    throw new Error('Отрицательные значения запрещены');
  } else if (min > max) {
    throw new Error('Значение "до" меньшее, чем значение "от"');
  } else if (min === max) {
    return min;
  }

  const random = Math.random() * (max - min) + min;
  return random.toFixed(digits);
};

const getRandomArrayElement = (array) => {
  return array[getRandomNumber(0, array.length - 1)];
};

const getShuffledArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const getRandomLengthArray = (array) => {
  getShuffledArray(array.slice(0));

  let randomLengthArray = array.slice(getRandomNumber(0, array.length - 1));

  if (randomLengthArray.length === 0) {
    randomLengthArray = array.slice(getRandomNumber(0, array.length - 1));
  }

  return randomLengthArray;
};


const TYPE_AD = {
  'palace' : 'Дворец',
  'flat' : 'Квартира',
  'house' : 'Дом',
  'bungalow' : 'Бунгало',
};
const CHECKIN_AND_CHECKOUT_AD = [
  '12:00',
  '13:00',
  '14:00',
];
const FEATURES_AD = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const PHOTOS_AD = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];
const SIMILAR_ADS_COUNT = 10;

const createAd = () => {
  const location = {
    x : getRandomFloatNumber(35.65000, 35.70000, 5),
    y : getRandomFloatNumber(139.70000, 139.80000, 5),
  };
  const type = getRandomArrayElement(Object.keys(TYPE_AD));
  const MIN_ROOMS = 1;
  const MAX_ROOMS = 7;
  const MIN_GUESTS = 1;
  const MAX_GUESTS = 10;
  const MIN_PRICE = 100000;
  const MAX_PRICE = 1000000;
  const MIN_USER_COUNT = 1;
  const MAX_USER_COUNT = 8;

  return {
    author : {
      avatar : `img/avatars/user0${getRandomNumber(MIN_USER_COUNT,MAX_USER_COUNT)}.png`,
    },
    offer : {
      title : Object.values(TYPE_AD[type]).join(''),
      address : `${location.x}, ${location.y}`,
      price : getRandomNumber(MIN_PRICE, MAX_PRICE),
      type : type,
      rooms : getRandomNumber(MIN_ROOMS, MAX_ROOMS),
      guests : getRandomNumber(MIN_GUESTS, MAX_GUESTS),
      checkin : getRandomArrayElement(CHECKIN_AND_CHECKOUT_AD),
      checkout : getRandomArrayElement(CHECKIN_AND_CHECKOUT_AD),
      features : getRandomLengthArray(FEATURES_AD),
      description : 'Описание помещения',
      photos : getRandomLengthArray(PHOTOS_AD),
    },
    location : {
      x : location.x,
      y : location.y,
    },
  }
};

const similarAds = new Array(SIMILAR_ADS_COUNT).fill(null).map(() => createAd());
