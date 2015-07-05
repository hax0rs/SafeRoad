var map, pointarray, heatmap;
var year = 2013;
var month = -1;
var hour = -1;

var month_to_str = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December"
}

function checkbox_onclick_function(id, value) {
    var desc = id.split("_");

    if ((desc[1] == "slider" || desc[1] == "input")) {
        // input via slider or text
        window[desc[0]] = window[desc[0]] != -1 ? value : -1;
        document.getElementById(desc[0] + "_" + (desc[1]=="input" ? "slider" : "input")).value =  value;
    } else if (desc[1] == "check") {
        // input via checkbox
        if (value == false) {
            window[desc[0]] = document.getElementById(desc[0] + "_slider").value;
        } else {
            window[desc[0]] = -1;
        }
    }
    update_zoom();
}

var MAP_API_PATH = "http://127.0.0.1:8000/sr_data/";

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

    heatmap = new google.maps.visualization.HeatmapLayer({
        data: get_heatmap_data({}),
        dissipating: true,
        radius: 10,
        opacity: 0.5,
        map: map
    });

    google.maps.event.addListener(map, 'idle', function(ev) {
        update_zoom();
    });
}

// queries for new data based on current zoom level and updates heatmap
function update_zoom() {
    var bounds = map.getBounds().toUrlValue(7).split(",");

    var json_call = (MAP_API_PATH +
                     "?lon1=" + bounds[1] +
                     "&lat1=" + bounds[0] +
                     "&lon2=" + bounds[3] +
                     "&lat2=" + bounds[2] +
                     (year != -1 ? ("&year=" + String(year)) : "") +
                     (month != -1 ? ("&month=" + month_to_str[month]) : "") +
                     (hour != -1 ? ("&hour=" + String(hour)) : ""));

    console.log(json_call);

    $.getJSON(json_call, function(d) {
        heatmap.set('data', get_heatmap_data(d["data"]));
    })
}

function get_heatmap_data(data) {
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

    return heatmap_data;
}