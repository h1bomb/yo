/**
 * tag页控制器文件
 * @author: xuqi(qi.xu@yoho.cn)
 * @date: 2015/4/9
 */
var data = require('../../public/js/data')('tag'),
    matchsData = require('../../public/js/data')('matchs');

exports.show = function(req, res) {
    res.render('pages/tag', {
        data: data,
        layout: '../layouts/layout',
        isTag: true,
        isLogin: 'N'
    });
};


exports.loadMatchs = function(req, res) {
    res.send({
        code: 200,
        data: {
            end: false,
            infos: matchsData
        }
    });
};