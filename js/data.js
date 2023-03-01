import {getRandomInteger, getRandomArrayElement, generateUniqueId} from './util.js';

const ID_ARRAY = [];
const IMG_ARRAY = [];
const MESSAGE_ID_ARRAY = [];
const SIMILAR_POSTS_COUNT = 25;

const NAMES = [
  'Иван Иванов',
  'Петр Алексеев',
  'Диванный Аналитик',
  'Сверхразум',
  'ChatGPT',
  'averageuser'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = [
  'WOW!',
  'НЕ WOW!',
  'Оригинальное описание',
  'Еще более оригинальное описание'
];

// Создание комментария к посту
const generateComment = () =>
  ({
    id: generateUniqueId(1, 999, MESSAGE_ID_ARRAY),
    avatar: `img/avatar-${getRandomInteger(1 , 6)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  });

// Создание поста
const generatePost = () => ({
  id: generateUniqueId(1, 25, ID_ARRAY),
  url: `photos/${generateUniqueId(1, 25, IMG_ARRAY)}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: [generateComment()]
});

// Создание 25 постов
const createSimilarPosts = () => Array.from({length: SIMILAR_POSTS_COUNT}, generatePost);

export {createSimilarPosts};
