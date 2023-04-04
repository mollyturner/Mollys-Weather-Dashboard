//event listener for search button
let searchBtn = document.getElementById("search-btn")
searchBtn.addEventListener('click', fetchWeather);

let cityLat = "";
let cityLon = "";

let cityTemp = "";
let cityWind = "";
let cityHumidity = "";
let cityIcon = "";
var time = dayjs().unix();

//function to call api for weather data
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

        console.log("Lat: " + cityLat);
        console.log("Lon: " + cityLon);
        console.log("Time: " + time);
        
        console.log("API: " + APIkey);

        let url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${cityLat}&lon=${cityLon}&appid=${APIkey}&units=imperial`;

        return fetch(url2)
    }).then((response) => {

        return response.json();
    }).then((data) => {
        cityTemp = data.main.temp;
        cityWind = data.wind.speed;
        cityHumidity = data.main.humidity;
        cityIcon = data.weather[0].icon;

        console.log('current temp: ' + cityTemp);
        console.log('current wind: ' + cityWind);
        console.log('current humidity: ' + cityHumidity);
        console.log('current icon: ' + cityIcon);

        let url3 = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&appid=${APIkey}&units=imperial`;

        return fetch(url3)

    }).then((response) => {

        return response.json();
    }).then((data) => {
        console.log("data: " + JSON.stringify(data));

        dayOneTemp = data.list[0].main.temp;
        dayOneWind = data.list[0].wind.speed;
        dayOneHumidity = data.list[0].main.humidity;
        dayOneIcon = data.list[0].weather[0].icon;

        for (var i = 1; i < 6; i++);
        

        console.log("Day1 temp: " + dayOneTemp);
        console.log("Day1 wind: " + dayOneWind);
        console.log("Day1 humidity: " + dayOneHumidity);
        console.log("Day1 icon: " + dayOneIcon);

    })
};


