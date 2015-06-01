/**
 * saunter页控制器文件
 * @author: xuqi(qi.xu@yoho.cn)
 * @date: 2015/3/27
 */
var data = require('../../public/js/data')('saunter');

exports.show = function(req, res) {
    var ret = {
        data: data,
        isSaunter: true,
        isLogin: 'N'
    };
    var retStr = JSON.stringify(ret);
    res.send(retStr);
};

exports.optimize = function(req, res) {
    res.render('pages/saunter-optimize', {
        data: data,
        layout: '../layouts/layout',
        isSaunterOptimize: true
    });
};