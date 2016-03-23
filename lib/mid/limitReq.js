/*!
 * yo
 * Copyright(c) 2015 Hbomb
 * MIT Licensed
 */

'use strict';

var _ = require('lodash');
var md5 = require('../util').md5;

/**
 * 限制重复提交
 * @param  {Object} opt 配置参数
 * @return {void}         无
 */
module.exports = function(opt) {
    return function(req, res, next) {
        var options = _.merge({
            timeout:5000,
            islimit:true
        },opt);
        //如果不限制，直接跳过
        if(!options.islimit) {
            next();
            return;
        }
        
        //如果是get方法，直接跳过
        if(req.method ==='GET') {
            next();
            return;
        } 
        
        //生成请求的唯一标示
        var reqKey = md5(req.originalUrl + JSON.stringify(req.body));
        
        //如果session的请求标示的集合不存在，则设置一个空对象
        if(!req.session._reqHash) {
            req.session._reqHash = {};
        }
        var now = new Date().getTime();
        var reqHash = req.session._reqHash[reqKey];
        //如果请求唯一标示存在，返回多次提交的错误信息           
        if(!reqHash||now > reqHash) {
            delete req.session._reqHash[reqKey];
            next();
        } else {
            if(req.xhr) {
                res.status(429).json({
                    code:429,
                    message:'Too Many Requests!'
                });
            } else {
                res.status(429).send('Too Many Requests');
            }
        }
        req.session._reqHash[reqKey] = now + options.timeout;
    };
};