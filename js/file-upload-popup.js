import { isEscapeKey } from './keydown-check.js';

const bodyElement = document.querySelector('body');

const imgInputElement = document.querySelector('#upload-file');
const imgUploadPopupElement = document.querySelector('.img-upload__overlay');
const imgPreviewElement = document.querySelector('.img-upload__preview');

const smallImgsPreviewElement = document.querySelectorAll('.effects__preview');

const cancelCrossElement = document.querySelector('#upload-cancel');

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

}

function closeUserModal() {
  imgUploadPopupElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);

}


cancelCrossElement.addEventListener('click', () =>
  closeUserModal()
);
