todos用yo来实现的说明
===================

本文档的目的是通过一个todos的例子讲下如何用yo进行前端开发，包含开发流程全过程，涵盖：开发，构建，测试，调试，部署。规范前端开发的工作流，后续会补充单元测试的部分。

## 中间使用到的工具和框架

### 服务端：
* yo（express，一些必要的中间件）
* npm（安装node模块）

### 客户端：
* sea.js(客户端依赖包处理)
* SPM（客户端依赖包管理）
* gulp（项目构建，js，css，预处理，合并，压缩，部署）
* compass（css预编译）
* npm（工具依赖管理）

## 目录结构：

```
yo.todo
 |_client  客户端目录
 |  |_js   前端js源码目录
 |  |_sass sass源码目录
 |  |_index.js  前端js的入口文件
 |  |_package.json  项目构建文件（依赖包）
 |  |_gulpfile.js  项目构建gulp脚本
 |_server  服务端目录
 |  |_adapters  接口适配业务代码目录
 |  |_interface  接口配置文件目录
 |  |_stub  后端桩代码目录
 |  |_views 视图目录
 |  |_app.js  应用入口文件
 |  |_staticConfig.js 静态文件路径配置
 |  |_package.json  项目构建文件（服务端端）
 |_public  静态资源目录（用于开发，测试阶段）
    |_css
    |_sea.js 依赖seajs

```

## 服务初始化的过程：

<iframe id="embed_dom" name="embed_dom" frameborder="0" style="border:1px solid #000;display:block;width:700px; height:500px;" src="https://www.processon.com/embed/55fd7ef8e4b00fa66f1009b7"></iframe>

## 请求调用过程

<iframe id="embed_dom" name="embed_dom" frameborder="0" style="border:1px solid #000;display:block;width:670px; height:320px;" src="https://www.processon.com/embed/55fe57eae4b00fa66f125212"></iframe>

## 开发步骤
准备：

