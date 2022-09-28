function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function FormatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = addZero(date.getHours());
  let minutes = addZero(date.getMinutes());
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `Last updated on ${day} at ${hours}:${minutes}`;
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];

  return day;
}

function showForecast(response) {
  let dailyForecast = response.data.daily;
  console.log(dailyForecast);

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row g-0 text-center">`;
  dailyForecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col">
       <div class="card daily-card">
          <div class="card-body">
            <div class="forecast-day">${formatForecastDay(forecastDay.dt)}</div>
            <img
              src="https://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt="description"               width=52"
            />
            <div class="forecast-temperature"> <span class="high-temp">${Math.round(
              forecastDay.temp.max
            )}° <span class="low-temp">${Math.round(
          forecastDay.temp.min
        )}°</span>
          </div>
         </div>
       </div>
      </div>       
    `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function formatSunrise(timestamp) {
  let date = new Date(timestamp);
  let hours = addZero(date.getHours());
  let minutes = addZero(date.getMinutes());

  return `${hours}:${minutes}`;
}

function formatSunset(timestamp) {
  let date = new Date(timestamp);
  let hours = addZero(date.getHours());
  let minutes = addZero(date.getMinutes());

  return `${hours}:${minutes}`;
}

function getForecast(coordinates) {
  let apiKey = `f3887e262c88d1158f7e2ef4998e234c`;
  let unit = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showForecast);
}

function showWeather(response) {
  let cityElement = document.querySelector("h1");
  cityElement.innerHTML = response.data.name;

  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  let descriptionElement = document.querySelector("#current-description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  celsiusTemp = response.data.main.temp;

  let tempElement = document.querySelector("#temperature-value");
  tempElement.innerHTML = Math.round(celsiusTemp);

  highTemp = response.data.main.temp_max;

  let highElement = document.querySelector("#high-value");
  highElement.innerHTML = `${Math.round(highTemp)} °`;

  lowTemp = response.data.main.temp_min;

  let lowElement = document.querySelector("#low-value");
  lowElement.innerHTML = `${Math.round(lowTemp)} °`;

  let windElement = document.querySelector("#wind-value");
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} m/s`;

  let humidityElement = document.querySelector("#humidity-value");
  humidityElement.innerHTML = `${Math.round(response.data.main.humidity)}%`;

  let sunriseElement = document.querySelector("#sunrise-value");
  sunriseElement.innerHTML = formatSunrise(response.data.sys.sunrise * 1000);

  let sunsetElement = document.querySelector("#sunset-value");
  sunsetElement.innerHTML = formatSunset(response.data.sys.sunset * 1000);

  let dateElement = document.querySelector("#date-time");
  dateElement.innerHTML = FormatDate(response.data.dt * 1000);

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = `3586db65420f91acc50aa25a5656c411`;
  let unit = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  searchCity(searchInput.value);
}
function showCelsius(event) {
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  event.preventDefault();
  let tempElement = document.querySelector("#temperature-value");
  tempElement.innerHTML = Math.round(celsiusTemp);
  let highElement = document.querySelector("#high-value");
  highElement.innerHTML = `${Math.round(highTemp)} °`;
  let lowElement = document.querySelector("#low-value");
  lowElement.innerHTML = `${Math.round(lowTemp)} °`;
}
function showFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let tempFahrenheit = (celsiusTemp * 9) / 5 + 32;
  let tempElement = document.querySelector("#temperature-value");
  tempElement.innerHTML = Math.round(tempFahrenheit);
  let highFahrenheit = (highTemp * 9) / 5 + 32;
  let highElement = document.querySelector("#high-value");
  highElement.innerHTML = `${Math.round(highFahrenheit)} °`;
  let lowFahrenheit = (lowTemp * 9) / 5 + 32;
  let lowElement = document.querySelector("#low-value");
  lowElement.innerHTML = `${Math.round(lowFahrenheit)} °`;
}

let celsiusTemp = null;
let highTemp = null;
let lowTemp = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);

searchCity(`Ankaran`);
