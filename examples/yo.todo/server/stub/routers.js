var list = [];
module.exports = function(app) {

    //批量设置todo
    app.put('/todos', function(req, res) {
        var batch = req.body.batch,
            doneNum = 0,
            state;
        try {
            batch = JSON.parse(batch);
        } catch (err) {
            return res.send(ret(false));
        }

        if (batch && batch.length > 0) {
            for (var i = 0; i < list.length; i++) {
                for (var k = 0; k < batch.length; k++) {
                    if (batch[k].id && list[i].id === batch[k].id) {
                        setval(batch[k].todo, batch[k].state, list[i]);
                        doneNum++;
                    }
                }
            }

            if (doneNum === batch.length) {
                return res.send(ret(true));

            }
        }
        res.send(ret(false));
    });

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

    //过滤
    app.get('/state/:state/todos', function(req, res) {
        var retData = [],
            state;
        if (procState(state)) {
            for (var i = 0; i < list.length; i++) {
                if (req.params.state === list[i].state) {
                    retData.push(list[i]);
                }
            }
        }

        res.send(ret(true, retData));
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

    //批量删除
    app.delete('/todos', function(req, res) {
        var ids = req.body.ids;
        try {
            ids = JSON.parse(ids);
        } catch (err) {
            return res.send(ret(false));
        }

        for (var i = 0; i < list.length; i++) {
            for (var j = 0; j < ids.length; j++) {
                if (list[i].id === ids[j]) {
                    list.splice(i, 1);
                    if (i > 0) {
                        i--;
                    }
                }
            }
        }
    });
}

/**
 * 处理状态码
 * @param  {Number} state 状态
 * @return {Boolean} 返回判断值
 */
function procState(state) {
    state = Number(state);
    return !isNaN(state);
}

/**
 * 设置结果集
 * @param  {String} todo  事项
 * @param  {Number} state 状态
 * @param  {Object} ret   结果集
 * @return {void}
 */
function setval(todo, state, ret) {
    if (todo) {
        ret.todo = todo;
    }

    if (procState(state)) {
        ret.state = state;
    }
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