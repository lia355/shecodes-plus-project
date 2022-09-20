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

  let tempElement = document.querySelector("#temperature-value");
  tempElement.innerHTML = Math.round(response.data.main.temp);

  let highElement = document.querySelector("#high-value");
  highElement.innerHTML = `${Math.round(response.data.main.temp_max)} °`;

  let lowElement = document.querySelector("#low-value");
  lowElement.innerHTML = `${Math.round(response.data.main.temp_min)} °`;

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
function showCelsius() {
  let tempCelsius = document.querySelector("#temperature-value");
  tempCelsius.innerHTML = `19`;
}
function showFarenheit() {
  let tempFarenheit = document.querySelector("#temperature-value");
  tempFarenheit.innerHTML = `66`;
}

searchCity("Ankaran");

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsius);

let farenheit = document.querySelector("#farenheit");
farenheit.addEventListener("click", showFarenheit);
