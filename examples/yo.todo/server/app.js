var yo = require('../../../index'); //引用YO框架
var staticDir = require('./staticConfig').staticDir; //获取静态文件的不同环境配置

var app = yo({ //初始化yo的app
    appPath: __dirname + '/../', //应用所在目录
    tempExt: 'html', //模板引擎的扩展名
    envStatic: staticDir //静态文件的环境配置
});

require('./stub/routers')(app); //添加桩服务