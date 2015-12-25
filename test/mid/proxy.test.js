var expect = require("expect.js");
var rewire = require("rewire");
var proxy = rewire("../../lib/mid/proxy");

describe('mid/proxy', function() {
    describe('main', function() {
        it('没有输入，期待出错的情况', function(done) {
            proxy({}, {}, function() {
                done();
            });
        });
        it('输入错误，期待出错', function(done) {
            proxy({
                input: {
                    error: true
                }
            }, {}, function() {
                done();
            });
        });
        it('多接口，期待正确调用', function(done) {
            var num = 0;
            proxy.__set__('callApi', function() {
                num++;
                if (num == 3) {
                    done();
                }
            });
            proxy({
                input: {
                    config: {
                        domain: 'zzz',
                        apis: [
                            1, 2, 3
                        ]
                    },
                    params: [1]

                }
            }, {}, function() {

            });
        });

        it('调用单接口', function(done) {
            proxy.__set__('callApi', function() {
                done();
            });
            proxy({
                input: {
                    config: {
                        domain: 'zzz'
                    },
                    params: [1]

                }
            }, {}, function() {

            });
        });

        it('如果是设置noapi=true,直接跳过',function(done){
            proxy({
                input: {
                    config: {
                        domain: 'zzz',
                        noApi : true
                    },
                    params: [1]
                }
            }, {}, function() {
                done();
            });
        });
    });
    describe('procRet', function() {
        it('处理结果，如果接口数大于1设置接口字典对象', function() {
            var params = {
                apiNum: 3,
                api: {
                    method: 'get',
                    url: 'a'
                },
                domain: 'xxx',
                body: '{}',
                res: {},
                next: function() {}
            }
            proxy.__get__('procRet')(params);
            expect(params.res.proxyData).to.have.property('getxxxa');
            expect(proxy.__get__('count')).to.be(1);
        });
        it('如果接口数和调用次数相同，期待被next回调', function(done) {
            proxy.__set__('count', 0);
            var params = {
                apiNum: 1,
                api: {
                    method: 'get',
                    url: 'a'
                },
                domain: 'xxx',
                body: '{}',
                res: {},
                next: function() {
                    done();
                }
            }
            proxy.__get__('procRet')(params);
        });
    });

    describe('callApi', function() {
        it('如果没有加载cache中间件，则直接调用server', function(done) {
            var proxy = rewire("../../lib/mid/proxy");
            var params = {
                res: {}
            };
            proxy.__set__("callServer", function() {
                done();
            })
            proxy.__get__("callApi")(params);
        });

        it('如果有cache中间件,获取cache没有错误', function(done) {
            var params = {
                res: {
                    genKey: function(a, b, c) {
                        return a + b + c;
                    },
                    getCache: function(key, callback) {
                        callback(null, true);
                    }
                },
                domain: 'xxx',
                api: {
                    url: 'xxx'
                },
                params: {

                }
            };

            var proxy = rewire("../../lib/mid/proxy");
            proxy.__set__('procRet', function() {
                expect(params.body).to.be(true);
                done();
            });
            proxy.__get__('callApi')(params);
        });
        it('如果有cache中间件，获取不到cache，没有错误', function(done) {
            var params = {
                res: {
                    genKey: function(a, b, c) {
                        return a + b + c;
                    },
                    getCache: function(key, callback) {
                        callback(true);
                    }
                },
                domain: 'xxx',
                api: {
                    url: 'xxx'
                },
                params: {

                }
            };

            var proxy = rewire("../../lib/mid/proxy");
            proxy.__set__('callServer', function() {
                done();
            });
            proxy.__get__('callApi')(params);
        });


    });
    describe('callServer', function() {
        it('请求返回失败，没有response，期待异常', function(done) {
            var proxy = rewire("../../lib/mid/proxy");
            proxy.__set__('request', function(options, callback) {
                callback(true, null, null);
            });
            var callServer = proxy.__get__('callServer');

            callServer({
                domain: 'xxx',
                api: {
                    url: 'xxx',
                    method: 'get'
                },
                params: {},
                next: function(error) {
                    expect(error).to.eql(new Error('api server error!'));
                    done();
                }
            });
        });

        it('请求返回失败，有response，期待异常', function(done) {
            var proxy = rewire("../../lib/mid/proxy");
            proxy.__set__('request', function(options, callback) {
                callback(true, {
                    'statusCode': 500
                }, null);
            });

            var callServer = proxy.__get__('callServer');

            callServer({
                domain: 'xxx',
                api: {
                    url: 'xxx',
                    method: 'get'
                },
                params: {},
                next: function(error) {
                    expect(error).to.eql(new Error('error: 500'));
                    done();
                }
            });

        });
        it('请求返回成功，有使用缓存，期待设置缓存并设置结果', function(done) {
            var proxy = rewire("../../lib/mid/proxy");
            proxy.__set__('request', function(options, callback) {
                callback(false, {
                    'statusCode': 200
                }, {});
            });
            proxy.__set__('procRet', function(params) {
                expect(params.body).to.eql({});
                done();
            });

            var callServer = proxy.__get__('callServer');

            callServer({
                domain: 'xxx',
                api: {
                    url: 'xxx',
                    method: 'get'
                },
                res: {
                    setCache: function() {

                    },
                    genKey: function() {
                        return 'key';
                    }
                },
                params: {},
                next: function() {

                }
            });
        });
    })

});