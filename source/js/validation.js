const ErrorMessage = {
  ONE_ROOM: '1 комната только «для 1 гостя»',
  TWO_ROOM: '2 комнаты только «для 2 гостей» или «для 1 гостя»',
  THREE_ROOM: '3 комнаты только «для 3 гостей», «для 2 гостей» или «для 1 гостя»',
  HUNDRED_ROOM: '100 комнат — «не для гостей»',
};

let result = '';

const checkForOneRoom = (firstElement, secondElement) => {
  if (firstElement.value === '1' && firstElement.value !== secondElement.value) {
    result = ErrorMessage.ONE_ROOM;
  }
};

const checkForTwoRooms = (firstElement, secondElement) => {
  if (firstElement.value === '2' && secondElement.value !== '2' && secondElement.value !== '1') {
    result = ErrorMessage.TWO_ROOM;
  }
};

const checkForThreeRooms = (firstElement, secondElement) => {
  if (firstElement.value === '3' && secondElement.value !== '3' && secondElement.value !== '2' && secondElement.value !== '1') {
    result = ErrorMessage.THREE_ROOM;
  }
};

const checkForHundredRooms = (firstElement, secondElement) => {
  if (firstElement.value === '100' && secondElement.value !== '0') {
    result = ErrorMessage.HUNDRED_ROOM;
  }
};

export const validateInputCapacity = (firstElement, secondElement) => {
  checkForOneRoom(firstElement, secondElement);
  checkForTwoRooms(firstElement, secondElement);
  checkForThreeRooms(firstElement, secondElement);
  checkForHundredRooms(firstElement, secondElement);
  secondElement.setCustomValidity(result);
  secondElement.reportValidity();
  result = '';
};
