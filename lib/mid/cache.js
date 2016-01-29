/*!
 * yo
 * Copyright(c) 2015 Hbomb
 * MIT Licensed
 */

'use strict';

/**
 * 模块依赖
 * @private
 */

var _ = require('lodash');
var redis = require('redis');
var md5 = require('../util').md5;
var debug = require('debug')('cache');


/**
 * 缓存插件
 * @param  {Request} options 配置参数
 * @return {Function} 返回处理中间件
 */
module.exports = function(options) {
    var client = redis.createClient(options.port, options.ip);

    /**
     * redis是否已连接
     * @private
     * @type {Boolean}
     */
    var isConn = false;


    /**
     * 当redis出错的时候，设置无法连接
     */
    client.on("error", function(err) {
        console.log("Error " + err);
        isConn = false;
    });

    /**
     * 当redis连接成功的时候，设置可连接
     */
    client.on('connect', function() {
        isConn = true;
    });

    return function(req, res, next) {

        /**
         * 设置缓存
         * @param {string} key    缓存键值
         * @param {object} val    缓存内容
         * @param {number} expire 以秒为单位的数字
         */
        res.setCache = function(key, val, expire) {
            if (!isConn) {
                debug("setCache: redis can't connect");
                return false;
            }
            var expireTime = expire || 500;
            client.set(key, val);
            client.expire(key, expireTime);

        };
        /**
         * 获取缓存
         * @param  {string}   key     缓存键名
         * @param  {Function} callback 获取内容的回调
         */
        res.getCache = function(key, callback) {
            if (!isConn) {
                debug("getCache: redis can't connect");
                callback(null, false);
                return;
            }
            client.get(key, function(err, ret) {
                callback(err, ret);
            });
        };

        /**
         * 生成一个MD5的键名
         * @return {string} MD5后的键名
         */
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
};