const ErrorMessage = {
  1: '1 комната только «для 1 гостя»',
  2: '2 комнаты только «для 2 гостей» или «для 1 гостя»',
  3: '3 комнаты только «для 3 гостей», «для 2 гостей» или «для 1 гостя»',
  100: '100 комнат — «не для гостей»',
};

let result = '';

export const validateInputCapacity = (firstElement, secondElement) => {
  if ((+firstElement.value === 100 && +secondElement.value)
    || (+firstElement.value !== 100 && (!+secondElement.value || +secondElement.value > +firstElement.value))) {
    result = ErrorMessage[+firstElement.value]
  }

  secondElement.setCustomValidity(result);
  secondElement.reportValidity();
  result = '';
};
