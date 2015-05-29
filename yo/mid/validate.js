var _ = require('lodash');
var proxyRoute = require('../lib/proxyRoute');

/**
 * 错误校验
 * @param  {Request} req   请求
 * @param  {Array} params 数组
 * @return {Object} 处理后的传参，或者是错误信息
 */
module.exports = function validate(req, res, next) {
    var ret, messages, error, key, config, params, message;
    ret = {};
    messages = [];
    error = false;

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

    params = config.params || [],
    message = {};



    _.forEach(params, function(v) {
        var val = req.proxyParams.params[v.name] || req.proxyParams.body[v.name];
        var flag1 = false,
            flag2 = false;
        if (val) {
            if (v.maxLength && v.minLength) {
                if (val.length < Number(v.maxLength) + 1 && val.length > Number(v.minLength) - 1) {
                    flag1 = true;
                }
            }
            if (v.reg && v.reg.test(val)) {
                flag2 = true;
            }
            if (flag1 === true && flag2 === true) {
                ret[v.name] = val;
            } else {
                message[v.name] = v.message;
                messages.push(message);
                error = true;
            }
        }
    });
    req.input = {
        config: config,
        params: ret,
        message: messages,
        error: error
    };
    next();

}