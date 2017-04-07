var $location = document.getElementById('location'),
    $temp = document.getElementById('temp'),
    $tempMax = document.getElementById('tempMax'),
    $tempMin = document.getElementById('tempMin'),
    $weatherIcon = document.getElementById('weatherIcon'),
    $weatherDesc = document.getElementById('weatherDesc'),
    $humid = document.getElementById('humid'),
    $wind = document.getElementById('#wind'),
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
  alert(lon);
  var apiLocator = "lat=" + lat + "&" + "lon=" + lon;
  $.getJSON(api + apiLocator + key, function (json){
    alert(JSON.stringify(json));
    alert('SIPHO');
    $location.innerHTML = json.name + ", " + json.sys.country;
    $temp.innerHTML = json.main.temp;
    $tempMax.innerHTML = json.main.temp_max;
    $tempMin.innerHTML = json.main.temp_min;
    $weatherIcon.innerHTML = "<img src='";
    $weatherDesc.innerHTML = json.weather.description;
    $humid.innerHTML = json.main.humidity;
    $wind.innerHTML = json.wind.speed + 'm/s ' + Math.round(json.wind.deg) + "&deg;" ;
  });
};
