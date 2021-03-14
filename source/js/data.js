const UrlData = {
  GET: 'https://22.javascript.pages.academy/keksobooking/data',
  POST: 'https://22.javascript.pages.academy/keksobooking',
};

export const offerTypes = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
};

export const fetchData = async () => {
  return fetch(UrlData.GET)
    .then((response) => response.json());
};

export const sendData = (onSuccess, onFail, body) => {
  fetch(
    UrlData.POST,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      (response.ok) ? onSuccess() : onFail();
    })
    .catch(() => onFail());
};

