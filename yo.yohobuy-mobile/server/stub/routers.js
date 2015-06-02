var path = require('path'),
    fs = require('fs'),
    getData = require('./data'),
    articlePath = path.normalize(path.join(__dirname, '../views/partials/ps/info-item.html')),
    goodsPath = path.normalize(path.join(__dirname, '../views/partials/common/good-info.html')),
    tagPath = path.normalize(path.join(__dirname, '../views/partials/common/tag-content.html'));
var stub = {
    '/stub': {
        data: getData('saunter'),
        module: 'saunter',
        isLogin: 'N'
    },
    '/stub/optimize': {
        data: getData('saunter'),
        module: 'saunter',
    },
    '/stub/tag': {
        data: getData('tag'),
        module: 'tag',
        isLogin: 'N'
    },
    '/tags/get': {
        code: 200,
        data: {
            end: false,
            infos: getData('matchs')
        }
    },
    '/stub/editor': {
        data: getData('editor'),
        module: 'tag',
        isLogin: 'Y'
    },
    '/stub/ps': {
        data: getData('ps'),
        module: 'ps',
        isLogin: 'Y'
    },
    '/stub/tpl': {
        data: getData('tpl'),
        module: 'template',
        isLogin: 'Y'
    },
    '/activity/classification': {
        success: true,
        data: getData('classification')
    },
    '/activity/search': {
        success: true,
        data: {
            end: false, //数据是否结束
            goods: getData('search') //商品数据
        }
    },
    '/favorite/product': function(req, res) {
        if (req.query.st === '0') {
            res.send({
                code: 400,
                message: "",
                data: null
            });
        } else {
            res.send({
                code: 200,
                message: "",
                data: null
            });
        }
    },
    '/favorite/brand': function(req, res) {
        if (req.query.st === '0') {
            res.send({
                code: 400,
                message: "",
                data: null
            });
        } else {
            res.send({
                code: 200,
                message: "",
                data: null
            });
        }
    },
    '/favorite/praise': function(req, res) {
        if (req.query.st === '0') {
            res.send({
                code: 400,
                message: "",
                data: 99
            });
        } else {
            res.send({
                code: 200,
                message: "",
                data: 100
            });
        }
    },
    '/common/articletpl': function(req, res) {
        fs.readFile(articlePath, 'utf8', function(err, data) {
            if (err) {
                res.send({
                    success: false
                });
            }

            fs.readFile(
                path.normalize(path.join(__dirname, '../views/partials/common/time-view-like-share.html')),
                'utf8',
                function(err, subData) {
                    if (err) {
                        res.send({
                            success: false
                        });
                    }
                    data = data.replace('{{> common/time_view_like_share}}', subData); //Note: 后端需将partials目录替换为内容
                    res.send(data);
                });
        });
    },
    '/common/goodinfo': function(req, res) {
        fs.readFile(goodsPath, 'utf8', function(err, data) {
            if (err) {
                res.send({
                    success: false
                });
            }

            res.send(data);
        });
    },
    '/common/tagtpl': function(req, res) {
        fs.readFile(tagPath, 'utf8', function(err, data) {
            if (err) {
                res.send({
                    success: false
                });
            }

            fs.readFile(
                path.normalize(path.join(__dirname, '../views/partials/common/time-view-like-share.html')),
                'utf8',
                function(err, subData) {
                    if (err) {
                        res.send({
                            success: false
                        });
                    }
                    data = data.replace('{{> common/time_view_like_share}}', subData); //Note: 后端需将partials目录替换为内容
                    res.send(data);
                });
        });
    },
    '/stub/err': {
        reloadUrl: '',
    }
}

module.exports = function(app) {
    var route;
    for (route in stub) {
        var func = procFunc(stub[route]);
        app.get(route, func);
    }
}

function procFunc(proc) {
    if (typeof proc === 'function') {
        return proc;
    } else {
        return function(req, res) {
            res.send(proc);
        }
    }
}