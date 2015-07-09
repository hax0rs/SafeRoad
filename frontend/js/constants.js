/**
* @fileoverview Common settings and constants for SafeRoad frontend.
* @version 1.0
* @license GNU GPL V2.0
* @copyright 2015 UQ hax0rs
*/

/** 
* @constant
* @type {string}
* @default
* @description Holds the path to API for access to heatmap data
*/
var MAP_API_PATH = "http://127.0.0.1:8000/sr_data/";

/** 
* @constant
* @type {string}
* @default
* @description API base patrh for accessing year data
*/
var YEAR_API_PATH = "http://127.0.0.1:8000/sr_data/year/";

/** 
* @constant
* @type {string}
* @default
* @description API Base Path for accessing hour data
*/
var HOUR_API_PATH = "http://127.0.0.1:8000/sr_data/hour/";

/** 
* @constant
* @type {dictionary}
* @example
 * // value = "January"
 * value = MONTH_TO_STR[1]
* @description MONTH_TO_STR allows the translation of month numbers to names.
*/
var MONTH_TO_STR = {
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
};


