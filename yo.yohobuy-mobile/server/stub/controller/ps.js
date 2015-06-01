/**
 * plus/star页控制器文件
 * @author: xuqi(qi.xu@yoho.cn)
 * @date: 2015/4/15
 */
var data = require('../../public/js/data')('ps'),
    path = require('path'),
    fs = require('fs'),
    tplPath = path.normalize(path.join(__dirname, '../partials/ps/info-item.html'));

exports.show = function(req, res) {
    res.render('pages/ps', {
        data: data,
        layout: '../layouts/layout',
        isPs: true,
        isLogin: 'Y'
    });
};

exports.readTpl = function(req, res) {
    fs.readFile(tplPath, 'utf8', function(err, data) {
        if (err) {
            res.send({success: false});
        }

        fs.readFile(
            path.normalize(path.join(__dirname, '../partials/common/time-view-like-share.html')),
            'utf8', function(err, subData) {
            if (err) {
                res.send({success: false});
            }
            data = data.replace('{{> common/time_view_like_share}}', subData); //Note: 后端需将partials目录替换为内容
            res.send(data);
        });
    });
};