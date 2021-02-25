import {isEscEvent} from './util.js';

const MESSAGE_SHOW_TIME = 5000;

export const showMessage = (message) => {
  const messageContainer = document.createElement('div');
  messageContainer.style.position = 'fixed';
  messageContainer.style.top = '0';
  messageContainer.style.left = '0';
  messageContainer.style.right = '0';
  messageContainer.style.zIndex = '1000';
  messageContainer.style.padding = '10px 3px';
  messageContainer.style.fontSize = '30px';
  messageContainer.style.textAlign = 'center';
  messageContainer.style.backgroundColor = 'red';
  messageContainer.style.color = 'white';

  messageContainer.textContent = message;

  document.body.append(messageContainer);

  setTimeout(() => {
    messageContainer.remove();
  }, MESSAGE_SHOW_TIME)
};

const mainDocument = document.querySelector('main');
export const modalSuccessTemplate = document.querySelector('#success')
  .content.querySelector('.success');

export const showModal = (template) => {
  const modal = template.cloneNode(true);
  mainDocument.append(modal);
  document.addEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('click', onPopupClick);
};

const closeModal = (modalName) => {
  const modal = mainDocument.querySelector(modalName);
  modal.remove();
  document.removeEventListener('keydown', onPopupEscKeydown);
  document.removeEventListener('click', onPopupClick);
};

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeModal('.success');
  }
};

const onPopupClick = () => {
  closeModal('.success');
};
