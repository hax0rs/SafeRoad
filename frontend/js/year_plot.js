/*
{description}
Copyright (C) 2015 UQ hax0rs

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License along
with this program; if not, write to the Free Software Foundation, Inc.,
51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
*/


var YEAR_API_PATH = "http://101.183.66.15:8000/sr_data/year/";


// Prepare Data

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

    // console.log(prepared_data);
    return(prepared_data);
}

function get_year_data (path) {
    $.getJSON(path, function( return_feed ) {
            // console.log(return_feed);
            var test1 = prepare_year_data(return_feed);
                   var ctx = document.getElementById("year_canvas").getContext("2d");
        window.myLine = new Chart(ctx).Line(test1, {
            responsive: true
        });

    });
}


var lineChartData = get_year_data(YEAR_API_PATH);




