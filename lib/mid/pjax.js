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
        var isAppendData = false;//是否是需要附加返回值
        var isJsonRes = (accept.indexOf("json") > -1);//是否是json的返回

        //判断是否需要附加返回，如果是json，默认不返回
        if((req.input && req.input.config.isAppendData)||!isJsonRes) {
            isAppendData = true;
        } else {
            //如果有proxyData，并且不附加返回值，则删除环境参数
            if(res && res.proxyData) {
                delete res.proxyData._env;
            }
        }
        //如果附加数据存在，合并附加数据到视图中
        if(res.appendData && isAppendData) {
            res.proxyData = _.merge(res.proxyData,res.appendData);
        }
        //如果是json
        if(isJsonRes) {
            jsonRet(req,res);
            return;
        }
        else {
            //渲染HTML界面
            renderView(req,res,options.afterRender);
            return;
        }
    };
};

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
        req.app.yolog.log('error','error 404');
    } else if(req.input.error) {
        state = 500;
        data.message = req.input.message ? req.input.message:'';
        req.app.yolog.log('error','error 500',req.input);
    } else {
        data.data = res.proxyData;
    } 
    req.app.yolog.log('verbose','pjax vo: %j',data,{});
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
        req.app.yolog.log('error','error view:',res.proxyData);
    } else { 

        //获取视图
        view = req.input.config.view || getView(req.input.config.route);
    }

    //设置VO
    res.locals = res.proxyData;
    debug('res.proxyData:');
    debug(res.proxyData);
    //如果是pjax，不组装布局
    if (req.headers['x-pjax']) {
        res.locals.layout = false;
    } else {
        delete res.locals.layout;
    }    

    debug('view:'+ view);
    req.app.yolog.log('verbose','view %s | pjax vo: %j',view,res.proxyData);
    //渲染HTML
    res.render(view,function(err,str) {

        //错误处理
        if(err) {
            req.next(err);
            return;
        }

        debug('view_html');

        //在发送渲染结果前的一些操作
        if(afterRender) {
            str = afterRender(res,str);
        }

        debug('after view_html');

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