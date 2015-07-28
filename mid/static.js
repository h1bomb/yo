/**
 * 静态资源的环境设置
 * @param  {Object} options 配置参数
 * @return {void}         无
 */
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