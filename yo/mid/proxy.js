var request = require('request');
var _ = require('lodash');
/**
 * 接口代理中间件
 * @param  Request
 * @param  Response
 * @param  next
 * @return void
 */
module.exports = function proxy(req, res, next) {
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
		})
	} else {
		callApi(input.config.domain, input.config, input.params[0], apiNum, next, res);
	}

	function callApi(domain, api, params, apiNum, next, res) {
		if (res.getCache) {
			res.getCache(domain, api.url, params, function(err, body) {
				if (!err && body) {
					procRet(domain, api, apiNum, next, res, body);
				} else {
					callServer(domain, api, params, apiNum, next, res);
				}
			});
		} else {
			callServer(domain, api, params, apiNum, next, res);
		}
	}


	function callServer(domain, api, params, apiNum, next, res) {
		request({
			url: domain + api.url,
			method: api.method,
			qs: params
		}, function(error, response, body) {
			if (response && response.statusCode == 200) {
				if (res.setCache) {
					console.log(api);
					res.setCache(domain, api.url, params, body, api.cache);
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

	function procRet(domain, api, apiNum, next, res, body) {
		if (apiNum > 1) {
			ret[api.method + domain + api.url] = JSON.parse(body);
		} else {
			ret = JSON.parse(body);
		}

		res.proxyData = ret;
		count++;

		if (apiNum == count) {
			next();
		}
	}
}