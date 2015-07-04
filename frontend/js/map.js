var map, pointarray, heatmap;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(error_function, error_function);
} 
else {
    window.alert('It seems like Geolocation, which is required for this page, is not enabled in your browser.');
}

//Sets the map to center on the user
function success_function(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var map_options = {
        "center": { "lat":latitude, "lng":longitude},
        "zoom" : 13

    }
    initialize(map_options);
}

// If Geolocation is unavailable sets the map to center on Gold Coast
function error_function() {
    var latitude = -27.470880;
    var longitude = 153.023082;
    var map_options = {
        "center": { "lat":latitude, "lng":longitude},
        "zoom" : 13

    }
    initialize(map_options);
}

// initialise map panel
function initialize(map_options) {
    //Testing
    map = new google.maps.Map(document.getElementById('map-canvas'),
                              map_options);
    google.maps.event.addListener(map, 'idle', function(ev) {
        update_zoom(map)
    });
}

// update the heatmap data based on current zoom level
function update_zoom() {
    var bounds = map.getBounds().toUrlValue(7).split(",");
    var json_call = ("../api/sr_data/" +
                     "?lon1=" + bounds[1] +
                     "&lat1=" + bounds[0] +
                     "&lon2=" + bounds[3] +
                     "&lat2=" + bounds[2]);

    alert(json_call);

    var data;
    var json_data;

    jQuery.getJSON('./js/crash_data.json', function(json_data) {
        data = json_data["data"];
        alert("worked");
    })

    var heatmap_data = [];

    for (var i = 0; i < data.length; i++) {
        var pos = new google.maps.LatLng(data[i]["lat"],
                                         data[i]["long"]);

        var weightedLoc = {
            location: pos,
            weight: data[i]["casualty_total"]
        };
        heatmap_data.push(weightedLoc);
    }

    var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmap_data,
        dissipating: false,
        map: map
    });
    heatmap.set('radius', 0.0005);
    heatmap.set('opacity', 0.2);
}