* 安装必要的开发工具,当然先得安装node.js,具体参考[这里](https://nodejs.org/)。
* 安装compass,先安装ruby，参考[这里](http://www.ruanyifeng.com/blog/2012/11/compass.html)
* 安装spm,运行`npm install spm@3.4.3 -g`（spm3.4.3之后使用了webpack，所以暂时用3.4.3）。
* 安装gulp，运行`npm install gulp -g`(如果安装了cnpm，可以替代npm)。
* 安装slush，运行`npm install slush -g`（用于创建空项目）。
* 安装slush-yo,运行`npm install slush-yo -g`(yo项目模板)。

### 新建一个空项目
```
mkdir todos
cd todos
slush yo
cd client
spm install
npm install
cd server
npm install
```
在mac或者ubuntu上需要用`sudo`。

运行空项目：
```
redis-server -port 7777

node app
```
可以看到如图：
![运行成功](http://7mj4k1.com1.z0.glb.clouddn.com/0416BFD2-66BD-4DAA-9246-33ED700FDCE1.png)

### 编写服务接口配置
需要存储todo list的服务，这个例子数据和状态主要保存服务端，

* 添加一个todo;
* 编辑一个todo;
* 获取todo列表；
* 切换todo的状态；
* 删除todo；
* 清除已完成的todo；

代码如下：

server/stub/router.js

``` javascript
var list = [];
var toggleAll = false;
module.exports = function(app) {

    //添加
    app.post('/todo', function(req, res) {
        if (req.body.todo) {
            list.push({
                id: uuid(),
                todo: req.body.todo,
                state: 0
            });
            res.send(ret(true));
        } else {
            res.send(ret(false));
        }
    });

    //编辑保存
    app.put('/todo/:id', function(req, res) {
        var saved = false,
            state;
        if (req.params.id) {
            for (var i = 0; i < list.length; i++) {
                if (req.params.id === list[i].id) {
                    setval(req.body.todo, req.body.state, list[i]);
                    saved = true;
                }
            }
        }
        res.send(ret(saved));
    });

    //首页
    app.get('/todos', function(req, res) {
        var data = ret(true, list);
        res.send(data);
    });

    //删除
    app.delete('/todo/:id', function(req, res) {
        var isDel = false;
        if (req.params.id) {
            for (var i = 0; i < list.length; i++) {
                if (req.params.id === list[i].id) {
                    list.splice(i, 1);
                    isDel = true;
                    break;
                }
            }
        }
        res.send(ret(isDel));
    });

    //切换状态
    app.put('/todos/toggleall', function(req, res) {
        for (var i = 0; i < list.length; i++) {
            if (!toggleAll) {
                list[i].state = 1;
            } else {
                list[i].state = 0;
            }
        }
        toggleAll = !toggleAll;
        res.send(ret(true));
    });

    //清除完成项
    app.delete('/todos/completed', function(req, res) {
        var unCompleted = [];
        for (var i = 0; i < list.length; i++) {
            if (list[i].state === 0) {
                unCompleted.push(list[i]);
            }
        }
        list = unCompleted;
        return res.send(ret(true, list));
    });
}

...

```
可以用postman类似的http客户端测试下服务：

![postman](http://7wy47w.com1.z0.glb.clouddn.com/C031899C-515A-455E-9013-D5126B1ABDAE.png)

### 编写前端view对应后端服务的接口配置和接口适配

```javascript
exports.domain = 'http://localhost:3000';
exports.res =
    [{
    route: '/',
    method: 'GET',
    view: 'pages/index',
    url: '/todos/',
    params: []
}, {
    route: '/:state',
    method: 'GET',
    view: 'pages/index',
    url: '/todos/',
    adapter: 'index',
    params: []
}];
```
目前的todo的view只有一个，为了使不同状态的匹配加了"/:state"的路由。
后端映射到同一个接口。

后端服务也许无法满足你前端展示的要求，所以，会在适配层，加一些返回数据结构的处理。
适配层的业务注入规约：会找到interface的路由作为注入的原则（路由名称+请求方法），或者指定路由的适配的业务模块。
代码如下（server/adapters/index.js）
```javascript
exports.get = function(data, req, res) {
    var states = ['active', 'completed'];
    var curState = 'all';
    var curStateVal = 3;
    data.completedTodos = false; //完成的todos
    data.activeTodoWord = 'items';//todo单位的单复数
    data.activeTodoCount = 0;//当前未完成todo
    data.allCount = data.data.length;//所有的todo数量
    data.module = 'todos';//js的入口模块
    var curData = [];

    for (var j = 0; j < states.length; j++) { //判断过滤条件
        if (states[j] === req.proxyParams.params.state) {
            curState = states[j];
            curStateVal = j;
            break;
        } else {
            curState = 'all';
            curStateVal = 3;
        }
    }

    data[curState] = true; //设置当前的过滤条件

    for (var i = 0; i < data.data.length; i++) {
        if (data.data[i].state === 1) { //设置是否有完成
            data.completedTodos = true;
            data.data[i].completed = true;
        } else {
            data.activeTodoCount++; //设置todo的数据
        }

        if (data.data[i].state === curStateVal) {
            curData.push(data.data[i]); //过滤数据
        }
    }

    if (curStateVal !== 3) { //设置过滤后的数据
        data.data = curData;
    }

    if (data.activeTodoCount === 1) { //设置展示单复数
        data.activeTodoWord = 'item';
    }
    return data;
}

```

### 编写模板

拆解页面结构：

```
layout
  \_header
  \_todo
    \_header
    \_section
    \_footer
    \_bottom
  \_footer

```

其中，header，todo/header,todo/section,todo/footer,todo/bottom,footer都是partials
采用handlebars模板编写。
当前后端返回数据时，在前端进行数据绑定生成HTML。
![没有样式的视图](http://7wy47w.com1.z0.glb.clouddn.com/78F31156-3915-4DBB-847C-FFF611125C2C.png)

### 编写css样式
编写样式采用compass的方式，用compass watch，实时编译成css。

到client目录，直接`compass watch`

可以按照partials，拆分样式。
配置生成文件，在config.rb,或者使用gulp进行的构建。
![添加样式后](http://7wy47w.com1.z0.glb.clouddn.com/B9B70361-8948-411C-908F-00B503DDB8B2.png)


### 编写JS前端逻辑
前端需要操作服务端的todo的内容，并且展现，主要是增删查改这些操作，同时绑定相关的事件。这个例子里面使用jquery和pjax等，所以需要在`client`下的`package.json`,添加依赖包：
```javascript
  "spm": {
    "main": "index.js",
    "dependencies": {
      "jquery": "1.8.3",
      "jquery-pjax-183": "1.0.0",
      "nprogress-183": "0.1.6",
      "import-style": "1.0.0"
    },
   ...
```
需要执行`spm install`。

前端的主要逻辑在`js/todos.js`里面，代码如下：
```javascript
/**
 * todos
 *
 * todos的前端代码
 * 只提交todo的操作，服务端维护todo状态
 */

var $ = require('jquery');
var NProgress = require('nprogress-183');
require('jquery-pjax-183');

/**
 * 初始化Pjax
 *
 * @return void
 */
function initPjax() {
    $(document).pjax('a', '#pjax-container');

    $(document).on('pjax:start', function() {
        NProgress.start();
    });

    $(document).on('pjax:end', function() {
        NProgress.done();
    });
}

var ENTER_KEY = 13; //回车键
var ESCAPE_KEY = 27; //esc键

var $newTodoInput = $("#new-todo"), //新建一个todo
    $listLi = $("#todo-list li"), //列表单元
    $listToggle = $("#todo-list .toggle"), //切换todo状态
    $listLiEdit = $("#todo-list .edit"), //编辑输入
    $toggleall = $("#toggle-all"), //切换所有的todo状态
    $listDestroy = $("#todo-list .destroy"), //删除todo
    $clearCompleted = $("#clear-completed"); //清除完成的


/**
 * 界面操作对象
 * @type {Object}
 */
var actions = {
    toggleAll: {
        url: '/todos/toggleall',
        method: 'PUT',
        eventHandle: [{
            event: 'click',
            elem: $toggleall
        }]
    },
    add: {
        url: '/todo',
        method: 'POST',
        eventHandle: [{
            event: 'keyup',
            elem: $newTodoInput,
            handle: function(e) {
                if (e.which === ENTER_KEY) {
                    actions.add.data = {
                        todo: $(e.target).val() + ''
                    };
                    $(e.target).val('');
                    return true;
                }
            }
        }]
    },
    edit: {
        url: '/todo/',
        method: 'PUT',
        before: function(elem) {
            this.params = elem.parents('li').attr('data-id');

            var state = elem.parents('li').find('.toggle').attr('checked') ? 1 : 0;

            this.data = {
                todo: elem.parents('li').find('label').text(),
                state: state
            };
        },
        eventHandle: [{
            event: 'click',
            elem: $listToggle
        }, {
            event: 'dblclick',
            elem: $listLi,
            handle: function(e) {
                var $input = $(e.target).closest('li').addClass('editing').find('.edit');
                $input.val($input.val()).focus();
                return false;
            }
        }, {
            event: 'keyup',
            elem: $listLiEdit,
            handle: function(e) {
                var val = e.target.value;
                if (e.which === ENTER_KEY) {
                    $(e.target).blur();

                    $(e.target).parents('li').find('label').text(val);
                    return true;
                }

                if (e.which === ESCAPE_KEY) {
                    $(e.target).blur();
                }

                return false;
            }

        }, {
            event: 'blur',
            elem: $listLiEdit,
            handle: function(e) {
                $(e.target).parents('li').removeClass('editing');
            }
        }]
    },
    remove: {
        url: '/todo/',
        method: 'DELETE',
        before: function(elem) {
            this.params = elem.parents('li').attr('data-id');
        },
        eventHandle: [{
            event: 'click',
            elem: $listDestroy,
            handle: function() {
                return true;
            }
        }]
    },
    clearCompleted: {
        url: '/todos/completed',
        method: 'DELETE',
        eventHandle: [{
            event: 'click',
            elem: $clearCompleted
        }]
    }
}

/**
 * 事件绑定操作
 * @return {void}
 */
function bind() {
    $.each(actions, function(key, value) {
        $.each(value.eventHandle, function(index, hb) {
            hb.elem.live(hb.event, function(e) {
                var isSend = false;
                if (hb.handle) {
                    isSend = hb.handle(e);
                } else {
                    isSend = true;
                }
                if (isSend) {
                    if (value.before) {
                        value.before($(e.target));
                    }
                    send(value);
                }
            });
        });
    });
    initPjax();
}

/**
 * 发送操作信息
 * @param  {Object} hb
 * @return {void}
 */
function send(hb) {
    var url = hb.url + (hb.params || '');
    $.ajax({
        url: url,
        type: hb.method,
        data: hb.data ? hb.data : null,
        dataType: "json"
    }).done(function(data) {
        if (data.opts) {
            $.pjax.reload('#pjax-container');
        } else {
            alert('something wrong!');
        }
    }).fail(function() {
        alert('something wrong!');
    });
}


bind();
```
### 整理联调
代码编写完成后，可以通过`gulp start`,进行代码联调。
看看有没有问题，修复开发过程中疏漏的点。在yo中，如果是开发环境，会自动启用smp的服务，对于拆散js的组合调用，可以用chrome dev tool进行前端调试，后端调试，可以使用`npm install -g node-inspector`,用`node-debug app.js`进行服务端的代码调试。
![chrome dev tool](http://7wy47w.com1.z0.glb.clouddn.com/EE3F2819-9B70-4DF3-88F1-AB171750DD97.png)

服务端的express传参，和变量数据，可以通过`express-debug`查看
![express-debug](http://7wy47w.com1.z0.glb.clouddn.com/99C72E62-EC9C-4357-89B6-43902ACA9E34.png)

### 构建项目
到此为止，已经把todos的功能已全部实现但是，工作流程，才走了一半，后面将会执行构建，将现有的项目，部署到测试环境，当测试环境测试没有问题，讲发布到生产。

而做这些事情，可以由gulp来完成，gulp可以编写管道式的构建过程，高效的将需要的自动化过程执行。
目前前端的gulp涉及如下的任务：

* 运行server
* compass的实时预处理
* js的合并和库文件的合并
* 样式的合并
* 部署到CDN

代码清单详见：client/gulpfile.js。

#### 测试代码打包
```
cd client
gulp

```
测试环境运行
```
cd ..
NODE_ENV=test node server/app
```
#### 生产环境发布和运行

把代码部署到CDN
```
cd client
gulp dist
```
运行生产环境,需要保证服务不会挂掉，所以需要使用MP2来进行进程守护，以及服务监控和治理。
```
cd ..
NODE_ENV=production pm2 start server/app
```
## 后续补充工作流

* 单元测试
* 持续集成
* 代码检查

## 后续待做事项

* 组件化
* 前后端分离（接口规范）
* docker化
