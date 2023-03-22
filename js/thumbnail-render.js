import { showFullPicture } from './big-pic-popup.js';
import { getData } from './load-api.js';
import { debounce, shuffleArray } from './util.js';

const RANDOM_PICS_COUNT = 10;
const RERENDER_DELAY = 500;

const pictureTemplateElement = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const picturesContainerElement = document.querySelector('.pictures');
const filtersContainerElement = document.querySelector('.img-filters');
const filterButtonsElements = document.querySelectorAll('.img-filters__button');

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

const makeButtonActive = (evt) => {
  filterButtonsElements.forEach((option) => {
    if (evt.target.classList.contains('img-filters__button')) {
      option.classList.remove('img-filters__button--active');
    }
  });
  if (evt.target.classList.contains('img-filters__button')) {
    evt.target.classList.add('img-filters__button--active');
  }

};

const switchPhotosByFilter = (posts, evt) => {
  if (evt.target.classList.contains('img-filters__button')) {
    document.querySelectorAll('.picture').forEach((pic) => {
      pic.remove();
    });
  }
  let photosList = posts;
  switch (evt.target.id) {
    case 'filter-default':
      renderSimilarPosts(photosList);
      break;
    case 'filter-random':
      photosList = shuffleArray(posts).slice(0, RANDOM_PICS_COUNT);
      renderSimilarPosts(photosList);
      break;
    case 'filter-discussed':
      photosList = posts
        .slice()
        .sort((a, b) => {
          if (a.comments.length < b.comments.length) {
            return 1;
          } else {
            return -1;
          }
        });
      renderSimilarPosts(photosList);
      break;
  }

};

getData((posts) => {
  renderSimilarPosts(posts);

  filtersContainerElement.addEventListener('click', debounce((evt) => switchPhotosByFilter(posts, evt), RERENDER_DELAY,));
  filtersContainerElement.addEventListener('click', (evt) => makeButtonActive(evt));

});


