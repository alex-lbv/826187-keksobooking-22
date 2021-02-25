import {validationInputCapacity} from './validation.js';
import {showMessage} from './modal.js';

const MAX_COUNT_IMAGES = 3;
const DEFAULT_SRC_AVATAR = './img/avatars/default.png';

export const formOffer = document.querySelector('.ad-form');
const typeOffer = formOffer.querySelector('#type');
const priceOffer = formOffer.querySelector('#price');
const timeInOffer = formOffer.querySelector('#timein');
const timeOutOffer = formOffer.querySelector('#timeout');
export const formAddress = formOffer.querySelector('#address');
export const roomsNumber = formOffer.querySelector('#room_number');
export const roomsCapacity = formOffer.querySelector('#capacity');
export const resetButton = document.querySelector('.ad-form__reset');

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

inactiveStatePage();

const avatarDownload = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');

avatarDownload.addEventListener('change', (evt) => {
  if (evt.target.files.length > 0) {
    avatarPreview.src = URL.createObjectURL(evt.target.files[0]);
  }
})

const imagesDownloadContainer = document.querySelector('.ad-form__photo-container');
export const imagesDownload = document.querySelector('#images');
const imagesPreviewTemplate = document.querySelector('.ad-form__photo');

export const previewImages = (evt) => {
  const imagesCount = imagesDownloadContainer.children;
  imagesPreviewTemplate.style.display = 'none';

  for (let i = 0; i < evt.target.files.length; i++) {

    if (imagesCount.length > MAX_COUNT_IMAGES + 1) {
      showMessage(`Можно загрузить не больше ${MAX_COUNT_IMAGES} изображений`);
      break;
    }

    const imageContainer = imagesPreviewTemplate.cloneNode();
    const image = document.createElement('img');
    image.src = URL.createObjectURL(evt.target.files[i]);
    imageContainer.style.display = 'flex';
    imageContainer.style.alignItems = 'center';
    imageContainer.style.justifyContent = 'center';
    image.width = 70;
    image.height = 70;
    imageContainer.append(image);
    imagesDownloadContainer.append(imageContainer);
  }
};

imagesDownload.addEventListener('change', previewImages);

export const resetInputImages = () => {
  avatarPreview.src = DEFAULT_SRC_AVATAR;
  const images = document.querySelectorAll('.ad-form__photo img');
  for (let i = 0; i < images.length; i++) {
    images[i].parentElement.remove();
  }
  imagesPreviewTemplate.style.display = 'block';
};
