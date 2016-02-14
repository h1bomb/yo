var expect = require("expect.js");
var rewire = require("rewire");
var proxyRoute = rewire("../../lib/proxyRoute");
var mockApp = require("../mock/app");

describe('lib/proxyRoute', function() {
    describe('parseConfig', function() {
        it('如果配置是空的对象，则啥都没做', function() {
            proxyRoute.__set__('exports.interfacesConfig', {});
            expect(proxyRoute.__get__('parseConfig')()).to.be(undefined);
        });

        it('测试添加路由get：/abc，期待存在', function() {
            proxyRoute.__set__('exports.interfacesConfig', {
                abc: {
                    method: 'GET',
                    route: '/abc',
                    url: '/aa'
                }
            });
            proxyRoute.__get__('parseConfig')(mockApp);
            expect(mockApp.routes[0].method).to.be('get');
            expect(mockApp.routes[0].route).to.be('/abc');
        });
        it('测试添加路由post：/abc，期待存在', function() {
            proxyRoute.__set__('exports.interfacesConfig', {
                abc: {
                    method: 'POST',
                    url: '/aa'
                }
            });
            proxyRoute.__get__('parseConfig')(mockApp);
            expect(mockApp.routes[1].method).to.be('post');
            expect(mockApp.routes[1].route).to.be('/aa');
        });
        it('测试对请求参数预处理的结果', function() {
            var req = {
                params: {
                    'a': 123,
                    'b': 234
                },
                query: {
                    'c': 345
                },
                body: {
                    'a': 'a'
                }
            };
            mockApp.routes[0].call(req, null, function() {});

            expect(req.proxyParams.params).to.eql({
                'a': 123,
                'b': 234,
                'c': 345
            });
            expect(req.proxyParams.body).to.eql({
                'a': 'a'
            });
        });
    });

    describe('loadConfig', function() {
        it('测试解析接口路由配置，当路径不存在，期待报错', function(done) {
            proxyRoute.__get__('loadConfig')('./xxx',{}, function(err) {
                expect(err.code).to.be('ENOENT');
                done();
            });
        });

        it('接口配置参数不全，期待报错', function(done) {
            proxyRoute.__get__('loadConfig')(__dirname + '/../mock/emptyinterface',{}, function(err) {
                expect(err).to.eql(new Error('空的接口依赖'));
                done();
            })
        });

        it('接口参数正确的，期待得到正确的值', function(done) {
            proxyRoute.__get__('loadConfig')(__dirname + '/../mock/interfaces',{}, function(err) {
                var key = proxyRoute.genKey('GET', '/book/:id');
                expect(proxyRoute.interfacesConfig[key].url).to.be('/v2/book/1220562');
                done();
            });
        });

        it('接口参数配置默认属性，期待可以访问获取默认配置',function(done){
            proxyRoute.__get__('loadConfig')(__dirname + '/../mock/interfaces',{a:123,b:456,c:'haha'}, function(err) {
                var key = proxyRoute.genKey('GET', '/book/:id');
                expect(proxyRoute.interfacesConfig[key].a).to.be(123);
                expect(proxyRoute.interfacesConfig[key].b).to.be(456);
                expect(proxyRoute.interfacesConfig[key].c).to.be('haha');
                expect(proxyRoute.interfacesConfig[key].url).to.be('/v2/book/1220562');
                done();
            });
        });
    });

    describe('genKey', function() {
        it('MD5值', function() {
            expect(proxyRoute.genKey('ab', 'c')).to.be('900150983cd24fb0d6963f7d28e17f72');
        })
    });

    describe('init', function() {
        it('设置报错', function(done) {
            proxyRoute.__set__('loadConfig',function(path,dataConfig, call) {
                call(new Error('error'));
            });
            proxyRoute.init(mockApp, '',{}, function(err) {
                expect(err).to.eql(new Error('error'));
                done();
            });
        });

        it('设置没有错', function(done) {
            proxyRoute.__set__('loadConfig', function(path,dataConfig, call) {
                call();
            });
            proxyRoute.__set__('parseConfig',function(app) {});

            proxyRoute.init(mockApp, '',{}, function(err) {
                done();
            });
        });
    });
});