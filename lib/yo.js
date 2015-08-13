/*!
 * yo
 * Copyright(c) 2015 Hbomb
 * MIT Licensed
 */

'use strict';

/**
 * 模块依赖
 * @private
 */

var fs = require('fs');

var express = require('express');
var _ = require('lodash');

/**
 * 依赖中间件
 * @type {[type]}
 */

var favicon = require('serve-favicon'); //favicon
var morgan = require('morgan'); //log日志
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var cookieParser = require('cookie-parser'); //cookies
var hbs = require('hbs'); //handlebars视图插件
var bodyParser = require('body-parser'); //body序列化插件
var serveSPM = require('serve-spm'); //spm调试中间件
var errorhandler = require('errorhandler'); //错误处理

var proxyRoute = require('./proxyRoute'); //代理路由
var custMid = require('./middlewareLoader'); //自定义中间件加载

var env = process.env.NODE_ENV || 'development'; //获取环境参数

/**
 * yo的入口
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
module.exports = function(options) {

    options = procOptions(options);
    var app = initApp(options);

    /**
     * 初始化代理路由
     */
    proxyRoute.init(app, options.interfaces, function(err) {
        if (err) {
            throw new Error(err);
        }

        custMid(app, options);

        if (env === 'development') {
            errorhandler.title = 'YO';
            app.use(errorhandler());
        }

    });

    //监听应用
    app.listen(options.port);
    console.log('当前环境：' + env);
    return app;
};

/**
 * 第三方中间件加载,初始化APP
 * @param  {Object} options 传参
 * @return {void}
 */
function initApp(options) {
    var app = express();

    app.set('trust proxy', 1);

    //session中间件
    app.use(session(options.session));
    //cookies解析中间件
    app.use(cookieParser());
    //日志中间件
    app.use(morgan('combined'));
    //faviocn中间件
    app.use(favicon(options.public + '/favicon.ico'));

    //spm调试中间件
    if (env === 'development') {
        app.use(serveSPM(options.spm, {
            log: console.log
        }));
        app.use(express.static(options.public));
    } else if (env === 'test') {
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

    return app;
}

/**
 * 处理应用传参
 * @param  {Object} options 传参
 * @return {Object}         处理后的传参
 */
function procOptions(options) {
    options = options || {}; //传入的参数
    //应用的根目录
    if (!options.appPath) {
        console.error('appPath 不能为空');
        return false;
    }

    var defaultOptions = {
        spm: options.appPath + '/spm',
        partials: options.appPath + '/server/views/partials',
        views: options.appPath + '/server/views',
        public: options.appPath + '/public',
        interfaces: options.appPath + '/server/interface',
        adapters: options.appPath + '/server/adapters',
        tempExt: 'hbs',
        port: 3000,
        session: {
            secret: 'yo web app',
            resave: false,
            saveUninitialized: true
        },
        envStatic: {
            test: {
                libs: '/dist/libs-all.js',
                js: '/dist/index-debug.js'
            },
            production: {
                libs: '/dist/libs-min.js',
                js: '/dist/index.js'
            }
        }
    };
    options = _.merge(defaultOptions, options);

    if (options.seStore) {
        options.session.store = new RedisStore(options.seStore);
    }

    return options;
}