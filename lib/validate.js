var _ = require('lodash');
/**
 * 错误校验
 * @param  {Request} req   请求
 * @param  {Array} params 数组
 * @return {Object} 处理后的传参，或者是错误信息
 */
module.exports = function validate(req, params) {
    var ret = {};
    var message = '';
    var error = false;
    _.forEach(params, function(v) {
        var val = req.params[v.name] || req.body[v.name];
        var flag = false;
        if (val) {
            if (v.maxLength && v.minLength) {
                if (val < v.maxLength + 1 && val > v.minLength - 1) {
                    flag = true;
                }
            }
            if (v.reg && v.reg.test(val)) {
                flag = true;
            }
            if (flag === true) {
                ret[v.name] = val;
            } else {
                message += v.name + ':' + v.message + '\n';
                error = true;
            }
        }
    });
    return {
        params: ret,
        message: message,
        error: error,
        code: 400
    };
}