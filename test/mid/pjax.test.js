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
                }
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
    })
});