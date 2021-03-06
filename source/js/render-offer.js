import {OfferType} from './data.js';
import {makeElement, changeEndOfWords} from './util.js';

const similarOfferTemplate = document.querySelector('#card').content.querySelector('.popup');

export const renderOffer = (point) => {
  const {author, offer} = point;
  const offerElement = similarOfferTemplate.cloneNode(true);

  const offerTitle = offerElement.querySelector('.popup__title');
  (offer.title) ? offerTitle.textContent = offer.title : offerTitle.remove();

  const offerAddress = offerElement.querySelector('.popup__text--address');
  (offer.address) ? offerAddress.textContent = offer.address : offerAddress.remove();

  const offerPrice = offerElement.querySelector('.popup__text--price');
  (offer.price) ? offerPrice.textContent = `${offer.price} ₽/ночь` : offerPrice.remove();

  const offerType = offerElement.querySelector('.popup__type');
  (offer.type.length) ? offerType.textContent = Object.values(OfferType[offer.type]).join('')
    : offerType.remove();

  const offerRoomsAndGuests = offerElement.querySelector('.popup__text--capacity');
  if (offer.rooms && offer.guests) {
    offerRoomsAndGuests.textContent =
      `${offer.rooms} ${changeEndOfWords(offer.rooms, ['комната', 'комнаты', 'комнат'])}
    для ${offer.guests} ${changeEndOfWords(offer.guests, ['гостя', 'гостей', 'гостей'])}`;
  } else {
    offerRoomsAndGuests.remove();
  }

  const offerTime = offerElement.querySelector('.popup__text--time');
  (offer.checkin.length && offer.checkout.length) ? offerTime.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`
    : offerTime.remove();

  const offerDescription = offerElement.querySelector('.popup__description');
  (offer.description) ? offerDescription.textContent = offer.description
    : offerDescription.remove();

  const offerAvatar = offerElement.querySelector('.popup__avatar');
  (author.avatar) ? offerAvatar.src = author.avatar : offerAvatar.remove();

  const photoList = offerElement.querySelector('.popup__photos');
  if (offer.photos.length) {
    photoList.innerHTML = '';

    for (let i = 0; i <= offer.photos.length - 1; i++) {
      const photo = makeElement('img', 'popup__photo', false, offer.photos[i]);
      photo.width = 45;
      photo.height = 40;
      photo.alt = 'Фотография жилья';
      photoList.appendChild(photo);
    }
  } else {
    photoList.remove();
  }

  const featuresList = offerElement.querySelector('.popup__features');
  if (offer.features.length) {
    featuresList.innerHTML = '';

    for (let i = 0; i <= offer.features.length - 1; i++) {
      const feature = makeElement('li', 'popup__feature', `popup__feature--${offer.features[i]}`);
      featuresList.appendChild(feature);
    }
  } else {
    featuresList.remove();
  }

  return offerElement;
};
