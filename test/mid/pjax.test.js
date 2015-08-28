var expect = require("expect.js");
var rewire = require("rewire");
var pjax = rewire("../../lib/mid/pjax");

describe('mid/pjax', function() {
    describe('main', function() {
        it('当出错了，返回json错误信息', function() {
            var req = {
                headers: {
                    accept: 'json'
                }
            };
            var res = {
                status: function() {
                    return {
                        send: function(ret) {
                            res.ret = ret;
                        }
                    }
                }
            };
            var next = function() {};
            pjax(req, res, next);

            expect(res.ret).to.be('{"code":404,"message":""}');
        });

        it('当出错了，返回一般错误信息', function() {
            var req = {
                headers: {
                    accept: 'html'
                },
                url: 'a'
            };
            var res = {
                render: function(view) {
                    res.view = view;
                },
                proxyData: {}
            };

            var next = function() {};
            pjax(req, res, next);

            expect(res.locals.reloadUrl).to.be('a');
            expect(res.view).to.be('error/error');

        });

        it('当正确的返回，期待返回json', function() {
            var req = {
                headers: {
                    accept: 'json'
                },
                input: {
                    config: {
                        view: 'a'
                    }
                }

            };
            var res = {
                send: function(ret) {
                    res.ret = ret;
                },
                proxyData: '1'
            };

            var next = function() {};
            pjax(req, res, next);
            expect(res.locals).to.be('1');
            expect(res.ret).to.be('"1"');
        });

        it('当正确的返回，期待返回html', function() {
            var req = {
                headers: {
                    accept: 'html',
                    'x-pjax': true
                },
                input: {
                    config: {
                        view: 'a'
                    }
                }

            };
            var res = {
                render: function(view) {
                    res.view = view;
                },
                proxyData: {
                    a: 1
                }
            };

            var next = function() {};
            pjax(req, res, next);
            expect(res.locals).to.eql({
                a: 1,
                layout: false
            });
            expect(res.view).to.be('a');
        });
    });
    describe('getView', function() {
        it('测试获取默认视图', function() {
            expect(pjax.__get__('getView')('/a/b')).to.be('a/b');
            expect(pjax.__get__('getView')('/a/:zd/b:userid')).to.be('a/b');
        });
    });
    describe('genkey', function() {
        it('输入一个值，期待md值正确', function() {
            expect(pjax.__get__('genkey')({
                "a": "b"
            })).to.be('pagecache:92eff9dda44cb8003ee13990782580ff');
        });
    });
    describe('getPageCache', function() {
        it('获取页面缓存,如果没有设置cache，则返回false', function(done) {
            pjax.__get__('getPageCache')('231', {}, function(err, html) {
                expect(err).to.be(null);
                expect(html).to.be(false);
                done();
            });
        });
        it('获取页面缓存,如果设置cache，则返回内容', function(done) {
            pjax.__get__('getPageCache')('231', {
                getCache: function(key, callback) {
                    callback(null, 'aaa')
                }
            }, function(err, html) {
                expect(err).to.be(null);
                expect(html).to.be('aaa');
                done();
            });
        });
    });
    describe('setPageCache', function() {
        it('设置pagecache，如果没有设置cache，则没有设置上', function() {
            pjax.__get__('setPageCache')('123', 'aaa', {});
        });
        it('设置pagecache，如果设置cache，则设置上', function(done) {
            pjax.__get__('setPageCache')('123', 'aaa', {
                setCache: function(key, html) {
                    expect(key).to.be('123');
                    expect(html).to.be('aaa');
                    done();
                }
            });
        });
    })
});