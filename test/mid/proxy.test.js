var expect = require("expect.js");
var rewire = require("rewire");
var proxy = rewire("../../lib/mid/proxy");
var reqMock = require("../mock/req");

describe('mid/proxy', function() {
    describe('main', function() {
        it('没有输入，期待出错的情况', function(done) {
            proxy({}, {}, function() {
                done();
            });
        });
        it('输入错误，期待出错', function(done) {
            var req = reqMock({
                input:{error:true}
            });
            proxy(req, {}, function() {
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
            var req = reqMock({
                input: {
                    config: {
                        domain: 'zzz',
                        apis: {1:1,2:{},3:{domain:'a'}}
                    },
                    params: [1]

                }
            });
            proxy(req, {}, function() {

            });
        });

        it('调用单接口', function(done) {
            var proxy = rewire("../../lib/mid/proxy");
            proxy.__set__('callApi', function() {
                done();
            });
            var req = reqMock({input: {
                    config: {
                        domain: 'zzz'
                    },
                    params: [1]

                }});
            proxy(req, {}, function() {

            });
        });

        it('如果没有设置URL,设置了获取在res.proxyData',function(){
            var res = {};
            var req = reqMock({input: {
                    config: {
                        domain: 'zzz',
                        data:1
                    },
                    params: [1]
                }});
            proxy(req, res, function() {
                expect(res.proxyData).to.be(1);
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
                req:reqMock({apiCount:0,apiRet:{},input:{config:{data:{}}}}),
                next: function() {}
            }
            proxy.__get__('procRet')(params,'aaa');
            expect(params.res.proxyData).to.have.property('aaa');
            expect(params.req.apiCount).to.be(1);
            params.req.input.config.data = false;
            proxy.__get__('procRet')(params,'aaa');
            expect(params.res.proxyData).to.have.property('aaa');
        });
        it('如果接口数和调用次数相同，期待被next回调', function(done) {
            var params = {
                apiNum: 1,
                api: {
                    method: 'get',
                    url: 'a'
                },
                domain: 'xxx',
                body: '{}',
                res: {},
                req:reqMock({apiCount:0,apiRet:{},input:{config:{data:{}}}}),
                next: function() {
                    done();
                }
            }
            proxy.__get__('procRet')(params);
        });

        it('如果返回值不是JSON格式，期待返回空对象',function(done){
            proxy.__set__('count', 0);
            var params = {
                apiNum: 1,
                domain: 'xxx',
                body: 'xxx',
                res: {},
                req:reqMock({apiCount:0,apiRet:{},input:{config:{data:{}}}}),
                next: function() {
                    expect(params.res.proxyData).to.eql({});
                    done();
                }
            };
            proxy.__get__('procRet')(params);
        });

        it('如果没有调用接口，不对body做JSON序列化',function(done){
            proxy.__set__('count', 0);
            var params = {
                apiNum: 1,
                domain: 'xxx',
                res: {},
                req:reqMock({apiCount:0,apiRet:{},input:{config:{data:{"a":1}}}}),
                next: function() {
                    expect(params.res.proxyData).to.eql({"a":1});
                    done();
                }
            };
            proxy.__get__('procRet')(params);
        });
    });

    describe('callApi', function() {
        it('如果没有设置URL,直接返回',function(done){
            var proxy = rewire("../../lib/mid/proxy");
            proxy.__set__('procRet', function() {
                done();
            });
            var params = {
                res: {},
                api:{},
                req:reqMock({input:{config:{data:{}}}}),
            };
            proxy.__get__("callApi")(params);
        });

        it('如果没有加载cache中间件，则直接调用server', function(done) {
            var proxy = rewire("../../lib/mid/proxy");
            var params = {
                res: {},
                api:{url:'/asda'},
                req:reqMock({input:{config:{data:{}}}})
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
                    url: 'xxx',
                    cache:100
                },
                req:reqMock({input:{config:{data:{}}}}),
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
                req:reqMock({input:{config:{data:{}}}}),
                domain: 'xxx',
                api: {
                    url: 'xxx',
                    cache:100
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
            var params = {
                domain: 'xxx',
                api: {
                    url: 'xxx',
                    method: 'get',
                    apiMethod:'get'
                },
                params: {},
                next: function(error) {
                    done();
                },
                req:reqMock({input:{config:{data:{}}}})
            };
            callServer(params);
            expect(params.req.input.message).to.eql('api server error!');

        });

        it('请求返回失败，有response，期待异常', function(done) {
            var proxy = rewire("../../lib/mid/proxy");
            proxy.__set__('request', function(options, callback) {
                callback(true, {
                    'statusCode': 500
                }, null);
            });

            var callServer = proxy.__get__('callServer');
            var params = {
                domain: 'xxx',
                api: {
                    url: 'xxx',
                    method: 'POST',
                    isJsonRaw:true
                },
                params: {},
                next: function(error) {
                    
                    done();
                },req:reqMock({_yoheaders:{},input:{config:{data:{}}}})
            };
            callServer(params);
            expect(params.req.input.message).to.eql('error: 500');
        });
        it('请求返回成功，有使用缓存，期待设置缓存并设置结果', function(done) {
            var proxy = rewire("../../lib/mid/proxy");
            proxy.__set__('request', function(options, callback) {
                callback(false, {
                    'statusCode': 200
                }, {});
            });
            var i = 0;
            proxy.__set__('procRet', function(params) {
                expect(params.body).to.eql({});
                i++;
                if(i===2) {
                    done();
                }
            });

            var callServer = proxy.__get__('callServer');

            callServer({
                domain: 'xxx',
                api: {
                    url: 'xxx',
                    method: 'GET'
                },
                res: {
                    setCache: function() {

                    },
                    genKey: function() {
                        return 'key';
                    }
                },
                req:reqMock({_yoheaders:{},input:{config:{data:{}}}}),
                params: {},
                next: function() {

                }
            });
            callServer({
                domain: 'xxx',
                api: {
                    url: 'xxx',
                    method: 'GET'
                },
                res: {},
                req:reqMock({input:{config:{data:{}}}}),
                params: {},
                next: function() {

                }
            });
        });
    })

});