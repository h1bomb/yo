var winston = require('winston');
var _ = require('lodash');
var util = require('./util');
var mkdirp = require('mkdirp');

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
};

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
};


/**
 * 配置日志
 * @param  {String}  path      路径
 * @param  {String}  level     日志级别
 * @param  {Object}  transConfig     配置项
 * @param {Object}   procs    日志后处理器
 * @return {Object}            日志
 */
function configLogger(path,level,transConfig,procs) {
    var trans = [],config = {},consoleOpt,fileOpt;

    //配置输出控制台的日志
    if(transConfig && transConfig.Console) {
        consoleOpt = _.merge(defaultOptions.Console,transConfig.Console);
        trans.push(new (winston.transports.Console)(consoleOpt));
    }
    //配置写文件的日志
    if(path) {
        defaultOptions.File.filename = path;
        if(transConfig && transConfig.File) {
            fileOpt = _.merge(defaultOptions.File,transConfig.File);
        } else {
            fileOpt = defaultOptions.File;
        }
        trans.push(new (winston.transports.File)(fileOpt));
    }

    //如果存在退出错误配置，进行设置
    if(transConfig && transConfig.exitOnError) {
        config.exitOnError = transConfig.exitOnError;
    } else {
        config.exitOnError = defaultOptions.exitOnError;
    }

    config.level = level?level:defaultOptions.level;
    config.transports = trans;
    if(procs) {
         config.rewriters = procs.rewriters||[];
         config.filters = procs.filters||[];
    }
   
    var logger = new (winston.Logger)(config);
    return logger;
}



/**
 * 初始化日志
 * @param  {Object} app     应用
 * @param  {String} path    路径
 */
exports.init = function(app,path){
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
    };
};

/**
 * 生成文件路径
 * @param  {String} path 文件路径
 * @return {Object}      一组日志配置
 */
function makeLoggers(path) {
    //创建日志目录，路径不存在
    if(!path) {
        console.error('path can not be null!');
    }

    //创建目录
    try {
        mkdirp.sync(path);
    } catch (err) {
        console.error(err);
        path = false;
    }
    
    //设置日志的参数
    var loggers = {};
    _.forEach(exports.config,function(v,k) {
        pathfile = path?(path+v.file):false;
        loggers[k] = configLogger(pathfile,v.level,v.trans,v.procs);
    });
    return loggers;
}