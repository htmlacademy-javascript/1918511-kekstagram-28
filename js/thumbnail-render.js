import { createSimilarPosts } from './data.js';
import { showFullPictrue } from './bigpic-popup.js';

const pictureTemplateElement = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const picturesContainerElement = document.querySelector('.pictures');

const similarPosts = createSimilarPosts();

const similarPostsFragment = document.createDocumentFragment();

similarPosts.forEach(({url, likes, comments, description}) => {
  const pictureElement = pictureTemplateElement.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  pictureElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    showFullPictrue(url, likes, comments, description);
  }
  );

  similarPostsFragment.append(pictureElement);

}
);

picturesContainerElement.append(similarPostsFragment);
