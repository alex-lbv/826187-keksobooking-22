import {offerTypes} from './data.js';
import {makeElement, changeEndOfWords} from './util.js';

const PropertyPhoto = {
  WIDTH: 45,
  HEIGHT: 40,
  ALT: 'Фотография жилья',
};
const similarOfferTemplate = document.querySelector('#card').content.querySelector('.popup');

const createPhotoList = (list, photoElement) => {
  if (list.photos.length) {
    photoElement.innerHTML = '';

    list.photos.forEach((element) => {
      const photo = makeElement('img', 'popup__photo', false, element);
      photo.width = PropertyPhoto.WIDTH;
      photo.height = PropertyPhoto.HEIGHT;
      photo.alt = PropertyPhoto.ALT;
      photoElement.appendChild(photo);
    });
  } else {
    photoElement.remove();
  }
};

const createFeatureList = (list, featureElement) => {
  if (list.features.length) {
    featureElement.innerHTML = '';

    list.features.forEach((element) => {
      const feature = makeElement('li', 'popup__feature', `popup__feature--${element}`);
      featureElement.appendChild(feature);
    });
  } else {
    featureElement.remove();
  }
};

const checkElement = (list, listKey, nameElement, method = 'textContent') => {
  (list[listKey]) ? nameElement[method] = list[listKey] : nameElement.remove();
};

export const renderOffer = (point) => {
  const {author, offer} = point;
  const offerElement = similarOfferTemplate.cloneNode(true);

  const offerTitleElement = offerElement.querySelector('.popup__title');
  checkElement(offer, 'title', offerTitleElement);

  const offerAddressElement = offerElement.querySelector('.popup__text--address');
  checkElement(offer, 'address', offerAddressElement);

  const offerPriceElement = offerElement.querySelector('.popup__text--price');
  (offer.price) ? offerPriceElement.textContent = `${offer.price} ₽/ночь` : offerPriceElement.remove();

  const offerTypeElement = offerElement.querySelector('.popup__type');
  (offer.type.length) ? offerTypeElement.textContent = Object.values(offerTypes[offer.type]).join('')
    : offerTypeElement.remove();

  const offerRoomsAndGuestsElement = offerElement.querySelector('.popup__text--capacity');
  if (offer.rooms && offer.guests) {
    offerRoomsAndGuestsElement.textContent =
      `${offer.rooms} ${changeEndOfWords(offer.rooms, ['комната', 'комнаты', 'комнат'])}
    для ${offer.guests} ${changeEndOfWords(offer.guests, ['гостя', 'гостей', 'гостей'])}`;
  } else {
    offerRoomsAndGuestsElement.remove();
  }

  const offerTimeElement = offerElement.querySelector('.popup__text--time');
  (offer.checkin.length && offer.checkout.length) ? offerTimeElement.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`
    : offerTimeElement.remove();

  const offerDescriptionElement = offerElement.querySelector('.popup__description');
  checkElement(offer, 'description', offerDescriptionElement);

  const offerAvatarElement = offerElement.querySelector('.popup__avatar');
  checkElement(author, 'avatar', offerAvatarElement, 'src');

  const photoListElement = offerElement.querySelector('.popup__photos');
  createPhotoList(offer, photoListElement);

  const featuresListElement = offerElement.querySelector('.popup__features');
  createFeatureList(offer, featuresListElement);

  return offerElement;
};
