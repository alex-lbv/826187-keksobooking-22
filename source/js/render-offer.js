import {offerTypes} from './data.js';
import {makeElement, changeEndOfWords} from './util.js';

const similarOfferTemplate = document.querySelector('#card').content.querySelector('.popup');

export const renderOffer = (point) => {
  const {author, offer} = point;
  const offerElement = similarOfferTemplate.cloneNode(true);

  const offerTitleElement = offerElement.querySelector('.popup__title');
  (offer.title) ? offerTitleElement.textContent = offer.title : offerTitleElement.remove();

  const offerAddressElement = offerElement.querySelector('.popup__text--address');
  (offer.address) ? offerAddressElement.textContent = offer.address : offerAddressElement.remove();

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
  (offer.description) ? offerDescriptionElement.textContent = offer.description
    : offerDescriptionElement.remove();

  const offerAvatarElement = offerElement.querySelector('.popup__avatar');
  (author.avatar) ? offerAvatarElement.src = author.avatar : offerAvatarElement.remove();

  const photoListElement = offerElement.querySelector('.popup__photos');
  if (offer.photos.length) {
    photoListElement.innerHTML = '';

    for (let i = 0; i <= offer.photos.length - 1; i++) {
      const photo = makeElement('img', 'popup__photo', false, offer.photos[i]);
      photo.width = 45;
      photo.height = 40;
      photo.alt = 'Фотография жилья';
      photoListElement.appendChild(photo);
    }
  } else {
    photoListElement.remove();
  }

  const featuresListElement = offerElement.querySelector('.popup__features');
  if (offer.features.length) {
    featuresListElement.innerHTML = '';

    for (let i = 0; i <= offer.features.length - 1; i++) {
      const feature = makeElement('li', 'popup__feature', `popup__feature--${offer.features[i]}`);
      featuresListElement.appendChild(feature);
    }
  } else {
    featuresListElement.remove();
  }

  return offerElement;
};
