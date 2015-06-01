/**
 * 点赞/关注功能控制器文件
 * @author: xuqi(qi.xu@yoho.cn)
 * @date: 2015/5/7
 */

exports.show = function(req, res) {
    res.render('pages/template', {
        data: data,
        layout: '../layouts/layout',
        isTemplate: true
    });
};

//商品收藏或取消收藏
exports.prod = function(req, res) {
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
};

//品牌收藏或取消收藏
exports.brand = function(req, res) {
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
};

//文章点赞或取消点赞
exports.article = function(req, res) {
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
};