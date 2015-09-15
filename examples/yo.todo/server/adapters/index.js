exports.get = function(data, req, res) {
    var states = ['active', 'completed'];
    var curState = 'all';
    var curStateVal = 3;
    data.completedTodos = false;
    data.activeTodoWord = 'items';
    data.activeTodoCount = 0;
    data.allCount = data.data.length;
    data.module = 'todos';
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