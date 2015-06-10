title: yo框架说明
speaker: Hbomb
url:http://git.dev.yoho.cn/hbomb/yoweb.git
------
[slide style="background-image:url('http://git.dev.yoho.cn/uploads/hbomb/yoweb/9becd67cb2/20150224074944369.jpg');background-size:100% 100%;"]
# yo是什么？
[slide]
# yo是一个基于express的前端表现层的框架。
[slide]
# 核心理念
## 简化前端开发流程 
## 实现前后端分离 
## 基于接口定义的分离
[slide]
# 使用第三方
## express --> web框架
## handlebars --> 模板引擎 
## spm --> 构建,包管理
## PJAX --> 渐进使用history.pushstate

[slide]
# 已有功能：
* 后端接口适配
* handlebars模板渲染
* 基于pjax：pushstate+Ajax
* SPM的调试中间件
* 开发，测试，生产环境的流程和构建
* SPM集成部署到CDN

[slide ]
## YO系统架构体系
![all](http://git.dev.yoho.cn/uploads/hbomb/yoweb/645ee01dc9/%E7%B3%BB%E7%BB%9F%E6%8B%93%E6%89%91%E5%9B%BE.png)
[slide]
# 注意事项
* 前端可以是nginx做一层反向代理
* Node App为业务粒度
* 多个Node App通过内存数据库做状态共享。
* 对于SOA 服务封装的API，进行接口交互。
* Node APP不会调用SOA服务或者数据库。

[slide]
# 使用中间件扩展

## 基础
## 功能
## 开发
## 自定义

[slide]
## 中间件
![middleware](http://git.dev.yoho.cn/uploads/hbomb/yoweb/f26792f5a0/Node_APP_Proxy_Server__2_.png)

[slide]
## 不同环境的构建和使用
![env](http://git.dev.yoho.cn/uploads/hbomb/yoweb/86bff00358/frontend_env_.png)

[slide]
# yo的app构建： 
# Gulp，SPM，compass

[slide]
# 环境

* 开发环境：使用spm-serve，调用spm目录下的js
* 测试环境：使用了public目录。
* 生产环境：部署到CDN。

[slide]
# 关于CDN的存储说明
![cdn](http://git.dev.yoho.cn/uploads/hbomb/yoweb/5e2460048d/CDN.png)

[slide]
# YO使用方法
 
[slide style="background:#fff"]
![path](http://git.dev.yoho.cn/uploads/hbomb/yoweb/6e8abbcdae/path.png)

[slide]
# 新建项目

`app.js`

``` javascript
var yo = require('../../yo/index');  //引用YO框架
var staticDir = require('./staticConfig').staticDir; //获取静态文件的不同环境配置
var app = yo({    //初始化yo的app
    appPath: __dirname + '/../', //应用所在目录
    tempExt: 'html', //模板引擎的扩展名
    envStatic: staticDir //静态文件的环境配置
});

require('./stub/routers')(app);//添加桩服务
```
[slide]
# 启动服务步骤

`git clone http://git.dev.yoho.cn/hbomb/yoweb.git`

到YO，SPM目录下面，分别运行如下命令：

`npm install -d`

如果没有安装gulp的，需要安装下`npm install gulp`,
如果没有安装compass，需要安装下`gem install compass`。

在SPM目录下，执行`spm install`

运行服务：`gulp` 。

具体的gulp的任务可以看下gulpfile。


[slide]
# 待实现功能：
* 多应用下，session的存储介质适配
* 后端mock服务的自动生成
* PageCache的实现
* 服务端处理逻辑的规划
* yo框架的适配层演进的规划
