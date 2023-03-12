import { isEscapeKey } from './keydown-check.js';

const bodyElement = document.querySelector('body');

const popupElement = document.querySelector('.big-picture');
const bigPictureElement = document.querySelector('.big-picture__img');
const likesCountElement = document.querySelector('.likes-count');

const commentsCountElement = document.querySelector('.comments-count');
const commentsListElement = document.querySelector('.social__comments');
const photoDescriptionElement = document.querySelector('.social__caption');
const singleCommentElement = commentsListElement.querySelector('.social__comment');

const commentCountBlockElement = document.querySelector('.social__comment-count');
const commentsLoaderBlockElement = document.querySelector('.comments-loader');

const cancelCrossElement = popupElement.querySelector('#picture-cancel');

// Создание комментария
const createFullPictureComment = (commentsData) => {
  commentsData.forEach(({avatar, name, message}) => {
    const comment = singleCommentElement.cloneNode(true);

    comment.querySelector('.social__picture').src = avatar;
    comment.querySelector('.social__picture').alt = name;
    comment.querySelector('.social__text').textContent = message;

    commentsListElement.append(comment);

  });
};


const showFullPictrue = (url, likes, comments, description) => {
  openUserModal();
  bigPictureElement.querySelector('img').src = url;
  likesCountElement.textContent = likes;
  commentsCountElement.textContent = comments.length;
  photoDescriptionElement.textContent = description;
  commentsListElement.innerHTML = '';
  createFullPictureComment(comments);

};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

function openUserModal() {
  popupElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  // Temporary
  commentCountBlockElement.classList.add('hidden');
  commentsLoaderBlockElement.classList.add('hidden');
}

function closeUserModal() {
  popupElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  // Temporary
  commentCountBlockElement.classList.remove('hidden');
  commentsLoaderBlockElement.classList.remove('hidden');
}

cancelCrossElement.addEventListener('click', () =>
  closeUserModal()
);

export { showFullPictrue };
