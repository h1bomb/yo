module.exports = function(options) {
    return function(req, res, next) {
        if (res.proxyData && typeof res.proxyData === 'object') {
            var env = process.env.NODE_ENV || 'development';
            if (env === 'development') {
                options[env] = true;
            }
            res.proxyData._env = {};
            res.proxyData._env[env] = options[env];
        }
        next();
    };
};