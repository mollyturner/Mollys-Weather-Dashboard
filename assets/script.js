//event listener for search button
let searchBtn = document.getElementById("search-btn")
searchBtn.addEventListener('click', fetchWeather);

let cityLat = "";
let cityLon = "";

let cityTemp = "";
let cityWind = "";
let cityHumidity = "";
let cityIcon = "";

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

        // console.log("data: " + JSON.stringify(data));

        let html = "";

        

        for (var i = 0; i < data.list.length; i++) {
            console.log('index', i);
            console.log(data.list[i].weather);

            unix = data.list[i].dt;
            unix2 = data.list[i].dt;
            temp = data.list[i].main.temp;
            wind = data.list[i].wind.speed;
            humidity = data.list[i].main.humidity;
            icon = data.list[i].weather[0].icon;

            console.log(`time: ${unix}`);
            console.log(`temp: ${temp}`);
            console.log(`wind: ${wind}`);
            console.log(`humidity: ${humidity}`);
            console.log(`icon: ${icon}`);

            var unixFormat = dayjs.unix(`${unix}`).format('M/D/YYYY');

            console.log(unixFormat);

            html += `
            <div>
            <h3>${unixFormat}</h3>
            <img src="http://openweathermap.org/img/w/${icon}.png" alt="">
            <p>${temp}</p>
            <p>${wind}</p>
            <p>${humidity}</p>
            </div>`
            
            i = i+7;
        }

        // document.getElementsByClassName("five-day").innerHTML = html;
        document.querySelector(".five-day").innerHTML = html;
    })
};


