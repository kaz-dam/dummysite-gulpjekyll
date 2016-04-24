///////////////////
// Entry point for Browserify. It'll create the bundle.js from this file.
///////////////////

var Myobject = require('./classes/Myobject');
var templates = require('./classes/templates');
var logger = require('./classes/logger');
var anotherLogger = require('./classes/anotherLogger');

var myobject = new Myobject();