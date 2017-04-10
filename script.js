
var $location = $('#location'),
    $temp = $('#temp'),
    $tempMax = $('#tempMax'),
    $tempMin = $('#tempMin'),
    $weatherIcon = $('#weatherIcon'),
    $weatherMain = $('#weatherMain'),
    $weatherDesc = $('#weatherDesc'),
    $barometer = $('#barometer'),
    $humid = $('#humid'),
    $wind = $('#wind'),
    $sunrise = $('#sunrise'),
    $sunset = $('#sunset'),
    $moonrise = $('#moonrise'),
    $moonset = $('#moonset'),
    $displayContent = $('#displayContent'),
    $loader = $('#loader'),
    $raindrops = $('.rain_drop'),
    tempFahr,
    maxTempFahr,
    minTempFahr,
    api = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather\?",
    key = "&appid=979223e5411815d908c275a992b5c234",
    units = "&units=metric",
    geoip = "https://cors-anywhere.herokuapp.com/http://freegeoip.net/json/?q=";
if (navigator.geolocation) {
  console.log('data');
  navigator.geolocation.getCurrentPosition(useGeoData,alternateData);
}else{
  alternateData();
}
function alternateData(){
  $.getJSON('https://api.ipify.org?format=json', function(json){
    var ipaddr = json.id;
    $.getJSON(geoip + ipaddr, function(json1){
      var lat = json1.latitude,
          lon = json1.longitude;
      var apiLocator = "lat=" + lat + "&" + "lon=" + lon;
          $.getJSON( api + apiLocator + units + key , getWeatherData );
    })
  })
}
function useGeoData(position){
  console.log('located!')
  var lon = position.coords.longitude;
  var lat = position.coords.latitude;
  console.log(lon);
  var apiLocator = "lat=" + lat + "&" + "lon=" + lon;
  $.getJSON( api + apiLocator + units + key , getWeatherData );
};
function getWeatherData (json){
  console.log(JSON.stringify(json));
  var sunriseTime = new Date(json.sys.sunrise * 1000),
      sunsetTime = new Date(json.sys.sunset * 1000),
      temp = Math.round(json.main.temp),
      maxTemp = Math.round(json.main.temp_max),
      minTemp = Math.round(json.main.temp_min),
      icon = json.weather[0].icon,
      main = json.weather[0].main,
      description = json.weather[0].description,
      humidity  = json.main.humidity,
      windDeg = Math.round(json.wind.deg),
      windSpeed = json.wind.speed,
      pressure = Math.round(json.main.pressure) + "hPa",
      sunrise = function (){
        var minutes = "";
        if (sunriseTime.getMinutes() < 10) {
          minutes = "0" + sunriseTime.getMinutes();
        }else{
          minutes = sunriseTime.getMinutes();
        }
        return sunriseTime.getHours() + ":" + minutes;
      },
      sunset = function(){
        var minutes = "";
        if (sunsetTime.getMinutes() < 10) {
          minutes = "0" + sunsetTime.getMinutes();
        }else{
          minutes = sunsetTime.getMinutes();
        }
        return sunsetTime.getHours() + ":" + minutes;
      },
      cityName = json.name + ", " + json.sys.country;
      update(cityName, temp, maxTemp, minTemp, icon,  main, description, humidity, windDeg, windSpeed, pressure, sunrise, sunset)
}
function update(cityName, temp, maxTemp, minTemp, icon,  main, description, humidity, windDeg, windSpeed, pressure, sunrise, sunset){
      $location.html(cityName);
      $temp.html(temp + '<i class="wi wi-celsius"></i>');
      $tempMax.html(maxTemp + '<i class="wi wi-celsius"></i>');
      $tempMin.html(minTemp + '<i class="wi wi-celsius"></i>');
      $weatherIcon.html("<img src='http://openweathermap.org/img/w/" + icon + ".png'>");
      $weatherMain.html(main);
      $weatherDesc.html(description);
      $humid.html(humidity);
      $wind.html("<i class='wi wi-wind towards-" + windDeg + "-deg'></i> " + windSpeed + 'm/s ');
      $barometer.html(pressure);
      $sunrise.html(sunrise());
      $sunset.html(sunset());
      $displayContent.css('display', 'block');
      $loader.css('display', 'none');
}
var alterTemp = Number($temp.html().substring(0,2)),
    altermaxTemp = Number($tempMax.html().substring(0,2)),
    alterminTemp = Number($tempMin.html().substring(0,2));
