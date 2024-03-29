let searchBtns = document.querySelectorAll(".search-btn");

// adds event listener to each button
searchBtns.forEach(btn => {
    btn.addEventListener('click', fetchWeather);
});

let cityLat = "";
let cityLon = "";
let cityTemp = "";
let cityWind = "";
let cityHumidity = "";
let cityIcon = "";

// function to fetch lat/lon from city name searched
function fetchWeather(event) {
    let cityName = '';

    if (event.target.textContent === 'Search') {
        cityName = capFirstLetter(document.getElementById('search-input').value);

    } else {
        cityName = event.target.textContent
    };

    let getLatAndLon = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${APIkey}`;

    fetch(getLatAndLon, {
        method: "GET"
    }).then((response) => {
        return response.json();
    }).then((data) => {
        cityLat = data[0].lat;
        cityLon = data[0].lon;

        let getWeatherData = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&appid=${APIkey}&units=imperial`;

        return fetch(getWeatherData)
    }).catch(err => {
        window.alert("Sorry, city not found. Please search for a different city");

    }).then((response) => {
        return response.json();
    }).then((data) => {

        currentForecast(data.list, cityName);
        weatherForecast(data.list);
        saveSearchedCities(cityName);
    });
};

// saving searched city to local storage
function saveSearchedCities(cityName) {
    let tempArray = [];
    let currentCities = localStorage.getItem('cityName');

    if (currentCities !== null && currentCities !== '') {
        let array = JSON.parse(currentCities);
        tempArray.push(...array);
    };

    if (cityName) {
        let filteredArray = tempArray.filter(item => {
            return item !== cityName
        }
        );

        filteredArray.push(cityName);

        localStorage.setItem('cityName', JSON.stringify(filteredArray));

        displaySearchedCities();
    };
}

// displaying previously searched cities from local storage
function displaySearchedCities() {
    let cities = JSON.parse(localStorage.getItem('cityName'));
    let html = '';

    cities.forEach(city => {
        html += `
        <button class="search-btn" type="submit">${city}</button>
        `
    });

    document.querySelector(".previous-searched").innerHTML = html;

    let searchBtns = document.querySelectorAll(".search-btn");

    searchBtns.forEach(btn => {
        btn.addEventListener('click', fetchWeather);
    });
};

// display current weather
function currentForecast(forecastList, cityName) {
    let html = '';

    unix = forecastList[0].dt;
    unix2 = forecastList[0].dt;
    temp = forecastList[0].main.temp;
    wind = forecastList[0].wind.speed;
    humidity = forecastList[0].main.humidity;
    icon = forecastList[0].weather[0].icon;

    var unixFormat = dayjs.unix(`${unix}`).format('M/D/YYYY');

    html += `
            <div class='current-day'>
            <h2>${cityName} ${unixFormat}</h2>
            <img src="http://openweathermap.org/img/w/${icon}.png" alt="">
            <p>Temp: ${temp}</p>
            <p>Wind: ${wind}</p>
            <p>Humidity: ${humidity}%</p>
            </div>`

    document.querySelector(".current-search").innerHTML = html;
};

// displaying 5-day forecast
function weatherForecast(forecastList) {

    let html = "";
    let dayForecast = '';

    dayForecast = `
        <div class='forecast-title'>
        <h3>5-Day Forecast:</h3>
        </div>`

    document.querySelector(".five-day").innerHTML = dayForecast;

    // loop displaying every 8th object
    for (var i = 7; i < forecastList.length; i++) {
        unix = forecastList[i].dt;
        unix2 = forecastList[i].dt;
        temp = forecastList[i].main.temp;
        wind = forecastList[i].wind.speed;
        humidity = forecastList[i].main.humidity;
        icon = forecastList[i].weather[0].icon;

        var unixFormat = dayjs.unix(`${unix}`).format('M/D/YYYY');

        html += `
            <div class='each-day'>
            <h3>${unixFormat}</h3>
            <img src="http://openweathermap.org/img/w/${icon}.png" alt="">
            <p>Temp: ${temp}</p>
            <p>Wind: ${wind}</p>
            <p>Humidity: ${humidity}%</p>
            </div>`

        // increasing to fetch every 8th object to display weather at 24h instead of 3h
        i = i + 7;
    };

    const fiveDays = document.createElement('div');
    fiveDays.classList.add('all-days');

    document.querySelector(".five-day").appendChild(fiveDays)

    fiveDays.innerHTML = html;
};

// capitalizes first letter of city 
function capFirstLetter(string) {

    const words = string.split(" ");

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    return words.join(" ");
};
