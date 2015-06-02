var yo = require('../../yo/index');

var app = yo({
    appPath: __dirname + '/../',
    tempExt: 'html'
});

require('./stub/routers')(app);