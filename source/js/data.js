import {modalErrorTemplate, modalSuccessTemplate, showModal} from './modal.js';
import {formAddress, formOffer, resetButton} from './form.js';
import {resetInputImages} from './upload-photo.js';
import {renderMainPinMarker, removeMainMarker, DefaultCoords} from './map.js';

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

const onSuccess = () => {
  showModal(modalSuccessTemplate);
  defaultFormState();
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

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  defaultFormState();
})

export const setUserFormSubmit = (form) => {
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
        (response.ok) ? onSuccess() : showModal(modalErrorTemplate);
      })
      .catch(() => showModal(modalErrorTemplate));
  })
};
