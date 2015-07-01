var fs = require('fs');
var _ = require('lodash');

module.exports = function(dir) {

    var adapters = {},
        methods = ['get', 'post', 'head', 'delete', 'put'];

    fs.readdir(dir, function(err, files) {
        if (err) {
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
    });

    return function(req, res, next) {
        if (res.proxyData && typeof res.proxyData === 'object') {
            var key = req.method.toLowerCase() + req.route.path.replace('/', '');
            if (adapters[key]) {
                res.proxyData = adapters[key](res.proxyData, req, res);
            }
        }
        next();
    }
}