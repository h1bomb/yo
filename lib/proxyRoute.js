var request = require('request');
var _ = require('lodash');
var validate = require('./validate');
var fs = require('fs');

var interfacesConfig = [];
/**
 * 解析接口信息，配置初始化接口路由
 * @param  {[type]} app       web APP
 * @param  {Array} interfaces 接口信息
 * @return {void}
 */
exports.parseConfig = function(app) {
    _.forEach(interfacesConfig, function(val) {
        var domain = val.domain;
        console.log('[' + val.method + ']' + domain + val.route);
        app[val.method.toLowerCase()](val.route, function(req, res, next) {
            var ret = validate(req, val.params);
            if (!ret.error) {
                request({
                    url: domain + val.url,
                    method: val.method,
                    qs: ret.params
                }, function(error, response, body) {
                    if (response && response.statusCode == 200) {
                        res.send(body);
                    } else {
                        console.log('error: ' + (response && response.statusCode));
                        if (response) {
                            res.send('error: ' + response.statusCode);
                        } else {
                            next(new Error('server error!'));
                        }
                    }
                });
            } else {
                res.statusCode = 400;
                res.send(ret.message);
            }
        });
    });
}

/**
 * 加载配置的接口路径
 * @param  {String}   path     接口路径
 * @param  {Function} callback 完成回调
 */
exports.loadConfig = function(path, callback) {
    path = path || __dirname + '/../interface';
    fs.readdir(path, function(err, files) {
        if (err) {
            callback(err);
            return;
        }
        _.forEach(files, function(val) {
            var m = require((path + '/' + val).replace('.js', ''));
            if (m.domain && m.res && _.isArray(m.res) && m.res.length > 0) {
                _.forEach(m.res, function(val) {
                    val.domain = m.domain;
                    interfacesConfig.push(val);
                });
            } else {
                callback(new Error('空的接口依赖'));
            }
        });
        callback(null, interfacesConfig);

    });
}

/**
 * 初始化
 * @param  {Express}   app      web app
 * @param  {String}   path     接口路径
 * @param  {Function} callback 初始化完成事件触发
 */
exports.init = function(app, path, callback) {
    exports.loadConfig(path, function(err) {
        if (err) {
            callback(err);
            return;
        }
        exports.parseConfig(app);
        callback();
    });
}