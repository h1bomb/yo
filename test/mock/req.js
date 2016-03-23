var appMock = require("../mock/app");
var _ = require('lodash');
module.exports = function (options) {
   options = options||{};
   var defaultValue =  {
        app:appMock,
        method: 'get',
        route: {
            path:'xxx'
        },
        input: {},
        session:{}
    };
    var ret = _.merge(defaultValue,options);
    return ret;
}