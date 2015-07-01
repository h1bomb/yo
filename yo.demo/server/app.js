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

app.get('/test2', function(req, res) {
    var i = 0;

    function end() {
        if (i == 2) {
            res.end();
        }
    }
    res.write('<h1>1</h1>');
    setTimeout(function() {
        res.write('<h1>2</h1>');
        i++;
        end()
    }, 2000);
    setTimeout(function() {
        res.write('<h1>3</h1>');
        i++;
        end()
    }, 1000);
});