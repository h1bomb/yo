/*!
 * yo
 * Copyright(c) 2015 Hbomb
 * MIT Licensed
 */

'use strict';

/**
 * 静态资源的环境设置
 * @param  {Object} options 配置参数
 * @return {void}         无
 */
module.exports = function(options) {
    return function(req, res, next) {
        if (!res.proxyData || typeof res.proxyData !== 'object') {
            res.proxyData = {};
        }
        var env = process.env.NODE_ENV || 'development';
        if (env === 'development') {
            options[env] = true;
        } 
        res.proxyData._env = {};
        res.proxyData._env[env] = options[env];
        res.proxyData._env.cur = options[env];//增加当前环境的前端配置
        req.app.yolog.log('verbose','static resouces: %j',res.proxyData._env,{});
        next();
    };
};