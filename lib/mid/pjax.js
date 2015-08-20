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

var debug = require('debug')('mid-pjax');
var _ = require('lodash');
var md5 = require('../util').md5;

/**
 * pjax插件
 * @param  {Request} req 请求对象
 * @param  {Response} res 返回对象
 * @return {void}
 */
module.exports = function(req, res) {
    var accept = req.headers.accept || "",
        view, key;

    if (!req.input || req.input.error) {
        if (accept.indexOf("json") > -1) {
            res.status(404).send(JSON.stringify({
                code: 404,
                message: req.input ? req.input.message : ''
            }));
        } else {
            res.proxyData.reloadUrl = req.url;
            res.locals = res.proxyData;
            res.render('error/error');
        }
        return;
    }

    view = req.input.config.view || getView(req.input.config.route);

    res.locals = res.proxyData;

    if (accept.indexOf("json") > -1) {
        res.send(JSON.stringify(res.proxyData));
        return;
    } else {
        if (req.headers['x-pjax']) {
            res.locals.layout = false;
        }
        key = genkey(res.locals);

        getPageCache(key, res, function(err, html) {
            if (!err && html) {
                debug('from pagecache :' + key + ' !');
                res.send(html);
                return;
            } else if (!html) {
                res.render(view, function(err, str) {
                    if (err) return req.next(err);
                    debug('save pagecache :' + key);
                    setPageCache(key, str, res);
                    res.send(str);
                    return;
                });
            } else {
                debug('view render err :' + err);
                return req.next(err);
            }
        });

    }
};
/**
 * 生成key
 * @private
 * @param  {object} data 需要序列化的界面数据
 * @return {string}      key
 */
function genkey(data) {
    return 'pagecache:' + md5(JSON.stringify(data));
}

/**
 * 获取页面缓存
 * @private
 * @param  {string}   key     键名
 * @param  {Response}   res   返回
 * @param  {Function} callback 回调
 */
function getPageCache(key, res, callback) {
    if (res.getCache) {
        res.getCache(key, function(err, html) {
            callback(err, html);
        });
    } else {
        callback(null, false);
    }
}

/**
 * 设置页面缓存
 * @private
 * @param {String} key  键名
 * @param {String} html 需要缓存的html
 * @param {Response} res 返回
 */
function setPageCache(key, html, res) {
    if (res.setCache) {
        res.setCache(key, html);
    }
}

/**
 * 得到默认的视图
 * @param  {string} 路由跳转
 * @return {string} 返回默认路由
 */
function getView(route) {
    var defaultViewArr = route.split('/'),
        defaultView = [];

    _.forEach(defaultViewArr, function(val) {
        if (val.indexOf(':') < 0 && val !== '') {
            defaultView.push(val);
        } else if (val.indexOf(':') > -1) {
            var ret = val.split(':');
            if (ret[0]) {
                defaultView.push(val[0]);
            }
        }
    });

    if (defaultView.length < 2) {
        defaultView.push('default');
    }
    defaultView = defaultView.join('/');
    return defaultView;
}