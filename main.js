var NEW_API_URL = 'http://api.wunderground.com/api/d322a0e45a4ce22e/conditions/q/';
var TENDAY_API_URL = 'http://api.wunderground.com/api/d322a0e45a4ce22e/forecast10day/q/'
  
var zipButton = document.querySelector('.zip');

zipButton.onclick = function () {
  
var zip = document.querySelector("#yourZip").value;
    console.log(zip);
  
  getJSON(NEW_API_URL + zip + '.json', function (data) {
    var span = document.querySelector('span.temp');
    console.log(data.current_observation)
    span.innerHTML = data.current_observation.temp_f;
  });
};

var locationButton = document.querySelector('.location')

locationButton.onclick = function () {
  
  var location = document.querySelector("#yourCity").value;
  
 navigator.geolocation.getCurrentPosition(function(location){
  var lat = location.coords.latitude;
  var long = location.coords.longitude;
    console.log(lat);
});
  
  getJSON(NEW_API_URL + location + '.json', function (data) {
    var span = document.querySelector('span.temp');
    span.innerHTML = data.current_observation.temp_f;
  });
};

zipButton.onclick = function () {
 var input = document.querySelector("#yourZip");
 var zipcode = input.value;
  getJSON(TENDAY_API_URL + zipcode + '.json', function (data) {
   var td = document.querySelectorAll('td');
   var th = document.querySelectorAll('th');
    
   for( i = 0 ; i < 5; i++){
      var high = data.forecast.simpleforecast.forecastday[i].high.fahrenheit;
      var low = data.forecast.simpleforecast.forecastday[i].low.fahrenheit;
      var weekday = data.forecast.simpleforecast.forecastday[i].date.weekday;
       console.log(weekday);

         td[i].innerHTML = high + '/' + low; 
         th[i].innerHTML = weekday;
   }
  });
}

// Start of top form //

var API_URL = 'http://api.wunderground.com/api/d322a0e45a4ce22e/conditions/q/37201.json';

   getJSON(API_URL, function (data) {
     var span = document.querySelector('span.temp');
     
     span.innerHTML = data.current_observation.temp_f; 
   });

   getJSON(API_URL, function (data) {
      var span = document.querySelector('span.weather');
     
     span.innerHTML = data.current_observation.weather; 
   });

 /*  getJSON(API_URL, function (data) {
      var span = document.querySelector('span.feels');
     
     span.innerHTML = data.current_observation.feelslike_f; 
   }); */


function getJSON(url, cb) {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', url);
  xhr.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      cb(JSON.parse(this.response));
     }
    };

    xhr.send();
}