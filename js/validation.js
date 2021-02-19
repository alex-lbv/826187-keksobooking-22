export const validationInputCapacity = (firstElement, secondElement) => {
  if (firstElement.value === '1' && firstElement.value !== secondElement.value) {
    secondElement.setCustomValidity('1 комната только «для 1 гостя»');
  } else if (firstElement.value === '2' && secondElement.value !== '2' && secondElement.value !== '1') {
    secondElement.setCustomValidity('2 комнаты только «для 2 гостей» или «для 1 гостя»');
  } else if (firstElement.value === '3' && secondElement.value !== '3' && secondElement.value !== '2' && secondElement.value !== '1') {
    secondElement.setCustomValidity('3 комнаты только «для 3 гостей», «для 2 гостей» или «для 1 гостя»');
  } else if (firstElement.value === '100' && secondElement.value !== '0') {
    secondElement.setCustomValidity('100 комнат — «не для гостей»');
  } else {
    secondElement.setCustomValidity('');
  }

  secondElement.reportValidity();
};

