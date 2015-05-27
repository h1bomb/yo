/* global __dirname */
// builtin
var fs = require('fs');

var express = require('express');

//中间件
var hbs = require('hbs'); //handlebars视图插件
var bodyParser = require('body-parser'); //body序列化插件
var expressError = require('express-error'); //异常跟踪

var app = express();
var env = process.env.NODE_ENV || 'development'; //获取环境参数
var proxyRoute = require('./lib/proxyRoute');

//声明小部件目录
hbs.registerPartial('partial', fs.readFileSync(__dirname + '/views/partial.hbs', 'utf8'));
hbs.registerPartials(__dirname + '/views/partials');

//设置handlebars视图引擎
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

//body 序列化
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//静态目录
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.locals = {
        some_value: 'foo bar',
        list: ['cat', 'dog']
    };

    res.render('index');
});

/**
 * 初始化代理路由
 */
proxyRoute.init(app, null, function(err) {
    if (err) {
        throw new Error(err);
    }

    if (env == 'development') {
        app.use(expressError.express3({
            contextLinesCount: 3,
            handleUncaughtException: true,
            title: 'YOWEB'
        }));
    };

});



app.listen(3000);