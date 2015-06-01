var fs = require('fs');

var express = require('express');
var env = process.env.NODE_ENV || 'development'; //获取环境参数

//中间件
var favicon = require('serve-favicon'); //favicon
var morgan = require('morgan'); //log日志
var session = require('cookie-session'); //session
var cookieParser = require('cookie-parser') //cookies
var hbs = require('hbs'); //handlebars视图插件
var bodyParser = require('body-parser'); //body序列化插件
var expressError = require('express-error'); //异常跟踪
var proxyRoute = require('./lib/proxyRoute');
var validate = require('./mid/validate'); //验证中间件
var proxy = require('./mid/proxy'); //接口代理中间件
var pjax = require('./mid/pjax'); //pjax插件
var serveSPM = require('serve-spm'); //spm调试中间件


/**
 * yo的入口
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
module.exports = function yo(options) {
    options = options || {}; //传入的参数
    //应用的根目录
    if (!options.appPath) {
        console.error('appPath 不能为空');
        return;
    }

    if (!options.partials) {
        options.partials = options.appPath + '/server/views/partials';
    }
    if (!options.views) {
        options.views = options.appPath + '/server/views';
    }
    if (!options.public) {
        options.public = options.appPath + '/public';
    }
    if (!options.interfaces) {
        options.interfaces = options.appPath + '/server/interface'
    }
    options.port = options.port || 3000;

    var app = express();

    app.set('trust proxy', 1);

    //session中间件
    app.use(session({
        keys: ['yo:secc']
    }));

    //cookies解析中间件
    app.use(cookieParser());

    //日志中间件
    app.use(morgan('combined'));

    //faviocn中间件
    app.use(favicon(options.public + '/favicon.ico'));

    //spm调试中间件
    if (env == 'development') {
        app.use(serveSPM(options.appPath, {
            log: console.log
        }));
    }

    //声明小部件目录
    hbs.registerPartials(options.partials);

    //设置handlebars视图引擎
    app.set('view engine', 'hbs');
    app.set('views', options.views);

    //body 序列化
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    //静态目录
    app.use(express.static(options.public));


    /**
     * 初始化代理路由
     */
    proxyRoute.init(app, options.interfaces, function(err) {
        if (err) {
            throw new Error(err);
        }
        app.use(validate);
        app.use(proxy);
        app.use(pjax);

        if (env == 'development') {
            app.use(expressError.express3({
                contextLinesCount: 3,
                handleUncaughtException: true,
                title: 'YO!'
            }));
        };

    });

    //监听应用
    app.listen(options.port);
    return app;
}