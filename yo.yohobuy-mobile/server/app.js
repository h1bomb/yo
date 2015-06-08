var yo = require('../../yo/index');
var staticDir = require('./staticConfig').staticDir;
var app = yo({
    appPath: __dirname + '/../',
    tempExt: 'html',
    envStatic: staticDir
});

require('./stub/routers')(app);