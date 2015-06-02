/**
 * plus+star页js
 * @author: xuqi(qi.xu@yoho.cn)
 * @date；2015/4/16
 */

var $ = require('jquery'),
    Mustache = require('mustache'),
    ellipsis = require('mlellipsis');

require('lazyload');

/**
 * 初始化页面功能
 */
exports.init = function() {
    $(function() {
        var $intro = $('#intro'),
            $moreIntro = $('#more-intro'),
            $introTxt = $moreIntro.find('.more-intro-text'),
            $iconUp = $moreIntro.find('.up'),
            $iconDown = $moreIntro.find('.down'),
            winH = $(window).height(),
            mIntro, //品牌介绍文字介绍
            aIntro,
            tpl;
        var isLogin = $('#is-login').val();
        isLogin = isLogin ? isLogin : 'N';
        //登录提示变量
        var $loginTip = $('#login-tip'),
            winW,
            tipH,
            tipW;

        //获取相关资讯模板
        $.get('/common/articletpl', function(data) {
            tpl = data;
            Mustache.parse(tpl); //pre-compile and cache template
        });

        //文字截取
        ellipsis.init();
        $intro[0].mlellipsis(3); //品牌介绍
        $('.info-block-content, .info-block-title').each(function() { //相关文章
            this.mlellipsis(2);
        });
        setTimeout(function() {
            mIntro = $intro.text();
            aIntro = $intro.attr('title');
        }, 0);

        //lazyload
        $('img.lazy').lazyload({
            effect: 'fadeIn',
            effect_speed: 10,
            placeholder: 'data:image/gif;base64,R0lGODlhAQABAJEAAAAAAP///93d3f///yH5BAEAAAMALAAAAAABAAEAAAICVAEAOw=='
        });

        aIntro = $intro.attr('_title');
        //显示品牌介绍所有文字/隐藏
        function showMoreIntro() {
            $moreIntro.toggleClass('show');

            if ($moreIntro.hasClass('show')) {
                $intro.text(aIntro);
                $introTxt.text('收起');
                $iconDown.addClass('hide');
                $iconUp.removeClass('hide');
            } else {
                $intro.text(mIntro);
                $introTxt.text('more');
                $iconUp.addClass('hide');
                $iconDown.removeClass('hide');
            }
        }

        $moreIntro.delegate('.more', 'click', function() {
            showMoreIntro();
        });

        //提示信息位置
        winW = $(window).width();

        tipH = $loginTip.height();
        tipW = $loginTip.width();

        $loginTip.css({
            top: (winH - tipH) / 2,
            left: (winW - tipW) / 2
        });

        //绑定商品信息的收藏和取消收藏事件(相关推荐和搭配模块)
        $('.new-arrival-content').delegate('.good-islike', 'touchstart', function(e) {
            var $cur,
                $good,
                id;
            if (isLogin === 'N') {
                $cur = $(e.currentTarget);
                $good = $cur.closest('.good-info');
                id = $good.data('id');

                $.ajax({
                    type: 'GET',
                    url: '/favorite/product',
                    data: {
                        st: 0,
                        product_skn: id
                    }
                }).then(function(data) {
                    if (data.code === 200) {
                        $cur.toggleClass('good-like');
                    } else if (data.code === 400) {
                        //提示登录信息
                        $('#login-tip').fadeIn(500, function() {
                            setTimeout(function() {
                                $('#login-tip').fadeOut(500);
                            }, 1000);
                        });
                    }
                });
            }
        }).delegate('.good-islike', 'click', function(e) {
            if (isLogin === 'N') {
                e.preventDefault();
            }
        });

        //文章点赞
        $('#info-content').delegate('.like-btn', 'touchstart', function(e) {
            var $cur = $(e.currentTarget),
                $info = $cur.closest('.info-block'),
                id = $info.data('id');
            //取消点赞的处理
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

        $('#brand-like').bind('touchstart', function(e) {
            var $cur,
                id;
            if (isLogin === 'Y') {
                $cur = $(this);
                id = $(this).closest('.brand-info').data('id');

                //
                $.ajax({
                    type: 'GET',
                    url: '/favorite/brand',
                    data: {
                        brand_id: id
                    }
                }).then(function(data) {
                    if (data.code === 200) {
                        $cur.toggleClass('like');
                    } else if (data.code === 400) {
                        $('#login-tip').fadeIn(500, function() {
                            setTimeout(function() {
                                $('#login-tip').fadeOut(500);
                            }, 1000);
                        });
                    }
                });
            }
        }).bind('click', function(e) {
            if (isLogin === 'Y') {
                //阻止链接跳转
                e.preventDefault();
            }
        });
    });
};
exports.init();