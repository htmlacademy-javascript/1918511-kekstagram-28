import { imgPreviewElement, sliderEffectValueElement } from './file-upload-popup.js';

const scaleSmallerElement = document.querySelector('.scale__control--smaller');
const scaleBiggerElement = document.querySelector('.scale__control--bigger');
const currentValueElement = document.querySelector('.scale__control--value');

const imgElement = imgPreviewElement.querySelector('img');
const effectsRadioElements = document.querySelectorAll('.effects__radio');

// slider
const sliderElement = document.querySelector('.effect-level__slider');
const sliderDataElement = document.querySelector('.effect-level__value');

const EFFECTS_DATA = {
  'chrome': {
    filter: 'grayscale',
    measurement: '',
  },
  'sepia': {
    filter: 'sepia',
    measurement: '',
  },
  'marvin': {
    filter: 'invert',
    measurement: '%',
  },
  'phobos': {
    filter: 'blur',
    measurement: 'px',
  },
  'heat': {
    filter: 'brightness',
    measurement: '',
  },
  'none': {
    filter: '',
    measurement: ''
  }

};

// Масштаб изображения
scaleSmallerElement.addEventListener('click', () => {
  let value = parseInt(currentValueElement.value, 10);
  value -= 25;
  if (value <= 25) {
    value = 25;
  }
  imgElement.style.transform = `scale(${value / 100})`;
  currentValueElement.value = `${value}%`;

});

scaleBiggerElement.addEventListener('click', () => {
  let value = parseInt(currentValueElement.value, 10);
  value += 25;
  if (value >= 100) {
    value = 100;
  }
  imgElement.style.transform = `scale(${value / 100})`;
  currentValueElement.value = `${value}%`;

});

// Применение эффекта на картинку и параметров слайдера.
effectsRadioElements.forEach((element) => {
  if (element.checked && element.id === 'effect-none'){
    sliderEffectValueElement.classList.add('hidden');
  }
  element.addEventListener('change', () => {
    for (let i = 0; i < effectsRadioElements.length; i++) {
      const iterableEffectName = effectsRadioElements[i].id.replace('effect-', '');
      imgElement.classList.remove(`effects__preview--${iterableEffectName}`);
    }

    const currentEffectName = element.id.replace('effect-', '');
    if (element.checked) {
      if (element.id !== 'effect-none'){
        sliderEffectValueElement.classList.remove('hidden');
      }
      imgElement.classList.add(`effects__preview--${currentEffectName}`);
      effectsRadioElements[0].value = currentEffectName;
      if (currentEffectName === 'chrome') {
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 1,
          },
          start: 1,
          step: 0.1,
        });

      } else if (currentEffectName === 'sepia') {
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 1,
          },
          start: 1,
          step: 0.1,
        });

      } else if (currentEffectName === 'marvin') {
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 100,
          },
          start: 100,
          step: 1,
        });

      } else if (currentEffectName === 'phobos') {
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 3,
          },
          start: 3,
          step: 0.1,
        });

      } else if (currentEffectName === 'heat') {
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 1,
            max: 3,
          },
          start: 3,
          step: 0.1,
        });

      } else {
        imgElement.style.removeProperty('filter');
        document.querySelector('.effect-level__value').value = '';
        sliderEffectValueElement.classList.add('hidden');
      }

    }

  });

});

// Создание слайдера
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function(value) {
      if(Number.isInteger(value)) {
        return value;
      }
      return value.toFixed(1);
    },
    from: function(value) {
      return parseFloat(value);
    }
  }
});

// Отслеживание положения + отслеживание по объекту для подставления значений style
sliderElement.noUiSlider.on('update', () => {
  for (let i = 0; i < Object.keys(EFFECTS_DATA).length; i++) {
    const filterKey = Object.keys(EFFECTS_DATA)[i];
    sliderDataElement.value = sliderElement.noUiSlider.get();

    if (effectsRadioElements[0].value === filterKey && filterKey !== 'none') {
      imgElement.style.filter =
       `${EFFECTS_DATA[filterKey].filter}(${sliderDataElement.value}${EFFECTS_DATA[filterKey].measurement})`;
    }
  }
});

