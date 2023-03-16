import { isEscapeKey } from './keydown-check.js';

const bodyElement = document.querySelector('body');

const imgInputElement = document.querySelector('#upload-file');
const imgUploadPopupElement = document.querySelector('.img-upload__overlay');
const imgPreviewElement = document.querySelector('.img-upload__preview');

const smallImgsPreviewElement = document.querySelectorAll('.effects__preview');

const cancelCrossElement = document.querySelector('#upload-cancel');

const sliderEffectValueElement = document.querySelector('.img-upload__effect-level');
const firstRadioElement = document.querySelector('.effects__radio');

const displayImage = (image) => {
  const img = URL.createObjectURL(image);
  imgPreviewElement.children[0].src = img;
  smallImgsPreviewElement.forEach((child) => {
    child.style.backgroundImage = `url(${img})`;

  });

};

imgInputElement.addEventListener('change',() => {
  openUserModal();
  const file = imgInputElement.files[0];
  displayImage(file);
});

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }

};

function openUserModal() {
  imgUploadPopupElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  imgPreviewElement.children[0].style.transform = 'scale(1.0)';
  imgPreviewElement.children[0].className = '';
  imgPreviewElement.children[0].style.removeProperty('filter');
  firstRadioElement.value = 'none';
  sliderEffectValueElement.classList.add('hidden');

}

function closeUserModal() {
  imgUploadPopupElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  imgInputElement.value = '';
}

cancelCrossElement.addEventListener('click', () =>
  closeUserModal()
);

export { imgPreviewElement , sliderEffectValueElement };
