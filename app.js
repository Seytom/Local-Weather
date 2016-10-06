//This app provides current report of local weather.
//The site used for the information is worldweatheronline.com.
//
//There are two http requests here, the second nested in the first. The first gets the
//IP address of the client. Once that is done, the success/callback function makes a request
//for the current weather conditions of the client's IP address, then posts the results onto
//the page. The responses are formatted in json. I've nested them to avoid  issues with the
//asynchronous nature of the response. 

var city_state = document.getElementById("city");  //use a little javascript; not everything has to be JQuery.
var myIP=null;

$.get("http://ipinfo.io", function(response) {
  city_state.innerHTML = response.city + ", " + response.region;
  myIP = response.ip;
  //Now the second http request is made
  $.get("http:/\/api.worldweatheronline.com/free/v2/weather.ashx?key=4e2b71c8cfa4278f7804ac98f8925&q=" + myIP + "&num_of_days=1&tp=3&format=json", function(weatherResponse) {
    //second success/callback function. Update the website with the current weather data
    $("#temp").append("<img src='" + weatherResponse.data.current_condition[0].weatherIconUrl[0].value + "'>" + " " + weatherResponse.data.current_condition[0].temp_F + " F");
    $("#wind").append(weatherResponse.data.current_condition[0].winddir16Point + " " + weatherResponse.data.current_condition[0].windspeedMiles + " mph");
    $("#condition").append(weatherResponse.data.current_condition[0].weatherDesc[0].value);  
  }, "json");  
}, "json");

