import {showMessage} from './modal.js';

const MAX_COUNT_IMAGES = 3;
const DEFAULT_SRC_AVATAR = './img/avatars/default.png';
const DefaultImageSize = {
  WIDTH: 40,
  HEIGHT: 44,
};

const avatarDownload = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
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
    image.width = DefaultImageSize.WIDTH;
    image.height = DefaultImageSize.HEIGHT;
    imageContainer.append(image);
    imagesDownloadContainer.append(imageContainer);
  }
};

export const resetInputImages = () => {
  avatarPreview.src = DEFAULT_SRC_AVATAR;
  const images = document.querySelectorAll('.ad-form__photo img');
  for (let i = 0; i < images.length; i++) {
    images[i].parentElement.remove();
  }
  imagesPreviewTemplate.style.display = 'block';
};

avatarDownload.addEventListener('change', (evt) => {
  if (evt.target.files.length > 0) {
    avatarPreview.src = URL.createObjectURL(evt.target.files[0]);
  }
});
imagesDownload.addEventListener('change', previewImages);
