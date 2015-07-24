var _ = require('lodash');
exports.get = function(data) {
    var content = [];
    _.forEach(data.data.list.artList, function(val) {
        var obj = {
            id: val.id,
            img: val.src.replace('?imageView/{mode}/w/{width}/h/{height}', '?imageView/2/w/640'),
            alt: val.title,
            title: val.title,
            text: val.intro,
            url: val.url,
            publishTime: val.publish_time,
            like: val.isFavor,
            share: false,
            pageView: val.views_num,
            categoryName: val.category_name
        };
        content.push(obj);
    });

    _.forEach(data.data.list.adlist, function(val) {
        val.src = val.src.replace('?imageView/{mode}/w/{width}/h/{height}', '?imageView/2/w/640');
    });

    var ret = {
        module: 'tag',
        isLogin: 'N',
        title: '逛',
        code: 200,
        data: {
            page: data.data.page + 1,
            gender: data.data.gender,
            content: content,
            slider: data.data.list.adlist,
            end: content.length ? false : true
        }
    };
    return ret;
}