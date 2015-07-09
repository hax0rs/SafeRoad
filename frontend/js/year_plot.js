/**
* @fileoverview Handles plotting and further processing of year related data.
* @version 1.0
* @license GNU GPL V2.0
* @copyright 2015 UQ hax0rs
*/



/**
* @description Prepares year JSON feed from the server in JSChart format.
* @param {string} json_data - JSON feed from the server
* @returns {object} Returns data prepared for JSChart plotting.
* @todo Add provisions for plotting of multiple charts simulatenously
* @requires ChartJS
*/
function prepare_year_data (json_data) {
    var prepared_data = {"labels" : [],
                        "datasets" : [{
                            label: "My First dataset",
                            fillColor : "rgba(192,57,43,0.5)",
                            strokeColor : "rgba(192,57,43,0.8)",
                            pointColor : "rgba(192,57,43,1)",
                            pointStrokeColor : "rgba(192,57,43,1)",
                            pointHighlightFill : "rgba(152,17,03,1)",
                            pointHighlightStroke : "rgba(152,17,03,1)",
                            "data" : []
    }]};

    var data = json_data["data"];
    for (var i = 0; i < data.length; i++) {
        prepared_data["labels"].push(data[i]["year"]);
        prepared_data["datasets"][0]["data"].push(data[i]["fatality_count"]);
    }

    return(prepared_data);
}

/**
* @description Loads and plots the data.
* @param {string} path - URL to the API data
* @returns {None}
* @todo Implement error handling.
* @requires ChartJS
*/
function get_year_data (path) {
    $.getJSON(path, function( return_feed ) {
            var test1 = prepare_year_data(return_feed);
                   var ctx = document.getElementById("year_canvas").getContext("2d");
        window.myLine = new Chart(ctx).Line(test1, {
            responsive: true
        });

    });
}


var lineChartData = get_year_data(YEAR_API_PATH);