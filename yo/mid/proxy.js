var request = require('request');

/**
 * 接口代理中间件
 * @param  Request
 * @param  Response
 * @param  next
 * @return void
 */
module.exports = function proxy(req, res, next) {
	var input = req.input;
	if (!input) {
		next();
		return;
	}
	request({
		url: input.config.domain + input.config.url,
		method: input.config.method,
		qs: input.params
	}, function(error, response, body) {
		if (response && response.statusCode == 200) {
			res.proxyData = JSON.parse(body);
			next();
		} else {
			if (response) {
				next(new Error('error: ' + response.statusCode));
			} else {
				next(new Error('api server error!'));
			}
		}
	});
}