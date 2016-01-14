
var env = process.env.NODE_ENV || 'development';
/**
 * 环境的配置
 * @type {Object}
 */
var domain = {
    development:'http://localhost:3000',
    test:'http://localhost:3000',
    preview:'http://localhost:3000',
    production:'http://localhost:3000'
};

exports.domain = domain[env];
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
}];