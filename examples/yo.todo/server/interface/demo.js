exports.domain = 'http://localhost:3000';
exports.res =
    [{
        route: '/',
        method: 'GET',
        view: 'pages/index',
        url: '/todos/',
        params: []
    }, {
        route: '/:state',
        method: 'GET',
        view: 'pages/index',
        url: '/todos/',
        adapter: 'index',
        params: []
    }, {
        route: '/toggleall',
        method: 'PUT',
        url: '/todos/',
        params: []
    }];