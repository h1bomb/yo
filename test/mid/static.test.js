var expect = require("expect.js");
var rewire = require("rewire");
var staticM = rewire("../../mid/static");

describe('mid/static', function() {
    it('根据环境变量加载不同的配置参数', function() {
        var call = staticM({
            'test': 1,
            'production': 2
        });
        var res = {
            proxyData: {}
        };
        process.env.NODE_ENV = 'development';
        call(null, res, function() {});
        expect(res.proxyData._env['development']).to.be(true);
        process.env.NODE_ENV = 'test';
        call(null, res, function() {});
        expect(res.proxyData._env['test']).to.be(1);
        process.env.NODE_ENV = 'production';
        call(null, res, function() {});
        expect(res.proxyData._env['production']).to.be(2);
    });
});