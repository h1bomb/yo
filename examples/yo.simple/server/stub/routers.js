var stub = {
    '/stub': {
        data: {words:'hello world!'},
        module: 'index'
    }
}

module.exports = function(app) {
    var route;
    for (route in stub) {
        var func = procFunc(stub[route]);
        app.get(route, func);
    }
}

function procFunc(proc) {
    if (typeof proc === 'function') {
        return proc;
    } else {
        return function(req, res) {
            res.send(proc);
        }
    }
}