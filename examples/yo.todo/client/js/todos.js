/**
 * todos
 *
 * todos的前端代码
 * 只提交todo的操作，服务端维护todo状态
 */

var $ = require('jquery');
var NProgress = require('nprogress-183');
require('jquery-pjax-183');

/**
 * 初始化Pjax
 *
 * @return void
 */
function initPjax() {
    $(document).pjax('a', '#pjax-container');

    $(document).on('pjax:start', function() {
        NProgress.start();
    });

    $(document).on('pjax:end', function() {
        NProgress.done();
    });
}

var ENTER_KEY = 13; //回车键
var ESCAPE_KEY = 27; //esc键

var $newTodoInput = $("#new-todo"), //新建一个todo
    $listLi = $("#todo-list li"), //列表单元
    $listToggle = $("#todo-list .togggle"), //切换todo状态
    $listLiEdit = $("#todo-list .edit"), //编辑输入
    $toggleall = $("#toggle-all"), //切换所有的todo状态
    $listDestroy = $("#todo-list .destroy"), //删除todo
    $clearCompleted = $("#clear-completed"); //清除完成的


/**
 * 界面操作对象
 * @type {Object}
 */
var actions = {
    toggleAll: {
        url: '/todos/toggleall',
        method: 'PUT',
        eventHandle: [{
            event: click,
            elem: $toggleall
        }]
    },
    add: {
        url: '/todo',
        method: 'POST',
        eventHandle: [{
            event: 'keyup',
            elem: $newTodoInput,
            handle: function(e) {
                if (e.which === ENTER_KEY) {
                    actions.add.data = {
                        todo: $(e.target).val() + ''
                    };
                    $(e.target).val('');
                    return true;
                }
            }
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

/**
 * 事件绑定操作
 * @return {void}
 */
function bind() {
    $.each(actions, function(key, value) {
        $.each(value.eventHandle, function(index, hb) {
            hb.elem.on(hb.event, function(e) {
                var isSend = false;
                if (e.handle) {
                    isSend = e.handle(e);
                }
                if (isSend) {
                    if (hb.ev) {
                        hb.ev();
                    }
                    send(hb);
                }
            });
        });
    });
}

/**
 * 发送操作信息
 * @param  {Object} hb
 * @return {void}
 */
function send(hb) {
    $.ajax({
        url: hb.url,
        method: hb.method,
        data: hb.data ? hb.data : null
    }).done(function(data) {
        if (data.opts) {
            reload();
        } else {
            alert('something wrong!');
        }
        $.pjax.reload('#pjax-container');

    }).fail(function() {
        alert('something wrong!');
    });
}


bind();