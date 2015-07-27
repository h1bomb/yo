var _ = require('lodash');

/**
 * pjax插件
 * @param  {Request}
 * @param  {Response}
 * @param  {Function}
 * @return {[type]}
 */
module.exports = function(req, res) {
    var accept = req.headers.accept || "";

    if (!req.input || req.input.error) {
        if (accept.indexOf("json") > -1) {
            res.status(404).send(JSON.stringify({
                code: 404,
                message: req.input ? req.input.message : ''
            }));
        } else {
            res.locals = {
                reloadUrl: req.url
            };
            res.render('error/error');
        }
        return;
    }

    var view = req.input.config.view || getView(req.input.config.route);

    res.locals = res.proxyData;

    if (accept.indexOf("json") > -1) {
        res.send(JSON.stringify(res.proxyData));
    } else {
        if (req.headers['x-pjax']) {
            res.locals.layout = false;
        }
        res.render(view);
    }
};

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
        } else if (val.indexOf(':') > -1) {
            var ret = val.split(':');
            if (ret[0]) {
                defaultView.push(val[0]);
            }
        }
    });

    if (defaultView.length < 2) {
        defaultView.push('default');
    }
    defaultView = defaultView.join('/');
    return defaultView;
}