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
                    console.log(list[i]);
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
        ret.state = Number(state);
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
        opts: flag,
        toggleAll: toggleAll
    }
    if (data) {
        ret.data = data;
    }
    ret = JSON.stringify(ret);
    return ret;
}