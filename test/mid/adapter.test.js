var expect = require("expect.js");
var rewire = require("rewire");
var adapter = rewire("../../mid/adapter");

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
            }
        }
        var next = function() {};
        call(req, res, next);
        expect(res.proxyData).to.be(2);
    });
})