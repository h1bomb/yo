/**
 * tag相关js
 * @author: yue.liu@yoho.cn
 * @date；2015/3/31
 */

var $ = require('jquery'),
    ellipsis = require('mlellipsis'),
    Mustache = require('mustache');

require('lazyload');

/**
 * 初始化页面加载时的文字截取和图片懒加载功能
 */
exports.init = function() {
    var tpl;
    
    $(function() {
        var $tagList = $('#tag-list'),
            $loadMore = $('#load-more-info'),
            $loadStatus = $loadMore.children('.status'),
            $noMore = $loadStatus.filter('.no-more'),
            $loading = $loadStatus.filter('.loading'),
            winH = $(window).height(),
            loadMoreH = $loadMore.height(),
            canScroll = true,
            dataEnd = false,
            hasAuthor = false,
            authorId;
            
        //是否包含作者信息
        if ($('#author-infos').length > 0) {
            hasAuthor = true;
            authorId = $('#author-infos').data('id');
        }
        
        //请求相关数据
        var page = 1,
            query = $('#query').val(), //无author时
            gender = $('#gender').val(),
            clientType = $('#client-type').val();
        
        //定位登录提示相关变量
        var $loginTip = $('#login-tip'),
    		winW,
    		tipH,
    		tipW;
        //定位登录提示
    	winW = $(window).width();
    	
    	tipH = $loginTip.height();
    	tipW = $loginTip.width();
    	
    	$loginTip.css({
    		top: (winH - tipH) / 2,
    		left: (winW - tipW) / 2
    	});
        
        //读取模板
        $.get('/common/tagtpl', function(data) {
            tpl = data;
            Mustache.parse(tpl);
        });
        
        //img-lazyload
        function lazyLoad(imgs) {
            var $imgs;
            if (typeof imgs === 'undefined') {
                $imgs = $('img.lazy');
            } else {
                $imgs = imgs;
            }
            $imgs.lazyload({
                effect : 'fadeIn',
                effect_speed: 10,
                placeholder: 'data:image/gif;base64,R0lGODlhAQABAJEAAAAAAP///93d3f///yH5BAEAAAMALAAAAAABAAEAAAICVAEAOw=='
            });
        }
        lazyLoad();
                        
        //相关文章截取文字
        ellipsis.init();
        $('.tag-text, .tag-title').each(function() {
            this.mlellipsis(2);
        });
        
        //文章点赞
        $('.tag-container').delegate('.like-btn', 'touchstart', function(e) {
            var $cur = $(e.currentTarget),
                $info = $cur.closest('.tag-content'),
                id = $info.data('id');
            //点赞的只有取消点赞的效果， 不发送请求， 不改变点赞数字
            if ($cur.hasClass('like')) {
                $cur.next('span.like-count').text('');
                $cur.toggleClass('like');
                return;
            }
            $.ajax({
                type: 'GET',
                url: '/favorite/praise',
                data: {
                    id: id
                }
            }).then(function(data) {
                if (data.code === 200) {
                    $cur.toggleClass('like');
                    //更新点赞数
                    $cur.next('span.like-count').text(data.data);
                } else if (data.code === 400) {
                    //提示登录信息
                    $('#login-tip').fadeIn(500, function() {
                        setTimeout(function() {
                           $('#login-tip').fadeOut(500);
                        }, 1000);
                    });
                }
            });
        });
        
        /**
         * 加载更多
         */
        function loadMore() {
            var setting,
                hasNum = $tagList.find('.tag-content').length;
            
            if (hasAuthor) {
                setting = {
                    page: ++page,
                    id: authorId,
                    client_type: clientType
                };
            } else {
                setting = {
                    page: ++page,
                    query: query,
                    gender: gender,
                    client_type: clientType
                };
            }
           
            canScroll = false;
            $.ajax({
                type: 'GET',
                url: '/tags/get',
                data: setting
            }).then(function(data) {
                var html = '',
                    res,
                    infos,
                    i;
               
                if (data.code === 200) {
                    res = data.data;
                    if (res.end) {
                        dataEnd = true;
                        $loading.addClass('hide');
                        $noMore.removeClass('hide');
                    }
                    
                    infos = res.infos;
                    for (i = 0; i < infos.length; i++) {
                        html += Mustache.render(tpl, infos[i]);
                    }
                    if (html !== '') {
                        $tagList.append(html);
                        //lazyload新加载的项
                        lazyLoad($tagList.find('.tag-content:gt(' + (hasNum - 1) + ') img.lazy'));
                        //文字截取
                        $tagList.find('.tag-text, .tag-title').each(function() {
                            this.mlellipsis(2);
                        });
                    }
                    canScroll = true;
                }
            });
        }
        
        $(document).on('scroll', function() {
            //正在请求数据或者数据请求结束时返回
            if (!canScroll || dataEnd) {
               return;
            }
            
            if ($(window).scrollTop() + winH >= $(document).height() - loadMoreH) {
                loadMore();
            }
        });
        
        if ($(document).height() === winH) {
            //应对初始加载时数据不满屏不能触发scroll的情况
            $(document).one('touchmove', function() {
                if (!canScroll || dataEnd) {
                    return;
                }
                //显示LoadMore
                $loading.removeClass('hide');
                loadMore();
            });
        } else {
            $loading.removeClass('hide');
        }
    });
};