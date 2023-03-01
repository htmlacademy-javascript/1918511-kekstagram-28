// Функция Random
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// Проверяю существует ли такой элемент в массиве
const isExisted = (array, element) => array.includes(element);

// Создаю новое уникальное значение.
const generateUniqueId = (min, max, arr) => {
  for (let i = min; i <= max; i++) {
    const random = getRandomInteger(min, max);
    if (!isExisted(arr, random)) {
      arr.push(random);
      return random;
    }
  }
};

export {getRandomInteger, getRandomArrayElement, generateUniqueId};
