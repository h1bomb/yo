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
var proxyRoute = require('../proxyRoute');

/**
 * 错误校验
 * @param  {Request} req   请求
 * @param  {Array} params 数组
 * @return {void} 
 */
module.exports = function(req, res, next) {
    var key, config, valret, params, messages, error;
    if (!req.route) {
        next();
        return;
    }
    key = proxyRoute.genKey(req.method, req.route.path);
    config = proxyRoute.interfacesConfig[key];

    if (!config) {
        next();
        return;
    }
    params = [];
    messages = [];
    error = false;
    if (config.apis) {
        _.forEach(config.apis, function(v,k) {
            valret = validate(v, req);
            params[k] = valret.ret;
            messages = _.union(messages, valret.msgs);
            if (valret.err) {
                error = true;
            }
        });
    } else {
        valret = validate(config, req);
        params = valret.ret;
        messages = valret.msgs;
        if (valret.err) {
            error = true;
        }
    }

    req.input = {
        config: config,
        params: params,
        message: messages,
        error: error
    };
    req.app.yolog.log('verbose','validate input values: %j',req.input,{});
    next();

};

/**
 * 验证方法
 * @param  {Object} config 验证配置
 * @param  {Object} req    请求
 * @return {Object}        返回验证结果
 */
function validate(config, req) {
    var params = config.params || [],
        message = {},
        ret = {},
        messages = [],
        error = false;

    _.forEach(params, function(v) {
        var val = req.proxyParams.params[v.name] || req.proxyParams.body[v.name];
        val = val ? val + '' : val;
        var flag1,
            flag2,
            maxLength = Number(v.maxLength) + 1,
            minLength = Number(v.minLength) - 1;
        if (val) {
            if ((!v.maxLength || !v.minLength) || (val.length < maxLength && val.length > minLength)) {
                flag1 = 1;
            } else {
                flag1 = 2;
            }

            if (!v.reg || v.reg.test(val)) {
                flag1 = 1;
            } else {
                flag2 = 2;
            }

            if (flag1 === 2 || flag2 === 2) {
                message[config.url + ':' + v.name] = v.message;
                messages.push(message);
                error = true;
            } else {
                //如果是数字类型,转化为数字型
                if(v.type.toUpperCase() === 'NUMBER') {
                    val = Number(val);
                }
                ret[v.name] = val;
            }

        } else {
            if (v.def) {
                ret[v.name] = v.def;
            }
            if (v.require && !v.def) {
                message[v.name] = v.name + '不能为空';
                messages.push(message);
                error = true;
            }
        }
    });

    return {
        msgs: messages,
        err: error,
        ret: ret
    };
}