var _ = require('lodash'),
    redis = require('redis'),
    md5 = require('MD5');


module.exports = function(options) {
    client = redis.createClient(options.port, options.ip);
    client.on("error", function(err) {
        console.log("Error " + err);
    });

    return function pjax(req, res, next) {
        res.setCache = function(domain, api, params, val, expire) {
            var key = md5(domain + api + JSON.stringify(params));
            var expire = expire || 500;
            client.set(key, val);
            client.expire(key, expire);

        }
        res.getCache = function(domain, api, params, callback) {
            var key = md5(domain + api + JSON.stringify(params));
            client.get(key, function(err, res) {
                callback(err, res);
            });
        }

        next();
    };
}