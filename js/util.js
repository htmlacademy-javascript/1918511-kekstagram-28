// Функция Random
import { closeUserUploadModal ,onDocumentKeydown } from './file-upload-popup.js';
import { isEscapeKey } from './keydown-check.js';

const errorElement = document.querySelector('#error').content;
const successElement = document.querySelector('#success').content;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// Генерирую новое значение и проверяю чтобы оно былу уникальным.
const generateUniqueId = (min, max , arr) => {
  while (min <= max) {
    const random = getRandomInteger(min, max);
    if (!arr.includes(random)) {
      arr.push(random);
      return random;
    }
  }
};

// Создание окна ошибки
const createError = () => {
  const errorClone = errorElement.querySelector('section').cloneNode(true);
  document.body.insertAdjacentElement('beforeend', errorClone);

  document.removeEventListener('keydown', onDocumentKeydown);
  document.addEventListener('keydown', onErrorKeydown);

  const removeErrorNoti = () => {
    errorClone.remove();
    document.removeEventListener('keydown', onErrorKeydown);
    document.addEventListener('keydown', onDocumentKeydown);
  };

  const removeErrorOutside = (evt) => {
    if (!evt.target.closest('.error__inner')) {
      removeErrorNoti();
      document.removeEventListener('click', removeErrorOutside);
    }
  };

  function onErrorKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      errorClone.remove();
      document.removeEventListener('keydown', onErrorKeydown);
      document.addEventListener('keydown', onDocumentKeydown);
      document.removeEventListener('click', removeErrorOutside);
    }
  }

  errorClone.querySelector('.error__button').addEventListener('click', () => {
    removeErrorNoti();
    document.removeEventListener('click', removeErrorOutside);
  });

  document.addEventListener('click', removeErrorOutside);
};

// Создание окна успеха
const createSuccess = () => {
  const successClone = successElement.querySelector('section').cloneNode(true);
  document.body.insertAdjacentElement('beforeend', successClone);

  const removeSuccessNoti = () => {
    closeUserUploadModal();
    successClone.remove();
    document.removeEventListener('keydown', onSuccessKeydown);
  };


  const removeSuccessOutside = (evt) => {
    if (!evt.target.closest('.success__inner')) {
      removeSuccessNoti();
      document.removeEventListener('click', removeSuccessOutside);
    }
  };

  function onSuccessKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      successClone.remove();
      document.removeEventListener('keydown', onSuccessKeydown);
      document.removeEventListener('click', removeSuccessOutside);
    }
  }

  document.addEventListener('keydown',onSuccessKeydown);

  successClone.querySelector('.success__button').addEventListener('click', () => {
    removeSuccessNoti();
    document.removeEventListener('click', removeSuccessOutside);
  });

  document.addEventListener('click', removeSuccessOutside);
};

export {getRandomInteger, getRandomArrayElement, generateUniqueId, createError, createSuccess};
