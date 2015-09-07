/**
 * todos
 */

var $ = require('jquery');
var NProgress = require('nprogress-183');
require('jquery-pjax-183');

function initPjax() {
    $(document).pjax('a', '#pjax-container');

    $(document).on('pjax:start', function() {
        NProgress.start();
    });

    $(document).on('pjax:end', function() {
        NProgress.done();
    });
}



var actions = {
    toggleAll: {
        url: '/todos',
        method: 'PUT',
        ev: function() {

        },
        callback: function() {

        }
    },
    add: {
        url: '/todo',
        method: 'POST',
        ev: function() {},
        callback: function() {}
    },
    remove: {
        url: '/todo',
        method: 'DELETE',
        ev: function() {},
        callback: function() {}
    },
    clearCompleted: {
        url: '/todo',
        method: 'POST',
        ev: function() {},
        callback: function() {}
    },
    completed: {
        url: '/todo',
        method: 'PUT',
        ev: function() {},
        callback: function() {}
    },
    input: {
        ev: function() {}
    }
}

function initArr() {

}

function send() {

}