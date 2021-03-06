import {isEscEvent} from './util.js';

const MESSAGE_SHOW_TIME = 5000;

const mainDocument = document.querySelector('main');
export const modalSuccessTemplate = document.querySelector('#success')
  .content.querySelector('.success');
export const modalErrorTemplate = document.querySelector('#error')
  .content.querySelector('.error');

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

export const showModal = (template) => {
  const modal = template.cloneNode(true);
  mainDocument.append(modal);
  document.addEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('click', onPopupClick);
};

const closeModal = (modal) => {
  modal.remove();
  document.removeEventListener('keydown', onPopupEscKeydown);
  document.removeEventListener('click', onPopupClick);
};

const checkPopup = () => {
  const modalError = document.querySelector('.error');
  const modalSuccess = document.querySelector('.success');
  modalSuccess ? closeModal(modalSuccess) : closeModal(modalError);
};

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    checkPopup()
  }
};

const onPopupClick = () => {
  checkPopup();
};
