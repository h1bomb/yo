exports.domain = 'http://localhost:3000'; //'http://api.douban.com';
exports.res =
	[{
	route: '/user/:userid',
	view: 'user/default',
	method: 'GET',
	url: '/test', //'/v2/book/1220562',
	params: [{
		name: 'userid',
		type: 'Number',
		maxLength: 10,
		minLength: 6,
		reg: /^\d{6,10}$/,
		message: '必须是6-10位的数字'
	}]
}];