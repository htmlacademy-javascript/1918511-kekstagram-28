import { isEscapeKey } from './keydown-check.js';

const COMMENTS_SHOW_DEFAULT = 5;
let shownComments = [];

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

// Создание комментариев
const createFullPictureComments = (commentsData) => {
  commentsData.forEach(({avatar, name, message}) => {
    const comment = singleCommentElement.cloneNode(true);

    comment.querySelector('.social__picture').src = avatar;
    comment.querySelector('.social__picture').alt = name;
    comment.querySelector('.social__text').textContent = message;

    commentsListElement.append(comment);
  });

};

// Показ 5 комментариев
const showCommentsByDefault = (comments) => {
  const shownCommentsByDefault = comments.slice(0, COMMENTS_SHOW_DEFAULT);

  createFullPictureComments(shownCommentsByDefault);
  commentCountBlockElement.textContent =
   `${shownCommentsByDefault.length} из ${comments.length} комментариев`;

  if (shownCommentsByDefault.length >= comments.length) {
    commentsLoaderBlockElement.classList.add('hidden');
  }

};

// Отрисовка еще 5 комментариев
const renderMoreComments = () => {
  const additionalCommentsToShow = shownComments
    .slice(commentsListElement.children.length, commentsListElement.children.length + 5);

  createFullPictureComments(additionalCommentsToShow);
  commentCountBlockElement.textContent =
   `${commentsListElement.children.length} из ${shownComments.length} комментариев`;

  if (shownComments.length <= commentsListElement.children.length) {
    commentsLoaderBlockElement.classList.add('hidden');
  }

};

const showFullPicture = (url, likes, comments, description) => {
  openUserModal();

  bigPictureElement.querySelector('img').src = url;
  likesCountElement.textContent = likes;
  commentsCountElement.textContent = comments.length;
  photoDescriptionElement.textContent = description;

  commentsListElement.innerHTML = '';

  shownComments = comments;
  commentsLoaderBlockElement.addEventListener('click', renderMoreComments);
  showCommentsByDefault(comments);

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
}

function closeUserModal() {
  popupElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoaderBlockElement.classList.remove('hidden');
  commentsLoaderBlockElement.removeEventListener('click', renderMoreComments);
}

cancelCrossElement.addEventListener('click', () =>
  closeUserModal()
);

export { showFullPicture };
