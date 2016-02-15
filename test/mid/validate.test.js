var expect = require("expect.js");
var rewire = require("rewire");
var validate = rewire("../../lib/mid/validate");
var reqMock = require('../mock/req');

describe('mid/validate', function() {
    describe('main', function() {
        it('如果没有route，直接返回', function(done) {
            validate({}, {}, function() {
                done();
            });
        });
        it('如果没有配置config,直接返回', function(done) {
            validate.__set__('proxyRoute', {
                'genKey': function() {},
                'interfacesConfig': []
            });
            var req = reqMock();
            validate(req, {}, function() {
                done();
            });
        });
        it('没有配置apis，期待一个错误的验证信息', function() {
            var req = reqMock();
            validate = rewire("../../lib/mid/validate");
            validate.__set__('validate', function() {
                return {
                    ret: 'NO OK!',
                    err: true,
                    msgs: ['no ok!']
                }
            });
            validate.__set__('proxyRoute', {
                'genKey': function() {
                    return 0;
                },
                'interfacesConfig': [123]
            });
            validate(req, {}, function() {});
            expect(req.input.error).to.be(true);
            expect(req.input.message[0]).to.be('no ok!');
            validate.__set__('validate', function() {
                return {
                    ret: 'OK!',
                    err: false,
                    msgs: ['ok!']
                }
            });
            validate(req, {}, function() {});
            expect(req.input.error).to.be(false);
        });
        it('配置了apis,期待一个错误返回', function() {
            var req = reqMock();
            validate = rewire("../../lib/mid/validate");
            validate.__set__('validate', function() {
                return {
                    ret: 'NO OK!',
                    err: true,
                    msgs: ['no ok!']
                }
            });
            validate.__set__('proxyRoute', {
                'genKey': function() {
                    return 0;
                },
                'interfacesConfig': [{
                    apis: [1, 2]
                }]
            });
            validate(req, {}, function() {});
            expect(req.input.error).to.be(true);
            expect(req.input.message[0]).to.be('no ok!');
            validate.__set__('validate', function() {
                return {
                    ret: 'OK!',
                    err: false,
                    msgs: ['ok!']
                }
            });
            validate(req, {}, function() {});
            expect(req.input.error).to.be(false);
            expect(req.input.message[0]).to.be('ok!');
        });
    });
    describe('validate', function() {
        validate = rewire("../../lib/mid/validate");
        valFun = validate.__get__('validate');
        var config = {
            params: [{
                name: 'a',
                maxLength: 10,
                minLength: 1,
                reg: /^\d{1,10}$/,
                type:'Number',
                def: 10,
                require: true
            }]
        };
        var req = reqMock({
            proxyParams: {
                    params: {
                        a: '12'
                    },
                    body: {
                        b: '12'
                    }
                }   
            });
        it('设置了最大和最小值，并且在这个范围', function() {
            config.params[0].reg = null;
            var ret = valFun(config, req);
            expect(ret.err).to.be(false);
        });
        it('设置了正则，并且在这个范围里面', function() {
            config.params[0].maxLength = null;
            config.params[0].minLength = null;
            config.params[0].reg = /^\d{1,10}$/;
            var ret = valFun(config, req);
            expect(ret.err).to.be(false);
        });
        it('如果都没有配置最大和最小值范围，以及正则', function() {
            config.params[0].maxLength = null;
            config.params[0].minLength = null;
            config.params[0].reg = null;
            var ret = valFun(config, req);
            expect(ret.err).to.be(false);
        });
        it('如果不满足条件出错,期待有错误提示结果', function() {
            config.params[0].maxLength = 3;
            config.params[0].minLength = 10;
            config.params[0].reg = /^\d{3,10}$/;
            var ret = valFun(config, req);
            expect(ret.err).to.be(true);
        });
        it('如果设置了默认值，期待默认值', function() {
            req.proxyParams.params = {
                a: null
            }
            var ret = valFun(config, req);
            expect(ret.err).to.be(false);
        });
        it('如果设置必须传，期待不能为空', function() {
            req.proxyParams.params = {
                a: null
            }
            config.params[0].def = false;
            var ret = valFun(config, req);
            expect(ret.err).to.be(true);
        });
        it('如果传参是数字型，期待传参是数字型',function(){
            req.proxyParams.params = {
                a:123
            };
            var ret = valFun(config,req);
            expect(ret.ret['a']).to.be(123);
        });
        it('如果没有设置验证，期待附上默认值，返回为空对象',function(){
            var ret = valFun({params:null},req);
            expect(ret.ret).to.eql({});
        });
        it('如果类型不是数字，不做类型转化',function(){
            config.params[0].type = 'String';
            req.proxyParams.params = {
                a : 123
            };
            var ret = valFun(config,req);
            expect(ret.ret['a']).to.be('123');

        })
    });
});