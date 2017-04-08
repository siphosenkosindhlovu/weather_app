var $location = $('#location'),
    $temp = $('#temp'),
    $tempMax = $('#tempMax'),
    $tempMin = $('#tempMin'),
    $weatherIcon = $('#weatherIcon'),
    $weatherMain = $('#weatherMain'),
    $weatherDesc = $('#weatherDesc'),
    $humid = $('#humid'),
    $wind = $('#wind'),
    $displayContent = $('#displayContent'),
    $loader = $('#loader'),
    api = "http://api.openweathermap.org/data/2.5/weather\?",
    key = "&appid=979223e5411815d908c275a992b5c234",
    units = "&units=metric";
console.log(api);
if (navigator.geolocation) {
  console.log('data');
  navigator.geolocation.getCurrentPosition(useGeoData);
}else{
  console.log('no data');
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
  $location.html(json.name + ", " + json.sys.country);
  $temp.html(Math.round(json.main.temp) + '<i class="wi wi-celsius"></i>');
  $tempMax.html(Math.round(json.main.temp_max) + '<i class="wi wi-celsius"></i>');
  $tempMin.html(Math.round(json.main.temp_min) + '<i class="wi wi-celsius"></i>');
  $weatherIcon.html("<img src='http://openweathermap.org/img/w/" +json.weather[0].icon + ".png'>");
  $weatherMain.html(json.weather[0].main + '<br>');
  $weatherDesc.html(json.weather[0].description);
  $humid.html(json.main.humidity);
  $wind.html("<i class='wi wi-wind towards-" + Math.round(json.wind.deg) + "-deg'></i> " + json.wind.speed + 'm/s ');
  $displayContent.css('display', 'block');
  $loader.css('display', 'none');
}
