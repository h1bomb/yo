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
var path = require('path');
var loggers = require('./loggers');
var p = require('path');

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

//返回到调用App
var middlewares = {
    favicon:favicon,
    morgan:morgan,
    session:session,
    cookieParser:cookieParser, 
    hbs:hbs,
    bodyParser:bodyParser,
    serveSPM:serveSPM,
    errorhandler:errorhandler
};

var proxyRoute = require('./proxyRoute'); //代理路由
var custMid = require('./middlewareLoader'); //自定义中间件加载

var env = process.env.NODE_ENV || 'development'; //获取环境参数
var expressDebug = require('express-debuger'); //express debug工具

/**
 * yo的入口
 * @param  {Object} options 配置入口
 * @return {Object}         Express App
 */
module.exports = function(options) {
    env = _.trim(env);
    process.env.NODE_ENV = env;
    options = procOptions(options);
    var app = express();
    //合并日志配置，初始化日志配置
    if(options.value.loggers) {
        loggers.config = _.merge(loggers.config,options.value.loggers);
    }
    loggers.init(app,options.value.logsFile,options.value.logConfig);

    if(options.value === false) {
        app.yolog.log('error',options.message);
        return app;
    }


    options = options.value;
    app = initApp(options,app);
    /**
     * 初始化代理路由
     */
    var defaultInferfaceConfig = options.interfaceDefConfig||{};
    proxyRoute.init(app, options.interfaces, defaultInferfaceConfig,function(err) {
        if (err) {
            throw new Error(err);
        }

        //在自定义中间件之前使用中间件
        if(options.beforeCustMid) {
            options.beforeCustMid(app,proxyRoute);
        }
        custMid(app, options);

        if (env === 'development') {
            errorhandler.title = 'YO';
            expressDebug(app);
            app.use(errorhandler());
        }


    });

    //监听应用
    app.listen(options.port);
    app.yolog.log('info','app is started：%s, port：%s',env,options.port);
    return app;
};

/**
 * 第三方中间件加载,初始化APP
 * @param  {Object} options 传参
 * @param {Obejct} app express应用
 * @return {void}
 */
function initApp(options,app) {    
    app.set('trust proxy', 1);

    //在中间件之前使用中间件
    if(options.beforeMid) {
        options.beforeMid(app,middlewares);
    }

    //session中间件
    app.use(session(options.session));
    //cookies解析中间件
    app.use(cookieParser());
    //日志中间件
    app.use(morgan('combined'));
    //faviocn中间件
    app.use(favicon(options.public +path.sep+'favicon.ico'));
    //spm调试中间件
    if (env === 'development') {
        app.use(serveSPM(options.client, {
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
 * @return {Object}    处理后的传参
 */
function procOptions(options) {
    options = options || {}; //传入的参数
    //应用的根目录
    if (!options.appPath) {
        return {
            message:'appPath can not be null!',
            value:false
        };
    }
    var defaultOptions = {
        client: path.normalize(options.appPath + '/client'),
        partials: path.normalize(options.appPath + '/server/views/partials'),
        views: path.normalize(options.appPath + '/server/views'),
        public: path.normalize(options.appPath + '/public'),
        interfaces: path.normalize(options.appPath + '/server/interface'),
        adapters: path.normalize(options.appPath + '/server/adapters'),
        logsFile: path.normalize(options.appPath + '/logs/'),
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

    return {
        error:false,
        value:options
    };
}