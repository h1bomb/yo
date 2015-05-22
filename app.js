/* global __dirname */
// builtin
var fs = require('fs');

// 3rd party
var express = require('express');
var hbs = require('hbs');
var request = require('request');
var _ = require('lodash');
var bodyParser = require('body-parser');

var userInterfaces = require('./interface/user');
var app = express();

hbs.registerPartial('partial', fs.readFileSync(__dirname + '/views/partial.hbs', 'utf8'));
hbs.registerPartials(__dirname + '/views/partials');

// set the view engine to use handlebars
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));

function error(err, req, res, next) {
   console.error(err.stack);
   res.status(500);
   res.send('Internal Server Error');
}
app.use(error);

/**
 * 错误校验
 */
function validate(req, params) {
    var ret = {};
    var message = '';
    var error = false;
    _.forEach(params, function (v) {
        var val = req.params[v.name] || req.body[v.name];
        var flag = false;
        if (val) {
            if (v.maxLength && v.minLength) {
                if (val < v.maxLength + 1 && val > v.minLength - 1) {
                    flag = true;
                }
            }
            if (v.reg && v.reg.test(val)) {
                flag = true;
            }
            if (flag === true) {
                ret[v.name] = val;
            }
            else {
                message += v.name + ':' + v.message + '\n';
                error = true;
            }
        }
    });
    return {
        params: ret,
        message: message,
        error: error
    };
}

/**
 * 配置初始化接口路由
 * 
 */
function parseConfig(userInterfaces) {
    var domain = userInterfaces.domain;
    _.forEach(userInterfaces.res, function (val) {
        app[val.method.toLowerCase()](val.route, function (req, res) {
            var ret = validate(req, val.params);
            if (!ret.error) {
                request({
                    url: domain + val.url,
                    method: val.method,
                    qs: ret.params
                }, function (error, response, body) {
                        if (response && response.statusCode == 200) {
                            res.send(body);
                        } else {
                            console.log('error: ' + (response&&response.statusCode));
                            console.log(body);
                            if(response){
                                res.send('error: ' + response.statusCode);
                            }
                            else{
                                throw new Error('server error!');
                            }
                        }
                    });
            }
            else {
                res.send(ret.message);
            }
        });
    });
}

parseConfig(userInterfaces);

app.get('/', function (req, res) {

    res.locals = {
        some_value: 'foo bar',
        list: ['cat', 'dog']
    };

    res.render('index');
});



app.listen(3000);

