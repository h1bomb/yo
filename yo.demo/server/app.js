var yo = require('../../yo/index');

var app = yo({
    appPath: __dirname + '/../'
});

app.get('/', function(req, res) {

    res.render('index');
});

app.get('/test', function(req, res) {
    res.send('{"title":"test"}');
});