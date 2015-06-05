module.exports = function(req, res, next) {
    if (res.proxyData && typeof res.proxyData === 'object') {
        var env = process.env.NODE_ENV || 'development';
        res.proxyData[env] = true;
    }
    next();
}