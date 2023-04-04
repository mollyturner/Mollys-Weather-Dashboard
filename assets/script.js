//event listener for search button
let searchBtn = document.getElementById("search-btn")
searchBtn.addEventListener('click', fetchWeather);

let cityLat = "";
let cityLon = "";

let cityTemp = "";
let cityWind = "";
let cityHumidity = "";
let cityIcon = "";
var time = dayjs('2019-01-25').unix();

//function to call api for weather data
function fetchWeather(event) {
    let APIkey = '03a65d5467760983e97224dadfa22af6';
    let cityName = document.getElementById('search-input').value;
    let url1 = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${APIkey}`;
   
    fetch(url1, {
        method: "GET"
    }) .then((response) => {
            return response.json();
        })
        .then((data) => {
            cityLat = data[0].lat;
            cityLon = data[0].lon;

            console.log(cityLat);
            console.log(cityLon);
            console.log(time);

            console.log("data: " + JSON.stringify(data));

            
        })

        let url2 = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${cityLat}&lon=${cityLon}&dt=${time}&appid=${APIkey}`;

     fetch(url2, {
        method: "GET"
    })
        .then((response) => {
        return response.json();
    })

        .then((data) => {
            cityTemp = data[0].current.temp;
            cityWind = data[0].current.wind_speed;
            cityHumidity = data[0].current.humidity;
            cityIcon = data[0].current.weather.icon;

            console.log(cityTemp);
            console.log(cityWind);
            console.log(cityHumidity);
            console.log(cityIcon);
            

            console.log("data: " + JSON.stringify(data));

        });
};


