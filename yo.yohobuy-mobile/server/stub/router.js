/**
 * 路由处理文件
 * @author: xuqi(qi.xu@yoho.cn)
 * @date: 2015/3/27
 */
var saunter = require('./views/controller/saunter'),
    tag = require('./views/controller/tag'),
    editor = require('./views/controller/editor'),
    ps = require('./views/controller/ps'),
    template = require('./views/controller/template'),
    fav = require('./views/controller/favorite'),
    match = require('./views/controller/match'),
    err = require('./views/controller/err');

module.exports = function(app) {
    app.get('/', saunter.show); //着陆页
    app.get('/optimize', saunter.optimize); //优化着陆页

    app.get('/tag', tag.show); //标签页
    app.get('/tags/get', tag.loadMatchs); //异步加载搭配内容
    app.get('/editor', editor.show); //编辑页

    app.get('/ps', ps.show); //plus + star
    
    app.get('/tpl', template.show); //模板页
    app.get('/activity/classification', template.readClassification); //读取分类数据
    app.get('/activity/search', template.search); //筛选查询
    
    app.get('/favorite/product', fav.prod); //商品收藏或取消收藏
    app.get('/favorite/brand', fav.brand); //品牌收藏或取消收藏
    app.get('/favorite/praise', fav.article); //文章点赞或取消点赞
    
    app.get('/common/articletpl', ps.readTpl); //获取相关资讯模板
    app.get('/common/goodinfo', template.readTpl); //读取模板
    
    app.get('/common/tagtpl', match.readTpl);
    
    
    app.get('/err', err.show);
};