var $location = $('#location'),
    $temp = $('#temp'),
    $tempMax = $('#tempMax'),
    $tempMin = $('#tempMin'),
    $weatherIcon = $('#weatherIcon'),
    $weatherDesc = $('#weatherDesc'),
    $humid = $('#humid'),
    $wind = $('#wind');
    api = "http://api.openweathermap.org/data/2.5/weather\?",
    key = "&appid=979223e5411815d908c275a992b5c234";
console.log(api);
if (navigator.geolocation) {
  alert('data');
  navigator.geolocation.getCurrentPosition(useGeoData);
}else{
  alert('no data');
}
function useGeoData(position){
  alert('located!');
  var lon = position.coords.longitude;
  var lat = position.coords.latitude;
  console.log(lon);
  var apiLocator = "lat=" + lat + "&" + "lon=" + lon;
  $.getJSON(api + apiLocator + key, function (json){
    console.log(JSON.stringify(json));
    $location.html(json.name + ", " + json.sys.country);
    $temp.html(json.main.temp);
    $tempMax.html(json.main.temp_max);
    $tempMin.html(json.main.temp_min);
    $weatherIcon.html("<img src='");
    $weatherDesc.html(json.weather.description);
    $humid.html(json.main.humidity);
    $wind.html(json.wind.speed + 'm/s ' + Math.round(json.wind.deg) + "&deg;" )
  });
};
