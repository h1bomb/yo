v1.0.0

* 后端接口适配（根据接口定义自动生成路由和输入验证）
* handlebars模板（根据数据+模板实现服务端渲染）
* pushstate的在现代浏览器的使用（基于pjax：push state+Ajax）
* 引入了SPM的调试中间件，可以进行代码的预处理依赖和调试（支持handlebars,es6,seajs预处理）
* 开发，测试，生产三个环境的yo应用开发过程和构建
* SPM集成部署到CDN

v1.0.1

* yo：非依赖api组合
* yo.yohobuymobile:实践pjax，api组合，逛首页实现

v1.0.2

* redis 接口缓存

v1.0.3

* dockerfile编写为持续集成做准备

v1.0.4

* 调整目录结构，计划编写单元测试

v1.0.5

* 再次调整目录结构，简化入口文件
* 引入单元测试覆盖率
* gulp 构建文档和代码检查
* 文档整理
* 修复若干BUG

v1.0.6

* yo 提交npm，改名为yo.js

v1.0.7

* 编写 todos例子
* slush编写
* 适配器匹配机制调整

v1.0.8
* 编写 todos例子的教材
* 去掉 hiredis的依赖（在mac上编译不过）

v1.0.9

* 支持不调用接口的服务配置
* 修复适配器的单元测试

v1.0.10

* 重新写了pjax中间件，去掉了缓存view的逻辑，把json和html render区分处理
* 重写了pjax中间件的单元测试
* 加入了两个可以注入的句柄（beforeMid，afterRender）

v1.0.12

* 修改了adapter中间件，添加了不next的配置
* 修改了proxy中间件，如果不是GET方法，采用表单提交
* 修改了pjax中间件，如果存在appendData，附件vo，合并到proxyData