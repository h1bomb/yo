var expect = require("expect.js");
var rewire = require("rewire");
var pjax = rewire("../../lib/mid/pjax");
var reqMock = require("../mock/req");

describe('mid/pjax', function() {
    describe('main', function() {
        it('当出错了，返回json错误信息', function() {
            var req = reqMock({headers: {accept: 'json'},input:false});
            var res = {
                status: function(code) {
                    return {
                        json: function(ret) {
                            res.ret = ret;
                            res.ret.code = code;
                            res.ret = JSON.stringify(res.ret);
                        }
                    }
                }
            };
            var next = function() {};
            pjax({})(req, res, next);

            expect(res.ret).to.be('{"code":404,"message":""}');
        });

        it('当出错了，返回一般错误信息', function() {
            var req = reqMock({headers: {accept: 'html'},url:'a',input:false});
            var res = {
                render: function(view) {
                    res.view = view;
                },
                proxyData: {}
            };

            var next = function() {};
            pjax({})(req, res, next);

            expect(res.locals.reloadUrl).to.be('a');
            expect(res.view).to.be('error/error');

        });

        it('当正确的返回，期待返回json', function() {
            var req = reqMock({
                headers: {
                    accept: 'json'
                },
                input: {
                    config: {
                        view: 'a'
                    }
                }
            });
            var res = {
                status:function(){
                    return {
                        json: function(ret) {
                            res.ret = ret;
                        }
                    }
                },
                proxyData: '1'
            };

            var next = function() {};
            pjax({})(req, res, next);
            expect(res.ret.data).to.be('1');
        });

        it('当正确的返回，期待返回html', function() {
            var req = reqMock({
                headers: {
                    accept: 'html',
                    'x-pjax': true
                },
                input: {
                    config: {
                        view: 'a'
                    }
                }
            });
            var res = {
                render: function(view) {
                    res.view = view;
                },
                proxyData: {
                    a: 1
                }
            };

            var next = function() {};
            pjax({})(req, res, next);
            expect(res.locals).to.eql({
                a: 1,
                layout: false
            });
            expect(res.view).to.be('a');
        });
    });
    describe('jsonRet',function(){
        var jsonRet = pjax.__get__('jsonRet');
        var ret;
        function mockStatus(code){
            return {
                json:function(data){
                    ret = data;
                }
            }
         }
        var res = {status: mockStatus};   

        it('404的情况',function(){
            var req = reqMock({input:false});
            jsonRet(req,res);
            expect(ret.code).to.be(404);
            expect(ret.message).to.be("");
        });

        it('500的情况',function(){
            var req = reqMock({input:{error:true,message:'error'}});
            jsonRet(req,res);
            expect(ret.code).to.be(500);
            expect(ret.message).to.be('error');
        });

        it('正常返回的情况',function(){
            var req = reqMock({input:{}});
            res.proxyData = 1;
            jsonRet(req,res);
            expect(ret.code).to.be(200);
            expect(ret.data).to.be(1);
        });
    });
    describe('renderView',function(){
        var renderView = pjax.__get__('renderView');
        var ret={};
        var str='';
        var isError = null;
        var res = {
            render:function(view,cb){
                ret.view = view;
                cb(isError,str);
            },
            send:function(str){
                ret.html = str;
            },
            locals:{}
        }
        it('返回错误页面的HTML',function(){
            renderView(reqMock({headers:{},input:false}),res);
            expect(ret.view).to.be('error/error');
            expect(ret.html).to.be('');
        });
        it('获取正常视图',function(){
            str = 'test';
            var req = reqMock({headers:{},input:{config:{view:'test'}}});
            renderView(req,res);
            expect(ret.view).to.be('test');
            expect(ret.html).to.be('test');
        });
        it('是pjax，期待layout不加载',function(){
            var req = reqMock({headers:{'x-pjax':true},input:{config:{view:'test'}}});
            renderView(req,res);
            expect(ret.view).to.be('test');
            expect(res.locals.layout).to.be(false);
        });
        it('加载视图失败',function(){
            isError = true;
            var req = reqMock({headers:{},next:function(err){ret.error = err;},input:{config:{view:'test'}}});
            renderView(req,res);
            expect(ret.error).to.be(true);
        });
        it('有afterRender方法，期待执行',function(){
            isError = false;
            str = 'test';
            var req = reqMock({headers:{},input:{config:{view:'test'}}});
            renderView(req,res,function(res,str){
                return str+'1';
            });
            expect(ret.html).to.be('test1');
        });
    });
    describe('getView', function() {
        it('测试获取默认视图', function() {
            expect(pjax.__get__('getView')('/a/b')).to.be('a/b');
            expect(pjax.__get__('getView')('/a/:zd/b:userid')).to.be('a/b');
        });
    });
});