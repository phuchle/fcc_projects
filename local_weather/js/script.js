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
  var apiKey = "fbbc04106f66a90adfc6b9c9b3fac31e";
  var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude
            + "&lon=" + longitude + "&APPID=" + apiKey;

  $.getJSON(url, function(response) {
    showTemperature(response);
    showCurrentCity(response);
    showWeatherDescription(response);
    showWeatherIcon(response);
  });
}

function showTemperature(APIresponse) {
  var temperatureCelsius = Math.round(APIresponse.main["temp"] - 273.15);
  document.getElementById('temp').innerHTML = temperatureCelsius + "°C";
}

function showCurrentCity(APIresponse) {
  document.getElementById('location').innerHTML = APIresponse.name;
}

function showWeatherDescription(APIresponse) {
  document.getElementById('description').innerHTML = APIresponse.weather[0]["description"];
}

function showWeatherIcon(APIresponse) {
  var icon = APIresponse.weather[0].icon;
  var iconURL = "http://openweathermap.org/img/w/" + icon + ".png";
  var img = document.getElementById('weather-icon');
  img.src = iconURL;
}

function toggleTemperature() {
  var temp = document.getElementById('temp').innerHTML;
  if (temp.includes("C")) {
    document.getElementById('temp').innerHTML = toFahrenheit(temp);
  } else {
    document.getElementById('temp').innerHTML = toCelsius(temp);
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
