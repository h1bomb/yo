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

var $newTodoInput = $("#new-todo"), //新建一个todo
    $listLi = $("#todo-list li"), //列表单元
    $listToggle = $("#todo-list .togggle"), //切换todo状态
    $listLiEdit = $("#todo-list .edit"), //编辑输入
    $toggleall = $("#toggle-all"), //切换所有的todo状态
    $listDestroy = $("#todo-list .destroy"), //删除todo
    $clearCompleted = $("#clear-completed"); //清除完成的



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
        ev: function(elem) {
            this.url += elem.attr('data-id');
            var state = elem.find('.togggle').attr('checked') ? 1 : 0;
            this.data = {
                todo: elem.find('label').text(),
                state: state
            }
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