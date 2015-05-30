var yoweb;
var $ = require('jquery');
var NProgress = require('nprogress');
require('jquery-pjax');
module.exports = yoweb;

$(document).pjax('a', '#pjax-container');
$(document).on('pjax:start', function() {
    NProgress.start();
});
$(document).on('pjax:end', function() {
    NProgress.done();
});