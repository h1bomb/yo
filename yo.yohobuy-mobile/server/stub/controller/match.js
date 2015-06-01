/**
 * @desc: 搭配相关控制器
 * @author: xuqi(qi.xu@yoho.cn)
 * @date: 2015/5/11
 */
var path = require('path'),
    fs = require('fs'),
    tplPath = path.normalize(path.join(__dirname, '../partials/common/tag-content.html'));

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