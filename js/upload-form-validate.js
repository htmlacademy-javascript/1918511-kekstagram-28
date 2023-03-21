import { isEscapeKey } from './keydown-check.js';
import { sendData } from './load-api.js';
import { createError , createSuccess } from './util.js';
import { closeUserUploadModal, bodyElement, hashtagFieldElement, commentFieldElement } from './file-upload-popup.js';

const HASHTAG_REGEX = /#[a-zа-яё0-9]{1,19}$/i; //g v konce
const MAX_HASHTAG_COUNT = 5;

const uploadForm = document.querySelector('.img-upload__form');

const submitButtonElement = uploadForm.querySelector('#upload-submit');

const hashtagPristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form__item--invalid',
  // successClass: 'form__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text__hashtags-error',
});

const validateHashtag = (text) => HASHTAG_REGEX.test(text) || text === '';


const validateHashtagCount = (text) =>
  text
    .split('')
    .filter((tag) => tag === '#')
    .length <= MAX_HASHTAG_COUNT;


const validateSimilarHashtags = (text) => {
  const textArray = text
    .replaceAll(' ','')
    .toLowerCase()
    .split('#');
  textArray.shift();

  const unique = Array.from(new Set(textArray));

  return textArray.length === unique.length;

};

// Валидатор правильности хештега
hashtagPristine.addValidator(
  hashtagFieldElement,
  validateHashtag,
  'Ошибка! не верно введен хештег'
);

// Валидатор на количество хештегов
hashtagPristine.addValidator(
  hashtagFieldElement,
  validateHashtagCount,
  'Ошибка! максимальное количество хештегов: 5'
);

// Валидатор на одинаковые хештеги
hashtagPristine.addValidator(
  hashtagFieldElement,
  validateSimilarHashtags,
  'Ошибка! Одинаковые хештеги!'
);

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Публикую...';

};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';

};

const setUserFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    hashtagPristine.validate();
    const isValid = hashtagPristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          blockSubmitButton();
          createSuccess();
          bodyElement.classList.add('modal-open');
        },
        () => {
          createError();
          unblockSubmitButton();
          bodyElement.classList.add('modal-open');
        },
        new FormData(evt.target),
        unblockSubmitButton
      );
    }

  });
};

// При первичном нажатии ESC убирает фокус с элемента, при повторном (без фокуса) работает как обычно
hashtagFieldElement.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
    document.activeElement.blur();
  }
});

commentFieldElement.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
    document.activeElement.blur();
  }
});

setUserFormSubmit(closeUserUploadModal);

