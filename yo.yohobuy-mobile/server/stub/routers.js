var getData = require('./data'),
    articlePath = path.normalize(path.join(__dirname, '../views/partials/ps/info-item.html')),
    goodsPath = path.normalize(path.join(__dirname, '../views/partials/common/good-info.html')),
    tagPath = path.normalize(path.join(__dirname, '../views/partials/common/tag-content.html'));
var stub = {
    '/': {
        data: getData('saunter'),
        isSaunter: true,
        isLogin: 'N'
    },
    '/optimize': {
        data: getData('saunter'),
        isSaunterOptimize: true
    },
    '/tag': {
        data: getData('tag'),
        isTag: true,
        isLogin: 'N'
    },
    '/tags/get': {
        code: 200,
        data: {
            end: false,
            infos: getData('matchs')
        }
    },
    '/editor': {
        data: getData('editor'),
        isEditor: true,
        isLogin: 'Y'
    },
    '/ps': {
        data: getData('ps'),
        isPs: true,
        isLogin: 'Y'
    },
    '/tpl': {
        data: getData('tpl'),
        isTemplate: true,
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
                'utf8', function(err, subData) {
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
                'utf8', function(err, subData) {
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
    '/err': {
        reloadUrl: '',
    }
}

module.exports = function(app) {
    var route, proc;
    for (route in stub) {
        app.get(route, function(req, res) {
            proc = stub[get];
            if (typeof proc === 'function') {
                proc(req, res);
            } else {
                res.send(proc);
            }
        })；
    }
}