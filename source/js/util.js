export const makeElement = (tagName, className, modifier, source) => {
  const element = document.createElement(tagName);
  element.classList.add(className);

  if (modifier) {
    element.classList.add(modifier);
  }

  if (source) {
    element.src = source;
  }

  return element;
};

export const changeEndOfWords = (number, words) => {
  return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5]];
};

export const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};
