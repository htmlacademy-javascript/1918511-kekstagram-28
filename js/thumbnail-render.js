import { showFullPicture } from './big-pic-popup.js';
import { getData } from './load-api.js';

const pictureTemplateElement = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const picturesContainerElement = document.querySelector('.pictures');

const renderSimilarPosts = (similarPosts) => {
  const similarPostsFragment = document.createDocumentFragment();

  similarPosts.forEach(({url, likes, comments, description}) => {
    const pictureElement = pictureTemplateElement.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;

    pictureElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      showFullPicture(url, likes, comments, description);
    }
    );

    similarPostsFragment.append(pictureElement);

  }
  );

  picturesContainerElement.append(similarPostsFragment);
};

getData((posts) => {
  renderSimilarPosts(posts);
});
