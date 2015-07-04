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


var API_PATH = "";

var randomScalingFactor = function(){ return Math.round(Math.random()*100)};




// Get Data

var test_data = {
  "description": "[{str(year),int(casualties)}]",
  "data": [
    {
      "year": 2001,
      "fatality_count": 1
    },
    {
      "year": 2003,
      "fatality_count": 2
    },
    {
      "year": 2004,
      "fatality_count": 3
      
    },
    {
      "year": 2005,
      "fatality_count": 4
    },
    {
      "year": 2006,
      "fatality_count": 5
    },
    {
      "year": 2007,
      "fatality_count": 6
    }
  ]
};

// Prepare Data

function prepare_year_data (jsonData) {
    var preparedData = {"labels" : [], 
                        "datasets" : [{
                            label: "My First dataset",
                            fillColor : "rgba(192,57,43,0.5)",
                            strokeColor : "rgba(220,220,220,1)",
                            pointColor : "rgba(0,0,0,1)",
                            pointStrokeColor : "#000",
                            pointHighlightFill : "#fff",
                            pointHighlightStroke : "rgba(220,220,220,1)",
                            "data" : []
    }]};

    var data = jsonData["data"];
    for (var i = 0; i < data.length; i++) {
        preparedData["labels"].push(data[i]["year"]);
        preparedData["datasets"][0]["data"].push(data[i]["fatality_count"]);
    }

    console.log(preparedData);
    return(preparedData);
}


    window.onload = function(){


var lineChartData = prepare_year_data(test_data);

// Displaying of data.
var ctx1 = document.getElementById("time_canvas").getContext("2d");
    window.myBar = new Chart(ctx1).Bar(barChartData, {
      responsive : true
    });
        var ctx = document.getElementById("year_canvas").getContext("2d");
        window.myLine = new Chart(ctx).Line(lineChartData, {
            responsive: true
        });
    };




