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

var ENTER_KEY = 13;
var ESCAPE_KEY = 27;

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
            method: 'PUT',
            eventHandle: [{
                event: click,
                elem: $toggleall
            }]
        }
    },
    add: {
        url: '/todo',
        method: 'POST',
        data: {
            todo: $newTodoInput.val()
        },
        eventHandle: [{
            event: 'click',
            elem: $newTodoInput
        }]
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
            };
        },
        eventHandle: [{
            event: 'click',
            elem: $listToggle
        }, {
            event: 'dblclick',
            elem: $listLi,
            handle: function(e) {
                var $input = $(e.target).closest('li').addClass('editing').find('.edit');
                $input.val($input.val()).focus();
                return false;
            }
        }, {
            event: 'keyup',
            elem: $listLiEdit,
            handle: function(e) {
                if (e.which === ENTER_KEY) {
                    $(e.target).blur();
                    return true;
                }

                if (e.which === ESCAPE_KEY) {
                    $(e.target).blur();
                }

                return false;
            }
        }]
    },
    remove: {
        url: '/todo/',
        method: 'DELETE',
        ev: function(elem) {
            this.url += elem.attr('data-id');
        },
        eventHandle: [{
            event: click,
            elem: $listDestroy
        }]
    },
    clearCompleted: {
        url: '/todos/completed',
        method: 'DELETE',
        eventHandle: [{
            event: click,
            elem: $clearCompleted
        }]
    }
}

function bind() {
    $.each(actions, function(key, value) {
        $.each(value.eventHandle, function(index, hb) {
            hb.elem.on(hb.event, function(e) {
                var isSend = false;
                if (e.handle) {
                    isSend = e.handle(e);
                }
            });
        });
    });
}

function reload() {

}