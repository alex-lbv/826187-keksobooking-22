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

const MIN_NUMBER = 100;
const MAX_NUMBER = 100;

alert(`случайное целое число от ${MIN_NUMBER} до ${MAX_NUMBER} 
включительно ${getRandomNumber(MIN_NUMBER, MAX_NUMBER)}`);

alert(`случайное число с плавающей точкой от ${MIN_NUMBER} до ${MAX_NUMBER} 
включительно ${getRandomFloatNumber(MIN_NUMBER, MAX_NUMBER)}`);
