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
var debug = require('debug')('mid-proxy');
var request = require('request');
var _ = require('lodash');
var util = require('../util');
var ret = {};
var count = 0;

/**
 * 接口代理中间件
 * @param  {Request} req 请求对象
 * @param  {Response} res 返回对象
 * @param  {Function} next 传递处理
 * @return {void}
 */
module.exports = function(req, res, next) {
  var input = req.input,
    apiNum = 1;

  ret = {};
  count = 0;
  //没有入参，跳过
  if (!input) {
    next();
    return;
  }
  //如果前置校验有错，直接跳过
  if (input.error) {
    next();
    return;
  }
  //接口传参
  var params = {
    domain: input.config.domain, //接口域名
    api: input.config, //接口配置
    params: input.params, //传参处理
    apiNum: apiNum, //接口数量
    next: next, //express next
    res: res, //express 请求返回对象
    req:req//express 请求对象
  };


  //根据接口配置调用
  if (input.config.apis) {
    apiNum = _.size(input.config.apis);
    params.apiNum = apiNum;

    _.forEach(input.config.apis, function(v, k) {
      if (typeof v === 'object') {
        v.domain = v.domain ? v.domain : input.config.domain;
      }

      var p = _.clone(params);
      p.api = v;
      p.params = input.params[k];
      callApi(p,k);
    });
  } else {
     callApi(params);
  }
};

/**
 * 处理结果
 * @param  {Object} params 参数
 * @package {String} key 多个接口的key值
 * @return {void}        无
 */
function procRet(params,key) {
  if(params.body) {
    if (params.apiNum > 1) {
      ret[key] = util.jsonParse(params.body,params.req.app);
    } else {
      ret = util.jsonParse(params.body,params.req.app);
    }
  }

  //默认返回数据存在,合并该数据到返回数据（以返回数据为主）
  var defaultData = params.req?params.req.input.config.data:null;
  if(defaultData) {
    params.res.proxyData = _.merge(defaultData,ret);
  } else {
    params.res.proxyData = ret;
  } 

  count++;
  if (params.apiNum === count) {
    params.req.app.yolog.api.log('info','server api after proc:',params.res.proxyData);
    params.next();
  }
}


/**
 * 调用API
 * @param  {Object}   params  domain 域名
 * @param {String} key 接口的key值
 * next触发函数   res    请求返回
 * @return {void}            无
 */
function callApi(params,key) {
  
  //如果没有设置URL,直接返回
  if(!params.api.url) {
     procRet(params,key);
     return;
  } 
  
  //缓存接口返回
  if (params.res.getCache) {

    var cacheKey = params.res.genKey(params.domain, params.api.url, JSON.stringify(params.params));

    params.res.getCache(cacheKey, function(err, body) {
      if (!err && body) {
        debug(cacheKey + ' cached!');
        params.body = body;
        procRet(params,key);
      } else {
        callServer(params,key);
        debug(cacheKey + '  cache expired!');
      }
    });
  } else {
    callServer(params,key);
  }
}

/**
 * 调用服务
 * @param  {Object}   params  传参
 * @param {string} key 接口的key值
 * @return {void}       无
 */
function callServer(params,key) {
  debug("enter proxy!");
  
  //调用接口的配置
  var options = {
    url: params.domain + params.api.url,
    method: params.api.method,
  };
  
  //如果设置api的方法,就使用API的方法
  if (params.api.apiMethod) {
    options.method = params.api.apiMethod;
  }

  //如果是GET采用head传参，否则使用表单传参
  if(options.method === 'GET') {
    options.qs = params.params;
  } else {
    options.form = params.params;
  }
  
  //如果是json字符串，按json raw方式传递
  if(params.api.isJsonRaw) {
    options.headers =  {
       'Content-Type' : 'application/json'
    };
    options.body = JSON.stringify(params.params);
    delete options.form;
  }
  //如果自定义headers，加到服务调用
  if(params.req._yoheaders) {
    options.headers = options.headers||{};
    options.headers = _.merge(options.headers,params.req._yoheaders);
  }

  params.req.app.yolog.api.log('verbose','server api input: ',options);
  params.req.app.yolog.profile('proxy api time:'+options.url,'api');
  request(options, function(error, response, body) {
    params.req.app.yolog.profile('proxy api time:'+options.url,'api');
    if (response && response.statusCode === 200) {
      params.req.app.yolog.api.log('verbose','server api status 200 output:',body);
      if (params.res.setCache) {
        var cacheKey = params.res.genKey(params.domain, params.api.url, JSON.stringify(params.params));

        params.res.setCache(cacheKey, body, params.api.cache);
      }
      params.body = body;
      debug("proxy callback!");
      debug(params);
      procRet(params,key);
    } else {
      //如果调用出错,设置错误返回
      params.req.input = {
          error:true,
          message:'api server error!'
      };
      //如果有响应，修改返回
      if (response) {
        params.req.input.message = 'error: ' + response.statusCode;
        params.req.app.yolog.log('error','server api error input: %j',options,{});
        params.req.app.yolog.log('error','server api error %d output: %j',response.statusCode,body,{});
      } else {
        params.req.app.yolog.log('error','server api error input: %j',options,{});
        params.req.app.yolog.log('error','call server api yo response: %j',params.req.input,{});
      }
      params.next();
    }
  });
}