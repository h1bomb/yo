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

/**
 * pjax插件
 * @param  {Object} options pjax配置
 * @return {void}
 */
module.exports = function(options) {
    return function(req, res) {
        var accept = req.headers.accept || "";

        //如果是json
        if(accept.indexOf("json") > -1) {
            jsonRet(req,res);
            return;
        }
        else {

            //渲染HTML界面
            renderView(req,res,options.afterRender);
            return;
        }
    }
}

/**
 * 返回json的处理
 * @param  {Object} input 参数输入
 * @param  {Object} res   响应
 * @return {void}  
 */
function jsonRet(req,res) {
    var state = 200;
    var data = {
        code:state,
        message:""
    };

    //错误判断（404）
    if(!req.input) {
        state = 404;
    } else if(req.input.error) {
        state = 500;
        data.message = req.input.message ? req.input.message:'';
    } else {
        data.data = res.proxyData;
    } 
    data.code = state;
    res.status(state).json(data);
}

/**
 * 渲染视图
 * @param  {Object} req 参数输入
 * @param  {Object} res   响应
 * @param {function} afterRender 在渲染前的操作
 * @return {void}
 */
function renderView(req,res,afterRender) {
    var view;

    if(!req.input||req.input.error) {

        //如果页面加载，是错误信息页面
        res.proxyData = res.proxyData?res.proxyData:{};
        res.proxyData.reloadUrl = req.url;
        res.proxyData.message = req.input ? req.input.message : '';
        view = 'error/error';
    } else { 

        //获取视图
        view = req.input.config.view || getView(req.input.config.route);
    }

    //设置VO
    res.locals = res.proxyData;

    //如果是pjax，不组装布局
    if (req.headers['x-pjax']) {
        res.locals.layout = false;
    } else {
        delete res.locals.layout;
    }    

    debug('view:'+ view);

    //渲染HTML
    res.render(view,function(err,str) {

        //错误处理
        if(err) {
            req.next(err);
            return;
        }

        debug('view_html:'+ str);

        //在发送渲染结果前的一些操作
        if(afterRender) {
            str = afterRender(res,str);
        }

        debug('after view_html:'+ str);

        //发送渲染结果
        res.send(str);
        return;
    });
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