var expect = require("expect.js");
var rewire = require("rewire");
var cache = rewire("../../lib/mid/cache");
var EE = require('events').EventEmitter;
var util = require('util');

var call,
    req = {},
    res = {},
    data = {},
    times = {},
    next = function() {},
    ret;

describe('mid/cache', function() {
    before(function() {

        cache.__set__('redis', {
            createClient: function() {
                function conn() {
                    EE.call(this);
                    var that = this;
                    this.set = function(key, val) {
                        data[key] = val;
                    }
                    this.expire = function(key, val) {
                        times[key] = val;
                    };
                    this.get = function(key, callback) {
                        callback(null, data[key]);
                    };
                    this.attach = function(ev, err, data) {
                        that.emit(ev, err, data);
                    }
                }
                util.inherits(conn, EE);
                ret = new conn();
                return ret;
            }
        });
        call = cache({
            port: '7777',
            ip: ''
        });

        call(req, res, next);
    });
    it('连接失败，设置缓存，没有设置成功', function() {
        ret.attach('error', new Error(), null);
        res.setCache('a', 'a', 600);
        expect(data.a).to.be(undefined);
    });

    it('连接失败，获取缓存，是false', function(done) {
        ret.attach('error', new Error(), null);
        res.getCache('a', function(err, ret) {
            expect(err).to.be(null);
            expect(ret).to.be(false);
            done();
        });
    });

    it('测试设置Cache，期待设置成功，并且和设置的值一致', function() {
        ret.attach('connect', null);
        res.setCache('a', 'a', 600);
        expect(data.a).to.be('a');
    });
    it('期待失效时间和期待值一致', function() {
        ret.attach('connect', null);
        res.setCache('b', 'b', 1000);
        expect(times.b).to.be(1000);
    });
    it('获取值，回调是有效的', function(done) {
        ret.attach('connect', null);
        res.getCache('a', function(err, res) {
            expect(res).to.be('a');
            done();
        });
    });
    it('测试生成的key', function() {
        expect(res.genKey('a', 'b', 'c')).to.be('cache:900150983cd24fb0d6963f7d28e17f72');
    });
    it('如果传入的参数是空的，返回false', function() {
        expect(res.genKey()).to.be(false);
    });
});