// get user location
// have different icons/images depending on weather > included in API rsponse
// toggle between F and C

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      successfulLocation(position);
    });
  }
}

function successfulLocation(position) {
    var userLocation = [];
    userLocation.push(position.coords.latitude, position.coords.longitude);
    getWeather(userLocation);
}

function getWeather(coords)  {
  var latitude = coords[0];
  var longitude = coords[1];
  var apiKey = "42f4920aa9b57161";
  var url = "https://api.wunderground.com/api/" + apiKey + "/conditions/q/"
            + latitude + "," + longitude
            +".json";

  $.getJSON(url, function(response) {
    showTemperature(response);
    showCurrentCity(response);
    showWeatherDescription(response);
    showWeatherIcon(response);
  });
}

function showTemperature(APIresponse) {
  var temperatureCelsius = Math.round(APIresponse.current_observation.temp_c);
  var realFeelTemp = Math.round(APIresponse.current_observation.feelslike_c)
  document.getElementById('temp').innerHTML = temperatureCelsius + "°C";
  document.getElementById('real-feel-temp').innerHTML = realFeelTemp + "°C";
}

function showCurrentCity(APIresponse) {
  var city = APIresponse.current_observation.display_location.city;
  document.getElementById('location').innerHTML = city;
}

function showWeatherDescription(APIresponse) {
  var description = APIresponse.current_observation.weather;
  document.getElementById('description').innerHTML = description.toLowerCase();
}

function showWeatherIcon(APIresponse) {
  var iconURL = APIresponse.current_observation.icon_url;
  var img = document.getElementById('weather-icon');
  img.src = iconURL;
}

function toggleTemperature() {
  var temp = document.getElementById('temp').innerHTML;
  if (temp.includes("C")) {
    document.getElementById('temp').innerHTML = toFahrenheit(temp);
    document.getElementById('real-feel-temp').innerHTML = toFahrenheit(temp);
  } else {
    document.getElementById('temp').innerHTML = toCelsius(temp);
    document.getElementById('real-feel-temp').innerHTML = toCelsius(temp);
  }
}

function toFahrenheit(temp) {
  var strippedTemp = temp.replace(/\D/g, '');
  var fahrenheit = Math.floor((strippedTemp * 9/5) + 32) + "°F";
  return fahrenheit;
}

function toCelsius(temp) {
  var strippedTemp = temp.replace(/\D/g, '');
  var celsius = Math.floor((strippedTemp - 32) * 5/9) + "°C";
  return celsius;
}

getUserLocation();
