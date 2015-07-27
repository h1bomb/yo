var request = require('request');
var _ = require('lodash');
/**
 * 接口代理中间件
 * @param  Request
 * @param  Response
 * @param  next
 * @return void
 */
module.exports = function(req, res, next) {
  var input = req.input,
    apiNum = 1,
    ret = {},
    count = 0;

  if (!input) {
    next();
    return;
  }
  if (input.error) {
    next();
    return;
  }

  if (input.config.apis) {
    apiNum = input.config.apis.length;
    _.forEach(input.config.apis, function(v, k) {
      v.domain = v.domain ? v.domain : input.config.domain;
      callApi(input.config.domain, v, input.params[k], apiNum, next, res);
    });
  } else {
    callApi(input.config.domain, input.config, input.params[0], apiNum, next, res);
  }

  /**
   * 调用API
   * @param  {string}   domain 域名
   * @param  {string}   api    接口
   * @param  {array}   params 传参
   * @param  {number}   apiNum 接口数量
   * @param  {Function} next   next触发函数
   * @param  {Object}   res    请求返回
   * @return {void}          无
   */
  function callApi(domain, api, params, apiNum, next, res) {
    if (res.getCache) {

      var key = res.genKey(domain, api.url, JSON.stringify(params));

      res.getCache(key, function(err, body) {
        if (!err && body) {
          console.log(key + ' cached!');
          procRet(domain, api, apiNum, next, res, body);
        } else {
          callServer(domain, api, params, apiNum, next, res);
          console.log(key + '  cache expired!');
        }
      });
    } else {
      callServer(domain, api, params, apiNum, next, res);
    }
  }

  /**
   * 调用服务
   * @param  {string}   domain 域名
   * @param  {string}   api    接口
   * @param  {array}   params 传参
   * @param  {number}   apiNum 接口数量
   * @param  {Function} next   next触发函数
   * @param  {Object}   res    请求返回
   * @return {void}          无
   */
  function callServer(domain, api, params, apiNum, next, res) {
    request({
      url: domain + api.url,
      method: api.method,
      qs: params
    }, function(error, response, body) {
      if (response && response.statusCode === 200) {
        if (res.setCache) {
          var key = res.genKey(domain, api.url, JSON.stringify(params));

          res.setCache(key, body, api.cache);
        }
        procRet(domain, api, apiNum, next, res, body);
      } else {
        if (response) {
          next(new Error('error: ' + response.statusCode));
        } else {
          next(new Error('api server error!'));
        }
      }
    });
  }

  /**
   * 处理结果
   * @param  {string}   domain 域名
   * @param  {string}   api    接口
   * @param  {number}   apiNum 接口数量
   * @param  {Function} next   next触发函数
   * @param  {Object}   res    请求返回
   * @param  {Object}   body   请求结果
   * @return {void}          无
   */
  function procRet(domain, api, apiNum, next, res, body) {
    if (apiNum > 1) {
      ret[api.method + domain + api.url] = JSON.parse(body);
    } else {
      ret = JSON.parse(body);
    }

    res.proxyData = ret;
    count++;

    if (apiNum === count) {
      next();
    }
  }
};