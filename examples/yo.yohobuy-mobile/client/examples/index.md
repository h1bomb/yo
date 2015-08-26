# Demo

---

## 引用方式

### seajs的路径

````html
<script src="../static/js/sea.js?nowrap"></script>
````

### 配置样式表的路径
````
<link rel="stylesheet" type="text/css" href="../public/css/index.css">
````

### 配置seajs

````javascript
  seajs.config({
    base: "/" //seajs加载器的js基础路径
  });
````
### 界面调用

````javascript
var yohobuyMobile = seajs.use('index');
````

or
````javascript
var yohobuyMobile = require('index');
````
