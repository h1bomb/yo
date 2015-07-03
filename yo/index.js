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
var proxyRoute = require('./lib/proxyRoute');
var validate = require('./mid/validate'); //验证中间件
var proxy = require('./mid/proxy'); //接口代理中间件
var pjax = require('./mid/pjax'); //pjax插件
var adapter = require('./mid/adapter'); //接口数据适配中间件
var staticWare = require('./mid/static'); //设置展示环境插件
var serveSPM = require('serve-spm'); //spm调试中间件
var errorhandler = require('errorhandler'); //错误处理

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
    if (!options.spm) {
        options.spm = options.appPath + '/spm';
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
    if (!options.adapters) {
        options.adapters = options.appPath + '/server/adapters';
    }

    if (!options.envStatic) {
        options.envStatic = {
            test: {
                libs: '/dist/libs-all.js',
                js: '/dist/index-debug.js'
            },
            production: {
                libs: '/dist/libs-min.js',
                js: '/dist/index.js'
            }
        }
    }

    options.tempExt = options.tempExt || 'hbs';
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
        app.use(serveSPM(options.spm, {
            log: console.log
        }));
    }

    if (env == 'development' || env == 'test') {
        //静态目录
        app.use(express.static(options.public));
    }

    //声明小部件目录
    hbs.registerPartials(options.partials);

    //设置handlebars视图引擎
    app.set('view engine', options.tempExt);
    app.engine(options.tempExt, hbs.__express);
    app.set('views', options.views);

    //body 序列化
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));



    /**
     * 初始化代理路由
     */
    proxyRoute.init(app, options.interfaces, function(err) {
        if (err) {
            throw new Error(err);
        }
        app.use(validate);
        app.use(proxy);
        app.use(adapter(options.adapters));
        app.use(staticWare(options.envStatic));
        app.use(pjax);

        if (env == 'development') {
            errorhandler.title = 'YO';
            app.use(errorhandler());
        };

    });

    //监听应用
    app.listen(options.port);
    console.log('当前环境：' + env);
    return app;
}