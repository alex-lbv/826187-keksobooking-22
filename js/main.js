const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloatNumber = (min, max, amount = 1) => {
  const random = Math.random() * (max - min) + min;
  return random.toFixed(amount);
};

const MIN_NUMBER = 0;
const MAX_NUMBER = 100;

alert(`случайное целое число от ${MIN_NUMBER} до ${MAX_NUMBER} 
включительно ${getRandomNumber(MIN_NUMBER, MAX_NUMBER)}`);

alert(`случайное число с плавающей точкой от ${MIN_NUMBER} до ${MAX_NUMBER} 
включительно ${getRandomFloatNumber(MIN_NUMBER, MAX_NUMBER)}`);
