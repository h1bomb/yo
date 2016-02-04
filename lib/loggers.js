var winston = require('winston');
var _ = require('lodash');
var util = require('./util');

/**
 * 默认配置
 * @type {Object}
 */
var defaultOptions = {
    Console: {
        handleExceptions:true,
        colorize: 'all',
        prettyPrint:true
    },
    File:{
        maxsize:50*1024*1024
    },
    exitOnError:false,
    level:'verbose'
}  

/**
 * 日志默认配置
 * @type {Object}
 */
exports.config = {
    api: {
        file:'yo-api.log',
        level:'info',
        trans: {
            Console: {
                handleExceptions:false
            }
        }
    },
    yo: {
        file:'yo.log',
        level:'info',
        trans: {
            Console:{
                handleExceptions:true
            }
        }
    },
    error: {
        file: 'yo-err.log',
        level:'error',
        trans: {
             File:{
                handleExceptions:true
             }
        }
    },
    app: {
        file: 'app.log',
        level:'info',
        trans: {
            Console: {
                handleExceptions:false
            },
            File: {
                handleExceptions:false
            }
        }
    }
}

/**
 * 配置日志
 * @param  {String}  path      路径
 * @param  {String}  level     日志级别
 * @param  {Object}  options   配置项
 * @return {Object}            日志
 */
function configLogger(path,level,options) {
    var trans = [],config = {},consoleOpt,fileOpt;

    //配置输出控制台的日志
    if(options && options.Console) {
        consoleOpt = _.merge(defaultOptions.Console,options.Console);
        trans.push(new (winston.transports.Console)(consoleOpt));
    }
    //配置写文件的日志
    if(path) {
        defaultOptions.File.filename = path;
        if(options && options.File) {
            fileOpt = _.merge(defaultOptions.File,options.File);
        } else {
            fileOpt = defaultOptions.File;
        }
        trans.push(new (winston.transports.File)(fileOpt));
    }

    //如果存在退出错误配置，进行设置
    if(options && options.exitOnError) {
        config.exitOnError = options.exitOnError;
    } else {
        config.exitOnError = defaultOptions.exitOnError;
    }

    config.level = level?level:'info';
    config.transports = trans;
    
    var logger = new (winston.Logger)(config);
    return logger;
}



/**
 * 初始化日志
 * @param  {Object} app     应用
 * @param  {String} path    路径
 * @param  {Object} options 配置
 */
exports.init = function(app,path,options){
    var loggers = makeLoggers(path);

    app.logger = loggers.app;//应用的日志记录
    
    app.yolog = {
        log:function() {
            loggers.yo.log.apply(loggers.yo,arguments);//yo框架的日志记录
            if(arguments[0] === 'error') {
                loggers.error.log.apply(loggers.error,arguments);//错误的日志记录
            }
        },
        profile:function(message,type) {
            type = type||'yo';
            loggers[type].profile(message);
        },
        api:loggers.api//api的日志记录
    }
}

/**
 * 生成文件路径
 * @param  {String} path 文件路径
 * @return {Object}      一组日志配置
 */
function makeLoggers(path) {
    //创建日志目录
    if(!path||!util.mkdirsSync(path)) {
        console.error('log mkdir failed!');
        path = false;
    }
    var loggers = {};
    _.forEach(exports.config,function(v,k){
        pathfile = path?(path+v.file):false;
        loggers[k] = configLogger(pathfile,v.level,v.trans);
    });
    return loggers;
}