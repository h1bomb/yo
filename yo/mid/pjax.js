var _ = require('lodash');

/**
 * pjaxcha插件
 * @param  {Request}
 * @param  {Response}
 * @param  {Function}
 * @return {[type]}
 */
module.exports = function pjax(req, res, next) {
    if (!req.input) {
        res.sendStatus(404);
        return;
    }
    var accept = req.headers.accept || "",
        ret = {},
        defaultView = getView(req.input.config.route),
        view = req.input.config.view || defaultView;
    res.locals = res.proxyData;

    if (~accept.indexOf("html")) {
        if (req.headers['x-pjax']) {
            res.locals.layout = false;
        }
        res.render(view);
    } else {
        res.send(JSON.stringify(res.proxyData));
    }
}

/**
 * 得到默认的视图
 * @param  {[type]}
 * @return {[type]}
 */
function getView(route) {
    var defaultViewArr = route.split('/'),
        defaultView = [];

    _.forEach(defaultViewArr, function(val) {
        if (val.indexOf(':') < 0 && val !== '') {
            defaultView.push(val);
        }
    });

    if (defaultView.length < 2) {
        defaultView.push('default');
    }
    defaultView = defaultView.join('/');
    return defaultView;
}