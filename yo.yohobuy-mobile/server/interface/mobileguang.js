var apis = {
    getList: {
        route: '/tag',
        method: 'GET',
        view: 'pages/guang',
        url: '/guang/api/v1/article/getList',
        cache: 300,
        params: [{
            name: 'page',
            def: 1,
            type: 'Number',
            maxLength: 10,
            minLength: 1,
            reg: /^\d{1,10}$/,
            message: '必须是1-10位的数字'
        }, {
            name: 'gender',
            def: '1,3',
            type: 'string',
            message: '性别不能为空'
        }, {
            name: 'sort_id',
            def: 0,
            type: 'Number',
            maxLength: 1,
            minLength: 1,
            reg: /^\d{1,1}$/,
            message: '必须是1位的数字'
        }]
    },
    getCat: {
        id: 'getCat',
        route: '/cat',
        method: 'GET',
        url: '/guang/api/v1/category/get',
        cache: 600
    }
}
exports.apis = apis;
exports.domain = 'http://service.api.yohobuy.com';
exports.res =
    [{
        route: '/guang',
        method: 'GET',
        view: 'pages/guang',
        apis: [apis.getList, apis.getCat]
    }, apis.getList];