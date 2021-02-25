import {showMessage} from './modal.js';

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
        (response.ok) ? showMessage('Данные успешно отправлены') : showMessage('Ошибка. Попробуйте ещё раз');
      })
      .catch(() => showMessage('Ошибка. Попробуйте ещё раз'));
  })
};
