exports.domain = 'http://localhost';//http://uic.yoho.com
exports.res =
[
	{
		route: '/user/:userid',
		method: 'GET',
		url: '/user',
		params: [
			{
				name:'userid',
				type: 'Number',
				maxLength: '10',
				minLength: '6',
				reg: /^\d{6,10}$/,
				message:'必须是6-10位的数字'
			}
		]
	}
];
