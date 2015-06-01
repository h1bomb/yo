/**
 * 错误页面控制器文件
 * @author: xuqi(qi.xu@yoho.cn)
 * @date: 2015/5/25
 */

exports.show = function(req, res) {
    res.render('error/error', {
        reloadUrl: '',
        layout: '../layouts/layout'
    });
};