var expect = require("expect.js");
var rewire = require("rewire");

describe('/lib/util',function(){
    var util = rewire('../../lib/util');
    describe('md5的hash值',function(){
        it('md5的hash值,期待一致',function(){
            var hash = util.md5('123456');
            expect(hash).to.be('e10adc3949ba59abbe56e057f20f883e');
        });
    });
    describe('jsonParse',function(){
        it('如果 app没有传，使用默认console',function(){
            expect(util.jsonParse('{"a":123}')).to.eql({a:123});
        });
        it('如果序列化出错',function(){
            expect(util.jsonParse('xxx')).to.eql({});
        });
    });
});