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

var $newTodoInput = $("#new-todo");



var actions = {
    toggleAll: {
        url: '/todos/toggleall',
        method: 'PUT'
    },
    add: {
        url: '/todo',
        method: 'POST',
        data: {
            todo: $newTodoInput.val()
        }
    },
    edit: {
        url: '/todo/',
        method: 'PUT',
        event: ev: function(elem) {
            this.url += elem.parents('li').attr('data-id');
        },
        callback: function() {}
    },
    remove: {
        url: '/todo',
        method: 'DELETE',
        ev: function() {},
        callback: function() {}
    },
    clearCompleted: {
        url: '/todos/completed',
        method: 'DELETE',
        ev: function() {},
        callback: function() {}
    },
    completed: {
        url: '/todo/',
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