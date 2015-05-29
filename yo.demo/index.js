var yoweb;
var test = require("./lib/test");
var $ = require('jquery');
require('jquery-pjax');
test.alert();
module.exports = yoweb;

$(document).pjax('a', '#pjax-container')