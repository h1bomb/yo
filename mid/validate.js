var _ = require('lodash');
var proxyRoute = require('../lib/proxyRoute');

/**
 * 错误校验
 * @param  {Request} req   请求
 * @param  {Array} params 数组
 * @return {Object} 处理后的传参，或者是错误信息
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
        _.forEach(config.apis, function(v) {
            valret = validate(v, req);
            params.push(valret.ret);
            messages = _.union(messages, valret.msgs);
            if (valret.err) {
                error = true;
            }
        });
    } else {
        valret = validate(config, req);
        params.push(valret.ret);
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
        var flag1 = false,
            flag2 = false;
        if (val) {
            if (v.maxLength && v.minLength && val.length < Number(v.maxLength) + 1 && val.length > Number(v.minLength) - 1) {
                flag1 = true;
            }
            if (v.reg && v.reg.test(val)) {
                flag2 = true;
            }
            if (flag1 && flag2) {
                ret[v.name] = val;
            } else if ((!v.reg && flag1) || (flag2 && !v.maxLength && !v.minLength) || (!v.reg && !v.maxLength && !v.minLength)) {
                ret[v.name] = val;
            } else {
                message[config.url + ':' + v.name] = v.message;
                messages.push(message);
                error = true;
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