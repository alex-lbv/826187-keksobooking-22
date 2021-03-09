import {validationInputCapacity} from './validation.js';
import {imagesDownload, previewImages} from './upload-photo.js';

export const formOffer = document.querySelector('.ad-form');
const typeOffer = formOffer.querySelector('#type');
const priceOffer = formOffer.querySelector('#price');
const timeInOffer = formOffer.querySelector('#timein');
const timeOutOffer = formOffer.querySelector('#timeout');
export const formAddress = formOffer.querySelector('#address');
const roomsNumber = formOffer.querySelector('#room_number');
const roomsCapacity = formOffer.querySelector('#capacity');
export const resetButton = document.querySelector('.ad-form__reset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersFields = mapFilters.querySelectorAll('label, input, select');
const formFields = formOffer.querySelectorAll('label, input, select, textarea, button');

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

export const inactiveStatePage = () => {
  disabledField(formOffer, formFields);
  disabledField(mapFilters, mapFiltersFields);
};

export const activeStatePage = () => {
  enabledField(formOffer, formFields);
  enabledField(mapFilters, mapFiltersFields);
  imagesDownload.addEventListener('change', previewImages);
};

roomsNumber.addEventListener('input', () => {
  validationInputCapacity(roomsNumber, roomsCapacity);
});

roomsCapacity.addEventListener('input', () => {
  validationInputCapacity(roomsNumber, roomsCapacity);
});

formOffer.addEventListener('change', () => {
  changePriceOffer();
  changeTimeOutOffer();
  changeTimeInOffer();
  validationInputCapacity(roomsNumber, roomsCapacity);
});

typeOffer.addEventListener('input', changePriceOffer);
timeInOffer.addEventListener('input', changeTimeOutOffer);
timeOutOffer.addEventListener('input', changeTimeInOffer);
