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
    describe('mkdirsSync ',function(){
        var retDir = '';
        var fs = {
            existsSync:function(dir){
                if(dir==='xxx') {
                    return true;
                }
                return false
            },
            mkdirSync:function (dir) {
                retDir = dir;
                return true;
            }
        };
        util.__set__('fs',fs);

        it('多级目录同步创建,如果目录不存在，直接返回true',function(){
            expect(util.mkdirsSync('xxx')).to.be(true);
            expect(retDir).to.eql('');
        });

        it('多级目录,创建成功',function(){
            expect(util.mkdirsSync('a/a/a')).to.be(true);
            expect(retDir).to.eql('a/a/a');
        });

        it('目录创建失败',function(){
            fs.mkdirSync = function(){
                return false;
            };
            util.__set__('fs',fs);
            expect(util.mkdirsSync('bad/path')).to.be(false);
        });
    });
});