//catch element
const notificationElement = document.querySelector(".notification");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");

//weather object
const weather = {};
weather.temperature ={
    unit : "celsius"
}

const KELVIN = 273;
const key = "82005d27a116c2880c8f0fcb866998a0";

//check if have geolocation
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p>Browser doesn't Support Geolocation</p>`;
}

function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}

function showError(error){
    notificationElement.style.display= "block";
    notificationElement.innerHTML = `<p> ${error.message}</p>`;
}


//get weather
function getWeather(latitude, longitude) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api).then(function (response) {
        let data = response.json();
        return data;
    }).then(function (data) {
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
    }).then(function(){
        displayWeather();
    })
}

function displayWeather() {
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png">`;
    tempElement.innerHTML = `${weather.temperature.value} ° <span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;

}

function cToF(temperature) {
    return (temperature * 9/5) + 32;
}

tempElement.addEventListener('click', function () {
    if (weather.temperature.unit === "celsius") {
        let funit = cToF(weather.temperature.value);
        funit = Math.floor(funit);
        tempElement.innerHTML = `${funit}° <span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    } else {
        tempElement.innerHTML = `${weather.temperature.value}° <span>C</span>`;
        weather.temperature.unit = "celsius";
    }
});

