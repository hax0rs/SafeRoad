if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
} 
else {
    window.alert('It seems like Geolocation, which is required for this page, is not enabled in your browser.');
}

//Sets the map to center on the user
function successFunction(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var mapOptions = {
        "center": { "lat":latitude, "lng":longitude},
        "zoom" : 10

    }
    initialize(mapOptions);
}

// If Geolocation is unavailable sets the map to center on Gold Coast
function errorFunction() {
    var latitude = -27.470880;
    var longitude = 153.023082;
    var mapOptions = {
        "center": { "lat":latitude, "lng":longitude},
        "zoom" : 10

    }
    initialize(mapOptions);
}

function initialize(mapOptions) {
  //Testing
var map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);

  $.getJSON('api/location.php', function(data) {
    $.each(data, function(key, val) {
      newMapMarker(map, val);
    });
  });
}