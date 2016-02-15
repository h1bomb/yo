var expect = require("expect.js");
var rewire = require("rewire");
var adapter = rewire("../../lib/mid/adapter");

describe('adapter', function() {
    it('读取适配器逻辑，装载成功', function() {
        var call = adapter(__dirname + '/../mock/adapter');
        var res = {
            proxyData: {}
        };
        var req = {
            method: 'get',
            route: {
                path: '/a'
            },
            input:{
                config:{

                }
            },
            app:{
                yolog:{
                    log:function(){

                    }
                }
            }
        }
        var next = function() {};
        call(req, res, next);
        expect(res.proxyData).to.be(1);
    });

    it('读取配置装载多级目录的路由，装载成功', function() {
        var call = adapter(__dirname + '/../mock/adapter');
        var res = {
            proxyData: {}
        };
        var req = {
            method: 'get',
            route: {
                path: '/a/b'
            },
            input:{
                config:{
                    
                }
            },
            app:{
                yolog:{
                    log:function(){

                    }
                }
            }
        }
        var next = function() {};
        call(req, res, next);
        expect(res.proxyData).to.be(2);
    });

    it('测试配置固定适配器',function(){
        var call = adapter(__dirname + '/../mock/adapter');
        var res = {
            proxyData: {}
        };
        var req = {
            method: 'get',
            route: {
                path: '/a/f'
            },
            input:{
                config:{
                    adapter:'a_b'
                }
            },
            app:{
                yolog:{
                    log:function(){

                    }
                }
            }
        }
        var next = function() {};
        call(req, res, next);
        expect(res.proxyData).to.be(2);
        delete req.input.config.adapter;
        req.route.path = '';
        res = {
            proxyData:{val:1}
        }
        call(req,res,next);
        expect(res.proxyData.val).to.be(1);
        var res = {adaptersStop:true};
        var nextCalled = false;
        call(req,res,function(){nextCalled = true});
        expect(res.proxyData).to.be(undefined);
        expect(nextCalled).to.be(false);

    });
})