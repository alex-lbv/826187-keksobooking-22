import {modalErrorTemplate, modalSuccessTemplate, showModal} from './modal.js';
import {formAddress, formOffer, resetButton} from './form.js';
import {resetInputImages} from './upload-photo.js';
import {renderMainPinMarker, removeMainMarker, DefaultCoords, renderPoints} from './map.js';
import {filterForm} from './filter.js';

const URL_GET_DATA = 'https://22.javascript.pages.academy/keksobooking/data';
const URL_POST_DATA = 'https://22.javascript.pages.academy/keksobooking';

export const offerTypes = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
};

export const fetchData = async () => {
  return fetch(URL_GET_DATA)
    .then((response) => response.json());
};

const onSuccess = (data) => {
  showModal(modalSuccessTemplate);
  defaultFormState();
  defaultFilterFormState(data);
};

const defaultMarkerState = () => {
  formAddress.value = `${DefaultCoords.lat}, ${DefaultCoords.lng}`;
  removeMainMarker();
  renderMainPinMarker();
};

const defaultFormState = () => {
  formOffer.reset();
  resetInputImages();
  defaultMarkerState();
};

const defaultFilterFormState = (data) => {
  filterForm.reset();
  renderPoints(data);
};

export const setUserFormSubmit = (form, data) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    fetch(
      URL_POST_DATA,
      {
        method: 'POST',
        body: formData,
      },
    )
      .then((response) => {
        (response.ok) ? onSuccess(data) : showModal(modalErrorTemplate);
      })
      .catch(() => showModal(modalErrorTemplate));
  })
};

export const addResetButtonListener = (data) => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    defaultFormState();
    defaultFilterFormState(data);
  })
};




