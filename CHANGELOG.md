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

v1.0.13

* 修改proxy中间件, 添加配置访问页面和实际接口方法不一致可以配置，增加配置项：apiMethod
* proxy，中支持json raw方式调用接口，配置方式：isJsonRaw，如果是true则为json raw方式

v1.0.14

* 在beforeCustMid的处理句柄添加proxyRoute的传参，方便中间件获取当前的路由表
* proxy中间件调整，错误信息的组装。

v1.0.15

* proxy中间件无论是是否代理后台接口，都可以加默认数据：data

v1.0.16

* proxy如果在配置文件不传url，默认不会调用服务接口
* validate和proxy调整调用多个接口时，采用map的key-value
* 调整了Demo例子

v1.0.17
* 修复proxy的错误，如果没有设置URL，不需要序列化返回结果

v1.0.18
* 修复validate的错误，当传参是数字型，在校验完成后没有转化数字型
* 修复proxy的返回值的作用域问题，当调用多个接口，没有把接口内容合并到一个结果集。
* 编写了JSON.parse工具封装，对json序列化错误进行异常捕获，并返回`{}`
* 针对以上BUG，编写了对应的单元测试用例。

v1.1.0
* 增加winston作为日志记录
* 可以设置接口默认的调用参数
