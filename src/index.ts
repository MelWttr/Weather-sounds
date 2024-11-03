import './css/index.scss';
import './assets/icons/cloud-rain.svg';
import './assets/icons/cloud-snow.svg';
import './assets/icons/sun.svg';
import './assets/icons/pause.svg';


const getMp3File = (key: string): string => `./assets/sounds/${key}.mp3`;
const getBackgroundUrl = (key: string): string => `./assets/img/${key}-bg.jpg`;

const volume: HTMLInputElement = document.querySelector('.volume-bar input') as HTMLInputElement;
const buttonsList: HTMLElement = document.querySelector('.weather-list') as HTMLElement;

interface Weather {
	[season: string]: {
		audio: HTMLAudioElement,
		bg: string
	}
}

const weatherData: Weather = {
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


let currentBtn: HTMLButtonElement;
let currentAudio: HTMLAudioElement;

type handleButtonsClickType = (event: Event) => void;
type handleVolumeChangeType = (event: Event) => void;

const handleButtonsClick: handleButtonsClickType = (evt) => {
	const {target} = evt;
	if (target instanceof HTMLElement) {
		const button = target.closest('.weather-button') as HTMLButtonElement;
		if (!button) {
			return;
		}
		const id = button.dataset.id as string;
		const currentWeather = weatherData[id];
		if (button.classList.contains('active')) {
			currentAudio.pause();
			button.classList.remove('active');
			return;
		} else if (button === currentBtn) {
			currentAudio.play();
			button.classList.add('active');
		} else {
			if (currentBtn) {
				const activeId = currentBtn.dataset.id as string;
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
	}
};

const handleVolumeChange: handleVolumeChangeType = (evt: Event) => {
	const target = evt.target as HTMLInputElement;
	currentAudio.volume = +target.value / 100
};

buttonsList.addEventListener('click', handleButtonsClick);
volume.addEventListener('change', handleVolumeChange);
