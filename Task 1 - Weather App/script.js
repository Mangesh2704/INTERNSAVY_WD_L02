const inputBox = document.getElementById('locationInput');
const searchBtn = document.getElementById('searchBtn');
const weatherImg = document.getElementById('weatherImg');
const temperature = document.getElementById('temperature');
const description = document.getElementById('weatherDescription');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const locationNotFound = document.getElementById('locationNotFound');
const weatherBody = document.getElementById('weatherBody');

const body = document.body;

const unsplashApiKey = 'igeErBdJ8clpEg1EU7-riAb1p2cRJj3RwL7z-C_pUA4';

async function setCityBackground(city) {
    console.log('Setting background for city:', city);
    const encodedCity = encodeURIComponent(city);
    const unsplashUrl = `https://api.unsplash.com/photos/random?query=city,${encodedCity}&orientation=landscape&client_id=${unsplashApiKey}`;

    try {
        const response = await fetch(unsplashUrl);
        const data = await response.json();

        console.log('Unsplash API response:', data);

        if (response.ok && data.urls && data.urls.full) {
            body.style.backgroundImage = `url("${data.urls.full}")`;
            body.style.backgroundSize = 'cover';
            body.style.backgroundPosition = 'center';
        } else {
            body.style.backgroundImage = "url('/assets/defaultbg.jpg')";
            body.style.backgroundSize = 'cover';
            body.style.backgroundPosition = 'center';
        }
    } catch (error) {
        console.error('Error fetching background image:', error);
        body.style.backgroundImage = "url('/assets/defaultbg.jpg')";
        body.style.backgroundSize = 'cover';
        body.style.backgroundPosition = 'center';
    }
}

async function checkWeather(city) {
    const apiKey = "1b2f8c4cbcbd0ee0ce628c4130e28dc2";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const weatherData = await response.json();

        console.log('OpenWeatherMap API response:', weatherData);

        if (weatherData.cod === '404') {
            locationNotFound.style.display = 'flex';
            weatherBody.style.display = 'none';
            return;
        }

        locationNotFound.style.display = 'none';
        weatherBody.style.display = 'flex';

        temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}°C`;
        description.innerHTML = `${weatherData.weather[0].description}`;
        humidity.innerHTML = `${weatherData.main.humidity}%`;
        windSpeed.innerHTML = `${weatherData.wind.speed} Km/H`;

        switch (weatherData.weather[0].main) {
            case 'Clouds':
                weatherImg.src = "/assets/cloud.png";
                break;
            case 'Clear':
                weatherImg.src = "/assets/clear.png";
                break;
            case 'Rain':
                weatherImg.src = "/assets/rain.png";
                break;
            case 'Mist':
                weatherImg.src = "/assets/mist.png";
                break;
            case 'Snow':
                weatherImg.src = "/assets/snow.png";
                break;
        }

        setCityBackground(city);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});

document.addEventListener('DOMContentLoaded', () => {
    async function displayWeather(city) {
        try {
            const apiKey = "1b2f8c4cbcbd0ee0ce628c4130e28dc2";
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

            const response = await fetch(url);
            const weatherData = await response.json();

            if (weatherData.cod === '404') {
                locationNotFound.style.display = 'flex';
                weatherBody.style.display = 'none';
                return;
            }

            locationNotFound.style.display = 'none';
            weatherBody.style.display = 'flex';

            temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}°C`;
            description.innerHTML = `${weatherData.weather[0].description}`;
            humidity.innerHTML = `${weatherData.main.humidity}%`;
            windSpeed.innerHTML = `${weatherData.wind.speed} Km/Hr`;

            switch (weatherData.weather[0].main) {
                case 'Clouds':
                    weatherImg.src = "/assets/cloud.png";
                    break;
                case 'Clear':
                    weatherImg.src = "/assets/clear.png";
                    break;
                case 'Rain':
                    weatherImg.src = "/assets/rain.png";
                    break;
                case 'Mist':
                    weatherImg.src = "/assets/mist.png";
                    break;
                case 'Snow':
                    weatherImg.src = "/assets/snow.png";
                    break;
            }

            setCityBackground(city);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    const defaultCity = 'Dubai';
    displayWeather(defaultCity);
});

