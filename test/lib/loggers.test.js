var expect = require("expect.js");
var rewire = require("rewire");
var _ = require('lodash');

describe('/lib/loggers',function(){
    var loggers = rewire('../../lib/loggers');
    loggers.__set__('console',{
        log:function(){},
        error:function(){},
        info:function(){},
        warn:function(){}
    });
    loggers.__set__('winston',{
        transports : {
            Console : function(opts) {return opts;},
            File : function(opts) {return opts;}
        },Logger : function(opts) {return opts;}
    });
    loggers.__set__('mkdirp',{sync:function(path){if(!path){throw new Error('path null!');}}});
    var defaultOptions = loggers.__get__('defaultOptions');
    var configLogger = loggers.__get__('configLogger');

    describe('configLogger',function(){
        it('如果传参都是空的话，配置日志为默认配置',function(){            
            var defConfig = configLogger();
            expect(defConfig.level).to.be(defaultOptions.level);
            expect(defConfig.exitOnError).to.be(defaultOptions.exitOnError);
            expect(defConfig.transports.length).to.be(0);
            expect(defConfig.rewriters).to.be(undefined);
            expect(defConfig.filters).to.be(undefined);
        });
        it('如果设置控制台输出，配置有一个控制台的配置',function(){
            var defConfig = configLogger(null,null,{Console:{}});
            expect(defConfig.transports.length).to.be(1);
            expect(defConfig.transports[0].handleExceptions).to.be(defaultOptions.Console.handleExceptions);
            expect(defConfig.transports[0].colorize).to.be(defaultOptions.Console.colorize);
            expect(defConfig.transports[0].prettyPrint).to.be(defaultOptions.Console.prettyPrint);
        });
        it('设置文件输出，得到一个匹配的默认值',function(){
            var fileConfig1 = configLogger('/aaa',null,{});
            expect(fileConfig1.transports[0].level).to.be(undefined);
            expect(fileConfig1.transports[0].maxsize).to.be(defaultOptions.File.maxsize);
        });
        it('如果设置文件输出，level为error，得到一个匹配的level值为error',function(){
            var fileConfig = configLogger('/logs/1.log',null,{File:{level:'error'}});
            expect(fileConfig.transports.length).to.be(1);
            expect(fileConfig.transports[0].level).to.be('error');
            expect(fileConfig.transports[0].filename).to.be('/logs/1.log');
        });
        it('如果配置了exitOnError，则是配置的值',function (){
            var fileConfig = configLogger(null,null,{exitOnError:true});
            expect(fileConfig.exitOnError).to.be(true);
        });
        it('如果配置了level,是配置的值',function(){
            var config = configLogger(null,'debug');
            expect(config.level).to.be('debug');
        });
        it('如果配置了procs，则是配置的值',function(){
            var config = configLogger(null,null,null,{});
            expect(config.rewriters.length).to.be(0);
            expect(config.filters.length).to.be(0);
            var config2 = configLogger(null,null,null,{rewriters:[1,2,3]});
            expect(config2.rewriters.length).to.be(3);
        })
    });
    describe('makeLoggers',function(){
        var makeLoggers = loggers.__get__('makeLoggers');
        it('如果设置路径，transports的长度是7',function(){
            var length = 0;
            var loggers = makeLoggers('/logs/');
            _.forEach(loggers,function(v,k){
                length = length+v.transports.length;
            });
            expect(length).to.be(7);
        });
        it('如果没有配置路径，transports的长度为4',function(){
            var length = 0;
            var loggers = makeLoggers(false);
            _.forEach(loggers,function(v,k){
                length = length+v.transports.length;
            });
            expect(length).to.be(3);
        });
    });
    describe('init',function(){
        var logRet = false;
        var errorRet = false; 
        var profileRet = false;
        loggers.__set__('makeLoggers',function(){
            return {
                app:'app',
                api:'api',
                yo:{
                    log:function() {
                        logRet = true;
                    },
                    profile:function() {
                        profileRet = 'yo';
                    }
                },
                error:{
                    log:function() {
                        errorRet = true;
                    },
                    profile:function() {
                        profileRet = 'error';
                    }
                }                   
                
            };
        });

        it('期待app的日志赋值是正确的',function() {
            var app = {};
            loggers.init(app,'/logs/');
            expect(app.logger).to.be('app');
            app.yolog.log('info');
            expect(logRet).to.be(true);
            app.yolog.log('error');
            expect(errorRet).to.be(true);
            app.yolog.profile();
            expect(profileRet).to.be('yo');
            app.yolog.profile('','error');
            expect(profileRet).to.be('error');
        });
    });
});