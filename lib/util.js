/*!
 * yo
 * Copyright(c) 2015 Hbomb
 * MIT Licensed
 */

'use strict';

var crypto = require('crypto');
var fs = require('fs');
var path = require('path');

/**
 * MD5加密字符串
 * @param  {String} value 需要加密的字符串
 * @return {String}       返回值
 */
exports.md5 = function(value) {
    var md5 = crypto.createHash('md5');
    md5.update(value);
    return md5.digest('hex');
};



/**
 * json序列化
 * @param  {String} str json字符串
 * @app {Request} app 请求对象
 * @return {Object}     返回对象
 */
exports.jsonParse = function(str,app) {
    var ret = {};
    var log = app ? app.yolog.log : console.log;
    try {
        ret = JSON.parse(str);
    } catch(err) {
        log('error','error: %s jsonParse: %s',err,str);
    }
    return ret;
};
