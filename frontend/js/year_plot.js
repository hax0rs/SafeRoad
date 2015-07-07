/**
* @fileoverview Handles plotting and further processing of year related data.
* @version 1.0
* @license GNU GPL V2.0
* @copyright 2015 UQ hax0rs
*/



/**
* @description Prepares a JSON feed 
* @param {string} id - 
* @param {string} value -
* @returns {None} 
* @todo do this
* @todo do that
* @example
    * globalNS.method(5, 15);
    * // returns 3
* @requires jQuery-1.11.3
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
* @description Represents a book.
* @param {string} path - 
* @returns {None} test
* @todo do this
* @todo do that
* @example
    * globalNS.method(5, 15);
    * // returns 3
* @requires jQuery
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




