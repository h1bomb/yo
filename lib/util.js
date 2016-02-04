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

/**
 * 创建多级目录文件结构
 * @param  {String} dirpath 路径字符串
 * @param  {Number} mode    访问权限
 * @return {Boolean}        创建是否成功
 */
exports.mkdirsSync = function(dirpath, mode) { 
    if (!fs.existsSync(dirpath)) {
        var pathtmp;
        dirpath.split(path.sep).forEach(function(dirname) {
            if (pathtmp) {
                pathtmp = path.join(pathtmp, dirname);
            }
            else {
                pathtmp = dirname;
            }
            if (!fs.existsSync(pathtmp)) {
                if (!fs.mkdirSync(pathtmp, mode)) {
                    return false;
                }
            }
        });
    }
    return true; 
}