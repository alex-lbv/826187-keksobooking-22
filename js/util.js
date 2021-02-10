const getRandomNumber = (min, max) => {
  if (min < 0 || max < 0) {
    throw new Error('Отрицательные значения запрещены');
  } else if (min > max) {
    throw new Error('Значение "до" меньшее, чем значение "от"');
  } else if (min === max) {
    return min;
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloatNumber = (min, max, digits = 1) => {
  if (min < 0 || max < 0) {
    throw new Error('Отрицательные значения запрещены');
  } else if (min > max) {
    throw new Error('Значение "до" меньшее, чем значение "от"');
  } else if (min === max) {
    return min;
  }

  const random = Math.random() * (max - min) + min;
  return random.toFixed(digits);
};

const getRandomArrayElement = (array) => array[getRandomNumber(0, array.length - 1)];

const getShuffledArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const getRandomLengthArray = (array) => {
  getShuffledArray(array.slice(0));

  let randomLengthArray = array.slice(getRandomNumber(0, array.length - 1));

  if (randomLengthArray.length === 0) {
    randomLengthArray = array.slice(getRandomNumber(0, array.length - 1));
  }

  return randomLengthArray;
};

export {getRandomNumber,getRandomFloatNumber,getRandomArrayElement,getRandomLengthArray};
