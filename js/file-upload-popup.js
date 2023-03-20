import { isEscapeKey } from './keydown-check.js';

const bodyElement = document.querySelector('body');

const imgInputElement = document.querySelector('#upload-file');
const imgUploadPopupElement = document.querySelector('.img-upload__overlay');
const imgPreviewElement = document.querySelector('.img-upload__preview');

const smallImgsPreviewElement = document.querySelectorAll('.effects__preview');

const cancelCrossElement = document.querySelector('#upload-cancel');

const sliderEffectValueElement = document.querySelector('.img-upload__effect-level');
const firstRadioElement = document.querySelector('.effects__radio');

const hashtagFieldElement = document.querySelector('.text__hashtags');
const commentFieldElement = document.querySelector('.text__description');

const displayImage = (image) => {
  const img = URL.createObjectURL(image);
  imgPreviewElement.children[0].src = img;
  smallImgsPreviewElement.forEach((child) => {
    child.style.backgroundImage = `url(${img})`;

  });

};

imgInputElement.addEventListener('change',() => {
  openUserUploadModal();
  const file = imgInputElement.files[0];
  displayImage(file);
});

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserUploadModal();
  }

};

const refreshUploadPopup = () => {
  imgPreviewElement.children[0].style.transform = 'scale(1.0)';
  imgPreviewElement.children[0].className = '';
  imgPreviewElement.children[0].style.removeProperty('filter');
  firstRadioElement.value = 'none';
  sliderEffectValueElement.classList.add('hidden');
  firstRadioElement.checked = true;
};

function openUserUploadModal() {
  imgUploadPopupElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  refreshUploadPopup();

}

function closeUserUploadModal() {
  imgUploadPopupElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  imgInputElement.value = '';
  refreshUploadPopup();
  hashtagFieldElement.value = '';
  commentFieldElement.value = '';
}

cancelCrossElement.addEventListener('click', () =>
  closeUserUploadModal()
);


export { imgPreviewElement , sliderEffectValueElement, closeUserUploadModal, bodyElement, onDocumentKeydown, hashtagFieldElement, commentFieldElement };
