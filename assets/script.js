//event listener for search button
let searchBtn = document.getElementById("search-btn")
searchBtn.addEventListener('click', fetchWeather);

let cityLat = "";
let cityLon = "";
let cityTemp = "";
let cityWind = "";
let cityHumidity = "";
let cityIcon = "";

//function to fetch api weather data
function fetchWeather(event) {
    let APIkey = '03a65d5467760983e97224dadfa22af6';
    let cityName = document.getElementById('search-input').value;
    let url1 = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${APIkey}`;


    fetch(url1, {
        method: "GET"
    }).then((response) => {
        return response.json();
    }).then((data) => {
        cityLat = data[0].lat;
        cityLon = data[0].lon;

    //     let url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${cityLat}&lon=${cityLon}&appid=${APIkey}&units=imperial`;

    //     return fetch(url2)
    // }).then((response) => {
    //     return response.json();
    // }).then((data) => {
    //     cityTemp = data.main.temp;
    //     cityWind = data.wind.speed;
    //     cityHumidity = data.main.humidity;
    //     cityIcon = data.weather[0].icon;

        let url3 = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&appid=${APIkey}&units=imperial`;

        return fetch(url3)
    }).then((response) => {
        return response.json();
    }).then((data) => {

        // currentForecast(data.list);

        weatherForecast(data.list);
    });

    // Create temp array
    let tempArray = [];

    // Get current city name array from local storage
    let currentCities = localStorage.getItem('cityName');

    // append local storage array and cityName variable to temp array
    if (currentCities !== null && currentCities !== '') {
        let array = JSON.parse(currentCities);
        tempArray.push(...array);
    };

    if (cityName) {
        tempArray.push(cityName);
    };

    // save temp array to localstorage
    localStorage.setItem('cityName', JSON.stringify(tempArray));
};

// parse back from local storay
    let cities = localStorage.getItem('cityName');
    

    function weatherForecast(forecastList) {
        let html = "";

        // loop displaying every 8th object
        for (var i = 7; i < forecastList.length; i++) { 
            console.log('index', i);
            console.log(forecastList[i].weather);

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
        }
        document.querySelector(".five-day").innerHTML = html;
    };




