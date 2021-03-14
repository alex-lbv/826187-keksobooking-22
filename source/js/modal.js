import {isEscEvent} from './util.js';

const MESSAGE_SHOW_TIME = 5000;

const mainDocument = document.querySelector('main');
export const modalSuccessTemplate = document.querySelector('#success')
  .content.querySelector('.success');
export const modalErrorTemplate = document.querySelector('#error')
  .content.querySelector('.error');

const styleOfMessage = {
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  zIndex: '1000',
  padding: '10px 3px',
  fontSize: '30px',
  textAlign: 'center',
  backgroundColor: 'red',
  color: 'white',
};

export const showMessage = (message) => {
  const messageContainer = document.createElement('div');

  for (let styleMessageName in styleOfMessage) {
    messageContainer.style[styleMessageName] = styleOfMessage[styleMessageName];
  }

  messageContainer.textContent = message;

  document.body.append(messageContainer);

  setTimeout(() => {
    messageContainer.remove();
  }, MESSAGE_SHOW_TIME);
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
