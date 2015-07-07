/**
* @fileoverview Handles display of Google Maps widget
* @version 1.0
* @license GNU GPL V2.0
*/

/**
 * @description Google Maps API main object.
 * @global
 */
var MAP;

/**
 * @description Stores point data for the heatmap.
 * @global
 */
var HEATMAP;



var year = 2013;
var month = -1;
var hour = -1;

/**
* @description Checkbox click
*/
function checkbox_onclick_function(id, value) {
    var desc = id.split("_");

    if ((desc[1] == "slider" || desc[1] == "input")) {
        // input via slider or text
        window[desc[0]] = window[desc[0]] != -1 ? value : -1;
        document.getElementById(desc[0] + "_" + (desc[1]=="input" ? "slider" : "input")).value =  value;
    } else if (desc[1] == "check") {
        // input via checkbox
        if (value === false) {
            window[desc[0]] = document.getElementById(desc[0] + "_slider").value;
        } else {
            window[desc[0]] = -1;
        }
    }
    update_zoom();
}



/**
 * @description Sets the map to center on the user.
 */
function success_function(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var map_options = {
        "center": { "lat":latitude, "lng":longitude},
        "zoom" : 13

    };
    initialize(map_options);
}

/**
* @description If Geolocation is unavailable sets the map to center on Gold Coast.
*/
function error_function() {
    var latitude = -27.470880;
    var longitude = 153.023082;
    var map_options = {
        "center": { "lat":latitude, "lng":longitude},
        "zoom" : 13
    };
    initialize(map_options);
}

/**
* @description Initialise map panel.
*/
function initialize(map_options) {
    //Testing
    MAP = new google.maps.Map(document.getElementById('map-canvas'),
                              map_options);

    HEATMAP = new google.maps.visualization.HeatmapLayer({
        data: get_heatmap_data({}),
        dissipating: true,
        radius: 5,
        opacity: 0.5,
        map: MAP
    });

    google.maps.event.addListener(MAP, 'idle', function(ev) {
        update_zoom();
    });
}

/**
* @description Queries for new data based on current zoom level and updates heatmap.
*/
function update_zoom() {
    var bounds = MAP.getBounds().toUrlValue(7).split(",");

    var json_call = (MAP_API_PATH +
                     "?lon1=" + bounds[1] +
                     "&lat1=" + bounds[0] +
                     "&lon2=" + bounds[3] +
                     "&lat2=" + bounds[2] +
                     (year != -1 ? ("&year=" + String(year)) : "") +
                     (month != -1 ? ("&month=" + MONTH_TO_STR[month]) : "") +
                     (hour != -1 ? ("&hour=" + String(hour)) : ""));


    $.getJSON(json_call, function(d) {
        HEATMAP.set('data', get_heatmap_data(d["data"]));
    });
}


/**
* 
*/
function get_heatmap_data(data) {
    var heatmap_data = [];
    console.log(data.length);
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



if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(error_function, error_function);
} 
else {
    window.alert('It seems like Geolocation, which is required for this page, is not enabled in your browser.');
}