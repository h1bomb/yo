/*!
 * yo
 * Copyright(c) 2015 Hbomb
 * MIT Licensed
 */

'use strict';

var crypto = require('crypto');
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
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
exports.jsonParse = function(str) {
    var ret = {};
    try {
        ret = JSON.parse(str);
    } catch(err) {
        console.info(str);
        console.error(err);
    }
    return ret;
};