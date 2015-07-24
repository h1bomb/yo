exports.domain = 'http://api.douban.com';
exports.res =
    [{
    route: '/book/:id',
    method: 'GET',
    url: '/v2/book/1220562',
    params: [{
        name: 'id',
        type: 'Number',
        maxLength: 10,
        minLength: 6,
        reg: /^\d{6,10}$/,
        message: '必须是6-10位的数字'
    }]
}];