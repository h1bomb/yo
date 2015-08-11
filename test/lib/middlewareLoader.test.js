var expect = require("expect.js");
var rewire = require("rewire");
var middlewareLoader = rewire("../../lib/middlewareLoader");

describe('/lib/middlewareLoader', function() {
    it('设置了cache，期待6个中间件加载', function() {
        var arr = [];
        middlewareLoader.__set__('cache', function() {});
        middlewareLoader({
            use: function(obj) {
                arr.push(obj);
            }
        }, {
            cache: {}
        });
        expect(arr.length).to.be(6);
    });
});