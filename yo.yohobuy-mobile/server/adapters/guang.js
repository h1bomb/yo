var tag = require('./tag');
var interfaces = require('../interface/mobileguang');
var _ = require('lodash');

exports.get = function(data, req, res) {
    var getList = interfaces.apis.getList;
    var getCat = interfaces.apis.getCat;
    var getListkey = getList.method + interfaces.domain + getList.url;
    var getCatkey = getCat.method + interfaces.domain + getCat.url;
    var gender = req.proxyParams.params.gender ? req.proxyParams.params.gender : '1,3';
    var sort_id = req.proxyParams.params.sort_id ? req.proxyParams.params.sort_id : 0;

    var tagRet = tag.get(data[getListkey]);

    tagRet.data.cat = [];
    _.forEach(data[getCatkey].data, function(val) {
        var cur = val.id == sort_id ? 'on' : '';
        tagRet.data.cat.push({
            name: val.name,
            url: '/guang?gender=' + gender + '&sort_id=' + val.id,
            current: cur
        });
    });
    tagRet.data.sort_id = sort_id;
    if (tagRet.data.gender == '2,3') {
        tagRet.isGirls = true;
    }
    return tagRet;
}