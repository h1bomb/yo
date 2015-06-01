exports.domain = 'http://localhost:3000';
exports.res =
    [{
    method: 'GET',
    view: 'pages/saunter'
    url: '/',
    params: []
}, {
    method: 'GET',
    view: 'pages/saunter-optimize'
    url: '/optimize',
    params: []
}, {
    method: 'GET',
    view: 'pages/tag'
    url: '/tag',
    params: []
}, {
    method: 'GET',
    view: 'pages/tag',
    url: '/editor',
    params: []
}, {
    method: 'GET',
    view: 'pages/ps',
    url: '/ps',
    params: []
}, {
    method: 'GET',
    view: 'pages/template',
    url: '/tpl',
    params: []
}, {
    method: 'GET',
    view: 'error/error',
    url: '/err',
    params: []
}];