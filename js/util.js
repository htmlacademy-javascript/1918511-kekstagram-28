// Функция Random
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// Генерирую новое значение и проверяю чтобы оно былу уникальным. Fixed: 07.03.2023
const generateUniqueId = (min, max , arr) => {
  while (min <= max) {
    const random = getRandomInteger(min, max);
    if (!arr.includes(random)) {
      arr.push(random);
      return random;
    }
  }
};

export {getRandomInteger, getRandomArrayElement, generateUniqueId};
