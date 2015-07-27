var routes = [];
module.exports = {
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
    routes: routes
}