var expect = require("expect.js");
var rewire = require("rewire");
var appMock = require('../mock/app');
describe('/lib/yo', function() {
    describe('yo 主文件', function() {
        var yo = rewire("../../lib/yo");
        yo.__set__('procOptions', function() {
            return {
                message:'',
                value: {
                    interfaces: '1',
                    port: 3000
                }
            }
        });
        yo.__set__('initApp', function() {
            return appMock;
        });
        it('如果初始化路由出错', function() {
            yo.__set__('proxyRoute', {
                init: function(a, b, callback) {
                    callback('error');
                }
            });
            try {
                yo({});
            } catch (err) {
                expect(err).to.eql(new Error('error'));
            }
        });

        it('配置正确，期待返回APP', function() {
            yo.__set__('custMid', function() {

            });
            yo.__set__('env', 'development');
            yo.__set__('expressDebug', function() {});
            yo.__set__('errorhandler', function() {

            });
            yo.__set__('proxyRoute', {
                init: function(a, b, c,callback) {
                    callback();
                }
            });
            expect(yo({}).listen()).to.be(3000);
        });
    });
    describe('initApp', function() {
        var yo = rewire("../../lib/yo");
        it('当是开发环境，期待加载8个中间件，测试环境，7个', function() {
            var arr = [];
            appMock.use = function(obj) {
                arr.push(obj);
            };
            yo.__set__('express.static', function() {});
            yo.__set__('session', function() {});
            yo.__set__('favicon', function() {});
            var initApp = yo.__get__('initApp');
            yo.__set__('env', 'development');
            initApp({
                session: {
                    secret: 'yo web app',
                    resave: false,
                    saveUninitialized: true
                },
                public: '',
                spm: '/',
                partials: '/',
                tempExt: 'hbs',
                views: '/'
            },appMock);
            expect(arr.length).to.be(8);
            arr = [];
            yo.__set__('env', 'test');
            initApp({
                session: {
                    secret: 'yo web app',
                    resave: false,
                    saveUninitialized: true
                },
                public: '',
                spm: '/',
                partials: '/',
                tempExt: 'hbs',
                views: '/'
            },appMock);
            expect(arr.length).to.be(7);
        });
    });
    describe('procOptions', function() {
        it('如果appPath是空的，返回 false', function() {
            var yo = rewire("../../lib/yo");
            var procOptions = yo.__get__('procOptions');
            expect(procOptions({}).value).to.be(false);
        });

        it('appPath不为空，并设置store', function() {
            var yo = rewire("../../lib/yo");
            var procOptions = yo.__get__('procOptions');
            yo.__set__("RedisStore", function() {
                return {}
            });
            var ret = procOptions({
                seStore: {},
                appPath: '/'
            });
            expect(ret.value.session.store).to.eql({});
        });
    });
});