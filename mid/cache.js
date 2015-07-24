var _ = require('lodash'),
    redis = require('redis'),
    md5 = require('MD5');


module.exports = function(options) {
    client = redis.createClient(options.port, options.ip);
    client.on("error", function(err) {
        console.log("Error " + err);
    });

    return function pjax(req, res, next) {
        res.setCache = function(key, val, expire) {
            var expire = expire || 500;
            client.set(key, val);
            client.expire(key, expire);

        }
        res.getCache = function(key, callback) {
            client.get(key, function(err, res) {
                callback(err, res);
            });
        }

        res.genKey = function() {
            var arr = _.toArray(arguments);
            if (arr.length > 0) {
                return 'cache:' + md5(arr.join(''));
            } else {
                return false;
            }
        }

        next();
    };
}