var _ = require('lodash'),
    redis = require('redis'),
    md5 = require('MD5');


module.exports = function(options) {
    var client = redis.createClient(options.port, options.ip);
    client.on("error", function(err) {
        console.log("Error " + err);
    });

    return function(req, res, next) {
        res.setCache = function(key, val, expire) {
            var expireTime = expire || 500;
            client.set(key, val);
            client.expire(key, expireTime);

        };
        res.getCache = function(key, callback) {
            client.get(key, function(err, ret) {
                callback(err, ret);
            });
        };

        res.genKey = function() {
            var arr = _.toArray(arguments);
            if (arr.length > 0) {
                return 'cache:' + md5(arr.join(''));
            } else {
                return false;
            }
        };

        next();
    };
}