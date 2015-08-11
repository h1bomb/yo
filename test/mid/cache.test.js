var expect = require("expect.js");
var rewire = require("rewire");
var cache = rewire("../../lib/mid/cache");

var call,
    req = {},
    res = {},
    data = {},
    times = {},
    next = function() {};

describe('mid/cache', function() {
    before(function() {

        cache.__set__('redis', {
            createClient: function() {
                return {
                    set: function(key, val) {
                        data[key] = val;
                    },
                    expire: function(key, val) {
                        times[key] = val;
                    },
                    get: function(key, callback) {
                        callback(null, data[key]);
                    },
                    on: function() {

                    }
                }
            }
        });
        call = cache({
            port: '7777',
            ip: ''
        });

        call(req, res, next);
    });
    it('测试设置Cache，期待设置成功，并且和设置的值一致', function() {
        res.setCache('a', 'a', 600);
        expect(data.a).to.be('a');
    });
    it('期待失效时间和期待值一致', function() {
        res.setCache('b', 'b', 1000);
        expect(times.b).to.be(1000);
    });
    it('获取值，回调是有效的', function(done) {
        res.getCache('a', function(err, res) {
            expect(res).to.be('a');
            done();
        })
    });
    it('测试生成的key', function() {
        expect(res.genKey('a', 'b', 'c')).to.be('cache:900150983cd24fb0d6963f7d28e17f72');
    });
});