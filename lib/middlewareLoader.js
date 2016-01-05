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

var validate = require('./mid/validate'); //验证中间件
var proxy = require('./mid/proxy'); //接口代理中间件
var pjax = require('./mid/pjax'); //pjax插件
var adapter = require('./mid/adapter'); //接口数据适配中间件
var staticWare = require('./mid/static'); //设置展示环境插件
var cache = require('./mid/cache'); //缓存中间件

/**
 * 自定义中间件加载器
 * @param  {Function} app     express
 * @param  {Object} options [description]
 * @return {void}         [description]
 */
module.exports = function(app, options) {
    if (options.cache) {
        app.use(cache(options.cache));
    }
    app.use(validate);
    app.use(proxy);
    app.use(adapter(options.adapters));
    app.use(staticWare(options.envStatic));
    app.use(pjax(options));
};