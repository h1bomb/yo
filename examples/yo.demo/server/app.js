var yo = require('../../../index');

var app = yo({
    appPath: __dirname + '/../',
    loggers:{
        app:{
            level:'info'
        }
    },
    interfaceDefConfig:{
        test:true
    },
    limitReq:{
        timeout:5000
    },
    bodyLimit:'5000kb'
});

app.get('/', function(req, res) {

    res.render('index', function(err, str) {
        res.send(str);
    });

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
        end();
    }, 2000);
    setTimeout(function() {
        res.write('<h1>3</h1>');
        i++;
        end();
    }, 1000);
});