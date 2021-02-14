const formOffer = document.querySelector('.ad-form');
const typeOffer = formOffer.querySelector('#type');
const priceOffer = formOffer.querySelector('#price');
const timeInOffer = formOffer.querySelector('#timein');
const timeOutOffer = formOffer.querySelector('#timeout');

const minPrice = {
  bungalow : 0,
  flat : 1000,
  house: 5000,
  palace : 10000,
};

const changePriceOffer = () => {
  priceOffer.min = minPrice[typeOffer.value];
  priceOffer.placeholder = minPrice[typeOffer.value];
};

const changeTimeOutOffer = () => {
  timeOutOffer.value = timeInOffer.value;
};

const changeTimeInOffer = () => {
  timeInOffer.value = timeOutOffer.value;
};

typeOffer.addEventListener('input', changePriceOffer);
timeInOffer.addEventListener('input', changeTimeOutOffer);
timeOutOffer.addEventListener('input', changeTimeInOffer);
