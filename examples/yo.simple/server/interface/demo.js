exports.domain = 'http://localhost:3000';
exports.res =
    [{
        route: '/',
        method: 'GET',
        view: 'pages/index',
        url: '/stub/',
        params: []
    },{
        route: '/noapi',
        view: 'pages/noapi',
        method: 'GET',
        noApi:true,
    }];