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

const changeTimeOffer = (firstElement, secondElement) => {
  firstElement.value = secondElement.value;
};

typeOffer.addEventListener('input', changePriceOffer);
timeInOffer.addEventListener('input', () => {
  changeTimeOffer(timeOutOffer, timeInOffer);
});
timeOutOffer.addEventListener('input', () => {
  changeTimeOffer(timeInOffer, timeOutOffer);
});
