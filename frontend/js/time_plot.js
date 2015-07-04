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


var test_data = {
  "description": "[{str(time),int(casualties)}]",
  "data": [
    {
      "time": 01,
      "fatality_count": 25
    },
    {
      "time": 02,
      "fatality_count": 25
    },
    {
      "time": 03,
      "fatality_count": 25
    },
    {
      "time": 04,
      "fatality_count": 5
    },
    {
      "time": 05,
      "fatality_count": 10
    },
    {
      "time": 06,
      "fatality_count": 10
    },
    {
      "time": 07,
      "fatality_count": 25
    },
    {
      "time": 08,
      "fatality_count": 25
    },
    {
      "time": 09,
      "fatality_count": 25
    },
    {
      "time": 10,
      "fatality_count": 25
    },
    {
      "time": 11,
      "fatality_count": 25
    },
    {
      "time": 12,
      "fatality_count": 25
    },
    {
      "time": 13,
      "fatality_count": 25
    },
    {
      "time": 14,
      "fatality_count": 25
    },
    {
      "time": 15,
      "fatality_count": 25
    },
    {
      "time": 16,
      "fatality_count": 25
    },
    {
      "time": 17,
      "fatality_count": 25
    },
    {
      "time": 18,
      "fatality_count": 25
    },
    {
      "time": 19,
      "fatality_count": 25
    },
    {
      "time": 20,
      "fatality_count": 25
    },
    {
      "time": 21,
      "fatality_count": 25
    },
    {
      "time": 22,
      "fatality_count": 25
    },
    {
      "time": 23,
      "fatality_count": 25
    },
    {
      "time": 24,
      "fatality_count": 25
    },
  ]
};


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
        prepared_data["labels"].push(data[i]["time"]);
        prepared_data["datasets"][0]["data"].push(data[i]["fatality_count"]);
    }

    console.log(prepared_data);
    return(prepared_data);
}

var barChartData = prepare_time_data(test_data);








