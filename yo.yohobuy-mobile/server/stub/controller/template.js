/**
 * 模板页控制器文件
 * @author: xuqi(qi.xu@yoho.cn)
 * @date: 2015/4/14
 */
var datas = require('../../public/js/data'),
    data = datas('tpl'),
    classification = datas('classification'),
    search = datas('search'),
    fs = require('fs'),
    path = require('path'),
    tplPath = path.normalize(path.join(__dirname, '../partials/common/good-info.html'));;

exports.show = function(req, res) {
    res.render('pages/template', {
        data: data,
        layout: '../layouts/layout',
        isTemplate: true,
        isLogin: 'Y'
    });
};

exports.readTpl = function(req, res) {
    fs.readFile(tplPath, 'utf8', function(err, data) {
        if (err) {
            res.send({
                success: false
            });
        }

        res.send(data);
    });
};

exports.readClassification = function(req, res) {
    res.send({
        success: true,
        data: classification
    });
};

exports.search = function(req, res) {
    res.send({
        success: true,
        data: {
            end: false, //数据是否结束
            goods: search //商品数据
        }
    });
};