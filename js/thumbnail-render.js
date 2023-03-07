import { createSimilarPosts } from './data.js';

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const similarPosts = createSimilarPosts();

const similarPostsFragment = document.createDocumentFragment();

similarPosts.forEach(({url, likes, comments}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  similarPostsFragment.append(pictureElement);
}
);

picturesContainer.append(similarPostsFragment);
