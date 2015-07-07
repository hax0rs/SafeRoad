/**
* @fileoverview Handles functions related to plotting of hourly casualties.
* @version 1.0
* @license GNU GPL V2.0
* @copyright 2015 UQ hax0rs
*/


/**
* @description Representsfdsfasdkflkasdjflksadjfklasjdlfajlj a book.
* @since 1/1/1
* @param {string} json_time_data - 
* @returns {string} aasdfasf is what it returns
* @todo do this
* @todo do that
* @example
    * globalNS.method(5, 15);
    * // returns 3
* @requires GoogleMapsAPIV3 
*/
function prepare_time_data (json_time_data) {
    var prepared_data = {"labels" : [],
                         "datasets" : [{
                         fillColor : "rgba(192,57,43,0.5)",
                         strokeColor : "rgba(192,57,43,0.8)",
                         highlightFill : "rgba(192,57,43,0.75)",
                         highlightStroke : "rgba(192,57,43,1)",
                         "data" : []
                        }]
                    };

    var data = json_time_data["data"];

    for (var i = 0; i < data.length; i++) {
        prepared_data["labels"].push(data[i]["hour"]);
        prepared_data["datasets"][0]["data"].push(data[i]["fatality_count"]);
    }
    return(prepared_data);
}

function get_time_data (path) {
    $.getJSON(path, function( return_feed ) {
            // console.log(return_feed);
            var test = prepare_time_data(return_feed);
            var ctx1 = document.getElementById("time_canvas").getContext("2d");
    window.myBar = new Chart(ctx1).Bar(test, {
      responsive : true
    });
    });
}


var barChartData = get_time_data(HOUR_API_PATH);
