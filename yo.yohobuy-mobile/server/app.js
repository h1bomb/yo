var yo = require('../../yo/index');

var app = yo({
    appPath: __dirname + '/../'
});

require('./stub/router')(app);