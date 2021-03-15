import {validateInputCapacity} from './validation.js';
import {imagesDownload, renderImages, resetInputImages} from './upload-photo.js';
import {modalErrorTemplate, modalSuccessTemplate, showModal} from './modal.js';
import {DefaultCoords, removeMainMarker, renderMainPinMarker, renderPoints} from './map.js';
import {filterForm} from './filter.js';
import {sendData} from './data.js';

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

const changePriceOfferHandler = () => {
  priceOffer.min = minPrice[typeOffer.value];
  priceOffer.placeholder = minPrice[typeOffer.value];
};

const changeTimeOutOfferHandler = () => {
  timeOutOffer.value = timeInOffer.value;
};

const changeTimeInOfferHandler = () => {
  timeInOffer.value = timeOutOffer.value;
};

const disableField = (form, fields) => {
  form.classList.add('ad-form--disabled');
  fields.forEach((field) => {
    field.disabled = true;
  })
};

const enableField = (form, fields) => {
  form.classList.remove('ad-form--disabled');
  fields.forEach((field) => {
    field.disabled = false;
  })
};

export const deactivateStatePage = () => {
  disableField(formOffer, formFields);
  disableField(mapFilters, mapFiltersFields);
};

export const activateStatePage = () => {
  enableField(formOffer, formFields);
  enableField(mapFilters, mapFiltersFields);
  imagesDownload.addEventListener('change', renderImages);
};

const onSuccess = (data) => {
  showModal(modalSuccessTemplate);
  setDefaultFormState();
  setDefaultFilterFormState(data);
};

const setDefaultMarkerState = () => {
  formAddress.value = `${DefaultCoords.lat}, ${DefaultCoords.lng}`;
  removeMainMarker();
  renderMainPinMarker();
};

const setDefaultFormState = () => {
  formOffer.reset();
  resetInputImages();
  setDefaultMarkerState();
};

const setDefaultFilterFormState = (data) => {
  filterForm.reset();
  renderPoints(data);
};

export const addFormInputsListeners = () => {
  roomsNumber.addEventListener('input', () => {
    validateInputCapacity(roomsNumber, roomsCapacity);
  });

  roomsCapacity.addEventListener('input', () => {
    validateInputCapacity(roomsNumber, roomsCapacity);
  });

  formOffer.addEventListener('change', () => {
    changePriceOfferHandler();
    changeTimeOutOfferHandler();
    changeTimeInOfferHandler();
    validateInputCapacity(roomsNumber, roomsCapacity);
  });

  typeOffer.addEventListener('input', changePriceOfferHandler);
  timeInOffer.addEventListener('input', changeTimeOutOfferHandler);
  timeOutOffer.addEventListener('input', changeTimeInOfferHandler);
};

export const addResetButtonListener = (data) => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    setDefaultFormState();
    setDefaultFilterFormState(data);
  })
};

export const setUserFormSubmit = (data) => {
  formOffer.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(data),
      () => showModal(modalErrorTemplate),
      new FormData(evt.target),
    );
  })
};
