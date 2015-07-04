var map, pointarray, heatmap;

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

// initialise map panel
function initialize(mapOptions) {
    //Testing
    map = new google.maps.Map(document.getElementById('map-canvas'),
                              mapOptions);
    google.maps.event.addListener(map, 'idle', function(ev) {
        update_zoom(map)
    });
}

// update the heatmap data based on current zoom level
function update_zoom() {
    /*var marker = new google.maps.Marker({
        position: map.getCenter(),
        map: map,
        title: "Test marker"
    });*/

    var bounds = map.getBounds().toUrlValue(7).replace(",", "&");

    alert('../api/sr_data/' + bounds)

    var heatmapData = [];

    $.getJSON('../api/sr_data/' + bounds, function(data) {
        $.each(data, function(key, val) {

        })
    })

    var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        dissipating: false,
        map: map
    })
}