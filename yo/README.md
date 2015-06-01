yo
------

yo是一个基于express的前端表层的框架。使用handlebars作为模板引擎,spm进行前端构建和依赖包管理。

已实现功能：

* 后端接口适配（根据接口定义自动生成路由和输入验证）
* handlebars模板（根据数据+模板实现服务端渲染）
* pushstate的在现代浏览器的使用（基于pjax：push state+Ajax）
* 引入了SPM的调试中间件，可以进行代码的预处理依赖和调试（支持handlebars,es6,seajs预处理）

待实现功能：
* 开发，测试，生产三个环境的yo应用开发过程
* SPM持续集成部署（含CDN）
* 后端mock服务的自动生成
* PageCache的实现
* 服务端处理逻辑的规划
* yo框架的适配层演进的规划


