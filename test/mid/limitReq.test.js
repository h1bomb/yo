var expect = require("expect.js");
var rewire = require("rewire");
var limitReq = rewire("../../lib/mid/limitReq");
var reqMock = require("../mock/req");
var md5 = require("../../lib/util").md5;

describe('mid/limitReq', function() {
    it('如果不限制，直接跳过', function(done) {
       limitReq({
          islimit:false 
       })(reqMock,{},function(){
           done();
       });
    });
    
    it('如果是get方法，直接跳过',function(done){
       reqMock.method = 'GET';
       limitReq()(reqMock,{},function(){
           done();
       });
    });
    
    it('如果session中没有设置过，则设置请求标示',function(){
        reqMock.method = 'POST';
        reqMock.originalUrl='/asda';
        reqMock.body = {'a':'a'};
        reqMock.session = {};
        var key = md5(reqMock.originalUrl + JSON.stringify(reqMock.body));
        limitReq()(reqMock,{},function(){});
        expect(reqMock.session._reqHash[key]).to.be.a('number');
    });
    
    it('如果已经调用过，两次请求低于5000ms，则设置返回429',function(){
       var ret;
       var res = {status:function(){
         return {
             json:function(obj){
                 ret = obj;
             },
             send:function(obj){
                 ret = obj;
             }
         }  
       }};
       reqMock.session = {};
       reqMock.method = 'POST';
       reqMock.originalUrl = '/dasd';
       reqMock.body = {};
       limitReq()(reqMock,res,function(){});
       limitReq()(reqMock,res,function(){});
       expect(ret).to.be('Too Many Requests');
       reqMock.xhr = true;
       limitReq()(reqMock,res,function(){});
       expect(ret.code).to.be(429);
       setTimeout(function(){
           limitReq({timeout:500})(reqMock,res,function(){});
           expect(req.session._reqHash).to.eql({});
       },500);
    });
});