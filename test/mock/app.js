var routes = [];
var app = {
    get: function(route, call) {
        routes.push({
            method: 'get',
            route: route,
            call: call
        });
    },
    post: function(route, call) {
        routes.push({
            method: 'post',
            route: route,
            call: call
        });
    },
    engine:function(){},
    set:function(){},
    yolog: {
        log:function(){},
        profile:function(){},
        api:{log:function(){}}
    },
    listen: function() {
        return 3000
    },
    use: function() {},
    routes: routes,
    req:{
        app:app
    }
};
module.exports = app;