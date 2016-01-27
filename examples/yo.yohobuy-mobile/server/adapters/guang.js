var tag = require('./tag');
var _ = require('lodash');

exports.get = function(data, req, res) {
    var gender = req.proxyParams.params.gender ? req.proxyParams.params.gender : '1,3';
    var sort_id = req.proxyParams.params.sort_id ? req.proxyParams.params.sort_id : 0;

    var tagRet = tag.get(data['list']);

    tagRet.data.cat = [];
    _.forEach(data['cat'].data, function(val) {
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