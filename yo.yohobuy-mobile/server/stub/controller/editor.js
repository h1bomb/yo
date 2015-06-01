/**
 * tag页控制器文件
 * @author: liuyue(yue.liu@yoho.cn)
 * @date: 2015/4/9
 */
var data = require('../../public/js/data')('editor');

exports.show = function(req, res) {
    res.render('pages/tag', {
        data: data,
        layout: '../layouts/layout',
        isEditor: true,
        isLogin: 'Y'
    });
};