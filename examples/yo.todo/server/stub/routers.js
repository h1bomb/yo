var list = [];
module.exports = function(app) {

    //设置所有状态切换
    app.post('/stub/toggleAll', function(req, res) {
        for (var i = 0; i < list.length; i++) {
            if (list[i]) {
                list[i].state = list[i].state ? 0 : 1;
            }
        }
        res.send(ret(true));
    });

    //设置当前状态切换
    app.post('/stub/toggle', function(req, res) {
        var done = false;
        if (req.body.id) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].id === req.body.id) {
                    list[i].state = list[i].state ? 0 : 1;
                    done = true;
                }
            }
        }

        res.send(ret(done));
    });

    //添加
    app.post('/stub/add', function(req, res) {
        console.log(req.params);
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
    app.post('/stub/save', function(req, res) {
        var saved = false;
        if (req.body.id) {
            for (var i = 0; i < list.length; i++) {
                if (req.body.id === list[i].id) {
                    list[i].todo = req.body.todo;
                    list[i].state = req.body.state;
                }
            }
        }
        res.send(ret(save));
    });

    //首页
    app.get('/stub', function(req, res) {
        var data = ret(true, list);
        res.send(data);
    });

    //过滤
    app.get('/stub/filter', function(req, res) {
        if (req.body.state) {
            var retData = [];
            for (var i = 0; i < list.length; i++) {
                if (req.body.state === list[i].state) {
                    retData.push(list[i]);
                }
            }
        }
        res.send(ret(true, retData));
    });

    //删除
    app.post('/stub/delete', function(req, res) {
        var isDel = false;
        if (req.body.id) {
            for (var i = 0; i < list.length; i++) {
                if (req.body.id === list[i].id) {
                    list.splice(i, 1);
                    break;
                }
            }
        }
        res.send(ret(isDel));
    });
}

/**
 * 生成唯一键
 * @return number
 */
function uuid() {
    var i, random;
    var uuid = '';

    for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;
        if (i === 8 || i === 12 || i === 16 || i === 20) {
            uuid += '-';
        }
        uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
    }

    return uuid;
}

/**
 * 返回数据处理
 * @param  {Boolean} flag 操作是否成功
 * @param  {Object} data 数据
 * @return {String}      返回结果
 */
function ret(flag, data) {
    var ret = {
        opts: flag
    }
    if (data) {
        ret.data = data;
    }
    ret = JSON.stringify(ret);
    return ret;
}