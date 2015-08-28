exports.get = function(data, req, res) {
    data.list = [{
        'name':'aaa',
        'age':23
    },{
        'name':'aadsfa',
        'age':2334
    }];
    return data;
}