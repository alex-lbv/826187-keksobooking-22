const formOffer = document.querySelector('.ad-form');
const typeOffer = formOffer.querySelector('#type');
const priceOffer = formOffer.querySelector('#price');
const timeInOffer = formOffer.querySelector('#timein');
const timeOutOffer = formOffer.querySelector('#timeout');

const minPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
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

const mapFilters = document.querySelector('.map__filters');
const mapFiltersFields = mapFilters.querySelectorAll('label, input, select');
const formFields = formOffer.querySelectorAll('label, input, select, textarea, button');

const disabledField = (form, fields) => {
  form.classList.add('ad-form--disabled');
  fields.forEach((field) => {
    field.disabled = true;
  })
};

const enabledField = (form, fields) => {
  form.classList.remove('ad-form--disabled');
  fields.forEach((field) => {
    field.disabled = false;
  })
};

const inactiveStatePage = () => {
  disabledField(formOffer, formFields);
  disabledField(mapFilters, mapFiltersFields);
};

export const activeStatePage = () => {
  enabledField(formOffer, formFields);
  enabledField(mapFilters, mapFiltersFields);
};

inactiveStatePage();

export const formAddress = formOffer.querySelector('#address');
