import './css/index.scss';

import './assets/icons/cloud-rain.svg';
import './assets/icons/cloud-snow.svg';
import './assets/icons/sun.svg';
import './assets/icons/pause.svg';

const getMp3File = (key) => `./assets/sounds/${key}.mp3`;
const getBackgroundUrl = (key) => `./assets/img/${key}-bg.jpg`;

const volume = document.querySelector('.volume-bar input');

const buttonsList = document.querySelector('.weather-list');

const weatherData = {
  summer: {
    audio: new Audio(getMp3File('summer')),
    bg: getBackgroundUrl('summer'),
  },
  autumn: {
    audio: new Audio(getMp3File('rain')),
    bg: getBackgroundUrl('rainy'),
  },
  winter: {
    audio: new Audio(getMp3File('winter')),
    bg: getBackgroundUrl('winter'),
  },
};
document.body.style.backgroundImage = `url(${weatherData.summer.bg})`;

let currentBtn = null;
let currentAudio = null;

buttonsList.addEventListener('click', ({ target }) => {
  const button = target.closest('.weather-button');
  if (!button) {
    return;
  }
  const currentWeather = weatherData[button.dataset.id];
  if (button.classList.contains('active')) {
    currentAudio.pause();
    button.classList.remove('active');
  } else if (button === currentBtn) {
    currentAudio.play();
    button.classList.add('active');
  } else {
    if (currentBtn) {
      const activeId = currentBtn.dataset.id;
      currentBtn.classList.remove('active');
      weatherData[activeId].audio.pause();
      weatherData[activeId].audio.currentTime = 0;
    }
    button.classList.add('active');
    currentBtn = button;
    currentAudio = currentWeather.audio;
    document.body.style.backgroundImage = `url(${currentWeather.bg})`;
    currentAudio.volume = +volume.value / 100;
    currentAudio.play();
  }
});

volume.addEventListener('change', ({ target }) => { currentAudio.volume = +target.value / 100; });
