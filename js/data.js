import {modalErrorTemplate, showModal} from './modal.js';

const URL_GET_DATA = 'https://22.javascript.pages.academy/keksobooking/data';
const URL_POST_DATA = 'https://22.javascript.pages.academy/keksobooking';

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

export const setUserFormSubmit = (form, onSuccess) => {
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
