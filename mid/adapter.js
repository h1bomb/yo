var fs = require('fs');
var _ = require('lodash');
/**
 * 对于获取接口数据的适配改造
 * @param  {string} dir 适配逻辑目录
 * @return {void} 没有返回
 */
module.exports = function(dir) {

    var adapters = {},
        methods = ['get', 'post', 'head', 'delete', 'put'];

    //读取适配逻辑目录，载入适配逻辑
    var files = fs.readdirSync(dir);
    if (!files) {
        return;
    }

    _.forEach(files, function(val) {
        var m = require((dir + '/' + val).replace('.js', ''));

        _.forEach(methods, function(v) {
            if (m[v]) {
                adapters[v + val.replace('.js', '')] = m[v];
            }
        });
    });
    //返回中间件
    return function(req, res, next) {
        if (res.proxyData && typeof res.proxyData === 'object') {
            var m = req.route.path.replace('/', '');
            m = m.replace(/\//g, '_');
            var key = req.method.toLowerCase() + m;
            if (adapters[key]) {
                res.proxyData = adapters[key](res.proxyData, req, res);
            }
        }
        next();
    }
}