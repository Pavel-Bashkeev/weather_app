import "babel-polyfill";
export default () => {
	const keyApi = 'ed6cd4e17028bae0bf6709fcccaf2110';
	const root = document.querySelector('#root');
	const popup = document.querySelector('#popup');
	const closeBtn = document.querySelector('.popup-close')
	const textInput = document.querySelector('#text-input');
	const form = document.querySelector('#form');
	let store = {
		city: 'Los Angeles',
		temperature: 0,
		isDay: 'yes',
		observationTime: "00:00 PM",
		description: '',
		properties: {
			windSpeed: 0,
			feelslike: 0,
			cloudcover: 0,
			visibility: 0,
			pressure: 0,
			humidity: 0,
		}
	}
	const fetchData = async () => {
	try {
		const nameCity = localStorage.getItem('query') || store.city;
		const result = await fetch((`http://api.weatherstack.com/current?access_key=${keyApi}&query=${nameCity}`))
		const data = await result.json();
		console.log(data)
		const {
			current: {
				temperature,
				is_day: isDay,
				observation_time: observationTime,
				weather_descriptions: description,
				wind_speed: windSpeed,
				feelslike,
				cloudcover,
				visibility,
				pressure,
				humidity,
			},
			location: {
				name
			}
		} = data;

		store = {
			...store,
			city: name,
			temperature,
			isDay,
			observationTime,
			description: description[0],
			properties: {
				windSpeed: {
					title: 'wind speed',
					value: `${windSpeed} km/h`,
					icon: `wind.webp`
				},
				feelslike: {
					title: 'feelslike',
					value: `${feelslike}°`,
					icon: `uv-index.webp`
				},
				cloudcover: {
					title: 'cloudcover',
					value: `${cloudcover} °`,
					icon: `cloud.webp`
				},
				visibility: {
					title: 'visibility',
					value: `${visibility} %`,
					icon: `visibility.webp`
				},
				pressure: {
					title: 'pressure',
					value: `${pressure} PA`,
					icon: `gauge.webp`
				},
				humidity: {
					title: 'humidity',
					value: `${humidity} %`,
					icon: `humidity.webp`
				},
			}
		}

		renderContent();
	} catch (error) {
		console.log(error);
	}

	}

	const getImage = (descritption) => {
		const stateItemImg = {
			"sunny": "sunny.webp",
			"fog": "fog.webp",
			"clear": "clear.webp",
			"light snow": "cloud.webp",
			default: 'partly.webp'
		}
		let state = descritption.toLowerCase();
		return stateItemImg[state] ? stateItemImg[state] : stateItemImg.default;
	}


	const renderProperties = (properties) => {
		return Object.values(properties)
			.map(({
				title,
				value,
				icon
			}) => {
				return `
						<div class="property">
							<div class="property-icon">
								<img src="./images/icons/${icon}" alt>
							</div>
							<div class="property-info">
								<p class="property-info__value">${value}</p>
								<p class="proprety-info__description">${title}</p>
							</div>
						</div>
					`;
			})
			.join(" ");
	}
	const markup = () => {
		const {
			city,
			temperature,
			observationTime,
			description,
			isDay,
			properties
		} = store;
		let isDayIndic = isDay === "yes" ? 'is-day' : '';
		return `
			<div class="container ${isDayIndic}">
				<div class="top">
					<div class="city">
						<p class="city-subtitle">Weather today in </p>
						<p class="city-title" id="city">
							<span>${city}</span>
						</p>
					</div>
					<div class="city-info">
						<div class="top-left">
							<img class="icon" src="./images/${getImage(description)}" alt>
							<p class="description">${description}</p>
						</div>
						<div class="top-right">
							<p class="city-info__subtitle">as of ${observationTime}</p>
							<p class="city-info__title df al-c">
								<img class="temp-img" src="./images/the.webp">
								<span>${temperature}°</span>
							</p>
						</div>
					</div>
				</div>
				<div class="properties-inner">
					<div class="items fit mr-a df wrap al-c ju-a">${renderProperties(properties)}</div>
				</div>
			</div>
		`
	}


	const toggleClassPopup = () => {
		popup.classList.toggle('active');
	}

	const renderContent = () => {
		root.innerHTML = markup();

		const cityBtn = document.querySelector('#city');
		cityBtn.addEventListener('click', toggleClassPopup);
		closeBtn.addEventListener('click', toggleClassPopup);
	}

	const handleInput = (event) => {
		store = {
			...store,
			city: event.target.value
		}
	}
	const handleSubmit = (event) => {
		event.preventDefault();
		const value = store.city;
		if(!value) return null;
		localStorage.setItem('query', value)
		fetchData();
		toggleClassPopup();
	}

	textInput.addEventListener('input', handleInput);
	form.addEventListener('submit', handleSubmit);

	fetchData();
}