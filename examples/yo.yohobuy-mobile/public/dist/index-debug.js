define("yohobuy-mobile/index", ["jquery/jquery","iscroll/iscroll-probe","mlellipsis/mlellipsis","lazyload/jquery.lazyload","flexslider/jquery.flexslider","mustache/mustache","nprogress-183/nprogress","jquery-pjax-183/index","underscore/underscore","import-style/index"], function(require, exports, module){
var yohobuyMobile;

require("yohobuy-mobile/js/saunter");
require("yohobuy-mobile/js/tag");
require("yohobuy-mobile/js/ps");
require("yohobuy-mobile/js/template");

module.exports = yohobuyMobile;
});
define("yohobuy-mobile/js/saunter", ["jquery/jquery","iscroll/iscroll-probe","mlellipsis/mlellipsis","lazyload/jquery.lazyload"], function(require, exports, module){
/**
 * '逛'js
 * @author: yue.liu@yoho.cn
 * @date；2015/3/31
 */

var $ = require("jquery/jquery"),
    IScroll = require("iscroll/iscroll-probe"),
    ellipsis = require("mlellipsis/mlellipsis");

require("lazyload/jquery.lazyload");

//lazyLoad-Fn
function lazyLoad(imgs, options) {
        var setting = {
                effect: 'fadeIn',
                effect_speed: 10,
                placeholder: 'data:image/gif;base64,R0lGODlhAQABAJEAAAAAAP///93d3f///yH5BAEAAAMALAAAAAABAAEAAAICVAEAOw=='
            },
            $imgs;
        if (typeof imgs === 'undefined') {
            $imgs = $('img.lazy');
        } else {
            $imgs = imgs;
        }
        if (typeof options !== 'undefined') {
            $.extend(setting, options);
        }
        $imgs.lazyload(setting);
    }
    /**
     * 初始化Android页面
     */
exports.initAndroid = function() {
    $(function() {
        var $loginTip = $('#login-tip'),
            winH,
            winW,
            tipH,
            tipW;

        var isLogin = $('#is-login').val();
        isLogin = isLogin ? isLogin : 'N';

        //头部作者信息样式计算（在描述信息过长时换行显示， 去除intro的padding-top） 
        var $linkC = $('#link-container'),
            $avatar = $linkC.find('.avatar'),
            $name = $linkC.find('.name'),
            $intro = $linkC.find('.intro');
        if ($avatar.outerWidth(true) + $name.outerWidth(true) + $intro.outerWidth(true) > $(window).width()) {
            $intro.css('padding-top', 0);
        }

        //类型3文章相关变量
        var isInit = true,
            hadLazy = {},
            atContainer,
            thumbContainer,
            prodList,
            thumbWidth,
            arrPos;

        //样式初始化
        $('#wrapper').removeClass('no-android');
        //相关文章截取文字
        ellipsis.init();
        $('.post-list').find('span').each(function() {
            this.mlellipsis(2);
        });
        $('.brand-name').each(function() {
            this.mlellipsis(1);
        });

        //图片懒加载
        lazyLoad();

        //提示信息位置
        winH = $(window).height();
        winW = $(window).width();

        tipH = $loginTip.height();
        tipW = $loginTip.width();

        $loginTip.css({
            top: (winH - tipH) / 2,
            left: (winW - tipW) / 2
        });

        //绑定商品信息的收藏和取消收藏事件(相关推荐和搭配模块)
        $('.good-list, .prod-list').delegate('.good-islike', 'touchstart', function(e) {
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
                        st: 1,
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
            if (isLogin === 'Y') {
                e.preventDefault();
            }
        });

        //类型三文章
        atContainer = $('.article-type-three');
        if (atContainer.length === 0) {
            return;
        }
        thumbContainer = atContainer.find('.thumb-container');
        prodList = atContainer.find('.prod-list');

        thumbWidth = thumbContainer.find('li').width();
        arrPos = function($cur) {
            var left = $cur.offset().left,
                bgPos = -winW + left + (thumbWidth / 2) + 'px';
            thumbContainer.css({
                'backgroundPosition': bgPos + ' bottom'
            });
        };

        //点击分类，显示分类下推荐商品列表
        thumbContainer.delegate('.thumb', 'click', function() {
            var curItem,
                index;
            curItem = $(this);

            index = curItem.index();
            thumbContainer.find('.thumb').removeClass('focus');
            curItem.addClass('focus');

            arrPos(curItem);

            prodList.find('.prod')
                .addClass('hide')
                .eq(index)
                .removeClass('hide');
            //图片懒加载(防止多次点击反复触发造成页面闪烁现象)
            if (!hadLazy[index]) {
                hadLazy[index] = true;
                lazyLoad(prodList.find('.prod:eq(' + index + ') img.lazy'));
            }
            //scroll to top
            if (!isInit) {
                $('body').animate({
                    scrollTop: atContainer.offset().top
                }, 400);
            } else {
                isInit = false;
            }
        });

        //默认选中第一个
        thumbContainer.find('.thumb:first-child').click();
    });
};
/**
 * 初始化非Android页面
 */
exports.initOther = function() {
    var hasAt = true, //是否包含article-type-three
        atContainer,
        thumbContainer,
        fixedThumbContainer = $(''), //初始化为jq对象
        prodList,
        winH,
        myScroll;

    $(function() {
        var $loginTip = $('#login-tip'),
            winW,
            tipH,
            tipW;

        var isLogin = $('#is-login').val();
        isLogin = isLogin ? isLogin : 'N';

        //article-type-three相关变量
        var isInit = true,
            scrollToEl = document.querySelector('#wrapper .article-type-three'),
            thumbs,
            arrPos;

        //头部作者信息样式计算（在描述信息过长时换行显示， 去除intro的padding-top） 
        var $linkC = $('#link-container'),
            $avatar = $linkC.find('.avatar'),
            $name = $linkC.find('.name'),
            $intro = $linkC.find('.intro');
        //thumb的宽度,防止fixed-thumb未加载的问题
        var thumbWidth;
        //
        if ($avatar.outerWidth(true) + $name.outerWidth(true) + $intro.outerWidth(true) > $(window).width()) {
            $intro.css('padding-top', 0);
        }
        //图片懒加载
        lazyLoad();

        //相关文章截取文字
        ellipsis.init();
        $('.post-list').find('span').each(function() {
            this.mlellipsis(2);
        });
        $('.brand-name').each(function() {
            this.mlellipsis(1);
        });

        //提示信息位置
        winH = $(window).height();
        winW = $(window).width();

        tipH = $loginTip.height();
        tipW = $loginTip.width();

        $loginTip.css({
            top: (winH - tipH) / 2,
            left: (winW - tipW) / 2
        });

        //绑定商品信息的收藏和取消收藏事件(相关推荐和搭配模块)
        $('.good-list, .prod-list').delegate('.good-islike', 'touchstart', function(e) {
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
                        st: 1,
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
            if (isLogin === 'Y') {
                e.preventDefault();
            }
        });

        //article-three效果
        atContainer = $('.article-type-three');
        if (atContainer.length > 0) {
            hasAt = true;
        } else {
            hasAt = false;
        }
        //初始化
        thumbContainer = atContainer.find('.thumb-container');
        prodList = atContainer.find('.prod-list');
        //
        fixedThumbContainer = $('#wrapper')
            .after(thumbContainer.clone().addClass('fixed-thumb-container fixed-bottom hide'))
            .next('.thumb-container');
        thumbs = $('.thumb');

        //手动替换出fixedThumbContainer中的图片Lazyload
        fixedThumbContainer.find('li').each(function() {
            var $img = $(this).children('img.lazy');
            $img.attr('src', $img.attr('data-original'));
        });

        /**
         * 计算小箭头位置函数
         * @param $cur 当前点击thumb
         */
        thumbWidth = thumbContainer.find('li').width();
        arrPos = function($cur) {
            var left = $cur.offset().left,
                bgPos = -winW + left + (thumbWidth / 2) + 'px';
            thumbContainer.css({
                'backgroundPosition': bgPos + ' bottom'
            });
            fixedThumbContainer.css({
                'backgroundPosition': bgPos + ' bottom'
            });
        };
        /**
         * 分类的点击事件句柄
         */
        function thumbClickEvt(e) {
            var that = $(e.currentTarget),
                index = that.index(),
                other;

            if (that.closest('.fixed-thumb-container').length > 0) {
                other = thumbContainer.find('.thumb:eq(' + index + ')');
            } else {
                other = fixedThumbContainer.find('.thumb:eq(' + index + ')');
            }

            //set status of that & other synchronous
            thumbs.removeClass('focus');

            that.addClass('focus');
            other.addClass('focus');

            arrPos(that);

            prodList.find('.prod')
                .addClass('hide')
                .eq(index)
                .removeClass('hide');

            if (!isInit) {
                if (myScroll) {
                    myScroll.scrollToElement(scrollToEl, 400);
                    myScroll.refresh();
                }
            } else {
                isInit = false;
            }
        }
        thumbs.click(thumbClickEvt);
        //默认选中第一个
        thumbContainer.find('.thumb:first-child').click();
    });

    /**
     * init iscroll
     */
    window.onload = function() {
        var tContainerH, //thumber-container高度
            containerH, //article-type-three高度
            containerTop; //article-type-three offset top

        myScroll = new IScroll('#wrapper', {
            probeType: 3,
            mouseWheel: true,
            click: true
        });

        document.addEventListener('touchmove', function(e) {
            e.preventDefault();
        }, false);

        if (!hasAt) {
            myScroll.on('scroll', function() {
                $('#scroller').trigger('scroll');
            });
            return;
        }

        tContainerH = thumbContainer.outerHeight();
        containerH = atContainer.height();
        containerTop = atContainer.offset().top;

        /**
         * scroll前重置container状态
         */
        function resetStatus() {
            fixedThumbContainer.removeClass('fixed-top fixed-bottom absolute hide').css('top', '');
        }

        myScroll.on('scroll', function() {
            var sTop = -this.y;

            resetStatus();

            if (sTop <= containerTop - winH + tContainerH) {
                fixedThumbContainer
                    .addClass('fixed-bottom');
            } else if (sTop <= containerTop) {
                fixedThumbContainer
                    .addClass('hide');
            } else if (sTop <= containerTop + containerH - tContainerH) {
                fixedThumbContainer
                    .addClass('fixed-top');
            } else if (sTop <= containerTop + containerH) {
                fixedThumbContainer
                    .addClass('absolute')
                    .css({
                        top: containerTop + containerH - tContainerH - sTop
                    });
            } else if (sTop > containerTop + containerH) {
                fixedThumbContainer
                    .addClass('hide');
            }

            $('#scroller').trigger('scroll');
        });
        //手动触发scroll， 初始化fixedThumb的位置和显示
        myScroll.scrollTo(0, 0, 0.1);
    };
};

var u = navigator.userAgent;
if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
    exports.initAndroid();
} else {
    exports.initOther();
}
});
define("yohobuy-mobile/js/tag", ["jquery/jquery","mlellipsis/mlellipsis","flexslider/jquery.flexslider","mustache/mustache","nprogress-183/nprogress","jquery-pjax-183/index","lazyload/jquery.lazyload","import-style/index"], function(require, exports, module){
/**
 * tag相关js
 * @author: yue.liu@yoho.cn
 * @date；2015/3/31
 */

var $ = require("jquery/jquery"),
    ellipsis = require("mlellipsis/mlellipsis"),
    flexslider = require("flexslider/jquery.flexslider"),
    Mustache = require("mustache/mustache"),
    NProgress = require("nprogress-183/nprogress");
require("jquery-pjax-183/index");
require("lazyload/jquery.lazyload");

/**
 * 初始化页面加载时的文字截取和图片懒加载功能
 */
exports.init = function() {
    var tpl;

    var _init = function() {
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

        //初始化 slider
        $('.flexslider').flexslider({
            animation: "slide",
            directionNav: false
        });
        //是否包含作者信息
        if ($('#author-infos').length > 0) {
            hasAuthor = true;
            authorId = $('#author-infos').data('id');
        }

        //请求相关数据
        var page = 1,
            query = $('#query').val(), //无author时
            gender = $('#gender').val(),
            clientType = $('#client-type').val(),
            sortId = $('#sort_id').val();


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
                effect: 'fadeIn',
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
                    sort_id: sortId,
                    client_type: clientType
                };
            } else {
                setting = {
                    page: ++page,
                    query: query,
                    gender: gender,
                    sort_id: sortId,
                    client_type: clientType
                };
            }

            canScroll = false;
            $.ajax({
                type: 'GET',
                url: '/tag',
                dataType: 'json',
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

                    infos = res.content;
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
    };

    $(function() {
        //初始化pjax
        $(document).pjax('a', '#pjax-container');
        $(document).on('pjax:start', function() {
            NProgress.start();
        });
        $(document).on('pjax:end', function() {
            NProgress.done();
            _init();
        });
        _init();
    })
};
exports.init();
});
define("yohobuy-mobile/js/ps", ["jquery/jquery","mustache/mustache","mlellipsis/mlellipsis","lazyload/jquery.lazyload"], function(require, exports, module){
/**
 * plus+star页js
 * @author: xuqi(qi.xu@yoho.cn)
 * @date；2015/4/16
 */

var $ = require("jquery/jquery"),
    Mustache = require("mustache/mustache"),
    ellipsis = require("mlellipsis/mlellipsis");

require("lazyload/jquery.lazyload");

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
});
define("yohobuy-mobile/js/template", ["jquery/jquery","underscore/underscore","mlellipsis/mlellipsis","mustache/mustache","lazyload/jquery.lazyload"], function(require, exports, module){
/**
 * 模板页js
 * @author: xuqi(qi.xu@yoho.cn)
 * @date；2015/4/14
 */

var $ = require("jquery/jquery"),
    _ = require("underscore/underscore"),
    ellipsis = require("mlellipsis/mlellipsis"),
    Mustache = require("mustache/mustache"),
    timer = null;

require("lazyload/jquery.lazyload");

/**
 * 页面加载初始化
 */
exports.init = function() {
    $(function() {
        var $navItem = $('#goods-nav .nav-item'),
            $goodsContainer = $('#goods-content'),
            $goodList = $('#goods-content > div'),
            $npc = $goodList.filter('.new-patterns-container'),
            $svc = $goodList.filter('.sales-volume-container'),
            $pc = $goodList.filter('.price-container'),
            tpl; //商品信息模板
        //load-more
        var $loadMore = $('#load-more-info'),
            $loadStatus = $loadMore.children('.status'),
            $noMore = $loadStatus.filter('.no-more'),
            $loading = $loadStatus.filter('.loading'),
            loadMoreH = $loadMore.height();

        var isLogin = $('#is-login').val();
        isLogin = isLogin ? isLogin : 'N';

        //筛选相关变量
        var curFilter = {
                brand: '',
                msort: '',
                color: '',
                size: '',
                price: '',
                discount: ''
            },
            navInfo = {
                newest: {
                    direction: 0, //排序方向;NOTE:最新保持升序排序
                    reload: false, //是否需要重新加载
                    start: 1,
                    end: false,
                    empty: false
                },
                sale: {
                    direction: 0, //销量降序排列
                    reload: true,
                    start: 0,
                    end: false,
                    empty: true
                },
                price: {
                    direction: 1,
                    reload: true,
                    start: 0,
                    end: false,
                    empty: true
                }
            },
            classifyItemTpl = '<li class="{{^ id}}chosed{{/ id}}" data-id="{{id}}">' +
            '<span class="text">{{name}}</span>' +
            '<span><i class="chosed-icon iconfont">&#xe60a;</i></span>' +
            '</li>',
            $screen = $('#screen-content, #screen-mask'),
            $prevFocusNav = $navItem.filter('.focus'), //初始化为已选项
            classification; //分类数据

        //加载更多
        var winH = $(window).height(),
            canLoadAjax = true; //防止下拉请求次数过多
        //
        var promotionId = $('#promotion').val(),
            clientType = $('#client-type').val(),
            contentCode = $('#content-code').val();
        //
        var $loginTip = $('#login-tip'),
            winW,
            tipH,
            tipW;
        //定位登录提示
        winH = $(window).height();
        winW = $(window).width();

        tipH = $loginTip.height();
        tipW = $loginTip.width();

        $loginTip.css({
            top: (winH - tipH) / 2,
            left: (winW - tipW) / 2
        });
        //lazyload
        function lazyLoad(imgs, options) {
            var setting = {
                    effect: 'fadeIn',
                    effect_speed: 10,
                    placeholder: 'data:image/gif;base64,R0lGODlhAQABAJEAAAAAAP///93d3f///yH5BAEAAAMALAAAAAABAAEAAAICVAEAOw=='
                },
                $imgs;
            if (typeof imgs === 'undefined') {
                $imgs = $('img.lazy');
            } else {
                $imgs = imgs;
            }
            if (typeof options !== 'undefined') {
                $.extend(setting, options);
            }
            $imgs.lazyload(setting);
        }
        lazyLoad();
        //ellipsis
        ellipsis.init();
        $('.reco .name').each(function() {
            this.mlellipsis(2);
        });
        $('.brand-name').each(function() {
            this.mlellipsis(1);
        });

        //read good-info template
        $.get('/common/goodinfo', function(data) {
            tpl = data;
            Mustache.parse(tpl);
        });

        Mustache.parse(classifyItemTpl); //cache tpl

        /**
         * Mustache 渲染数组数据
         * @params data Array 数据数组
         * @return html html字符串
         */
        function renderArrData(data) {
            var i = 0,
                html = '';
            for (i = 0; i < data.length; i++) {
                html += Mustache.render(classifyItemTpl, data[i]);
            }
            return html;
        }

        /**
         * 获取当前选中导航的类别
         * @return string/undefined
         */
        function getFocusNavType() {
            var type;
            if ($prevFocusNav.hasClass('sales-volume-nav')) {
                type = 'sale';
            } else if ($prevFocusNav.hasClass('price-nav')) {
                type = 'price';
            } else if ($prevFocusNav.hasClass('new-patterns-nav')) {
                type = 'newest';
            }
            return type;
        }

        /**
         * 查找当前状态下的商品列表并填充HTML
         * @params fromScroll Boolean 是否由scroll触发search
         */
        function search(fromScroll) {
                var type = getFocusNavType(),
                    setting = {},
                    hadNum = 0,
                    nav;

                nav = navInfo[type];

                //重新加载重置start和end
                if (nav.reload) {
                    nav.start = 0;
                    nav.end = false;
                    nav.empty = false;
                }

                //请求数据setting
                $.extend(setting, curFilter, {
                    type: type,
                    direction: nav.direction,
                    start: nav.start + 1,
                    promotionId: promotionId,
                    clientType: clientType,
                    contentCode: contentCode
                });

                if (nav.end) {
                    $loading.addClass('hide');
                    $noMore.removeClass('hide');
                } else {
                    $loading.removeClass('hide');
                    $noMore.addClass('hide');
                }

                if (nav.end && nav.empty) {
                    $noMore.addClass('hide');
                }

                if (!nav.reload && nav.end) {
                    //不需要重新加载并且数据请求结束
                    return;
                }

                canLoadAjax = false;
                $.ajax({
                    type: 'GET',
                    url: '/activity/search',
                    data: setting
                }).then(function(data) {
                    var html = '',
                        $container,
                        res,
                        goods,
                        len,
                        i;
                    if (data.success) {
                        res = data.data;
                        goods = res.goods;
                        len = goods.length;

                        //插入HTML
                        switch (setting.type) {
                            case 'newest':
                                $container = $npc;
                                break;
                            case 'price':
                                $container = $pc;
                                break;
                            case 'sale':
                                $container = $svc;
                                break;
                        }
                        if (!fromScroll && len === 0) { //由非scroll触发并且返回结果为空的代表未查到数据
                            nav.empty = true;
                            //无返回数据
                            html = '<p class="search-tip">未找到相关搜索结果</p>';
                        } else {
                            nav.empty = false;
                            hadNum = $container.find('.good-info').length;
                            for (i = 0; i < len; i++) {
                                html += Mustache.render(tpl, goods[i]);
                            }
                        }
                        if (nav.reload || (!fromScroll && len === 0)) {
                            hadNum = 0;
                            $container.html(html);
                        } else {
                            $container.append(html);
                        }

                        //lazyload加载新插入的图片
                        if (hadNum === 0) {
                            lazyLoad($container.find('.good-info img.lazy'));
                        } else {
                            lazyLoad($container.find('.good-info:gt(' + (hadNum - 1) + ') img.lazy'));
                        }
                        //重置navInfo
                        if (res.end) {
                            nav.end = true;
                            //设置加载更多显示
                            $loading.addClass('hide');
                            //若无数据项返回则不显示noMore
                            if (!fromScroll && len === 0) {
                                $noMore.addClass('hide');
                            } else {
                                $noMore.removeClass('hide');
                            }
                        }
                        nav.reload = false;
                        nav.start++;

                        //重置可请求标识
                        canLoadAjax = true;
                    }
                });
            }
            //读取筛选时的分类信息
        $.get('/activity/classification', {
            promotionId: promotionId,
            clientType: clientType
        }, function(data) {
            var c;
            if (data.success) {
                classification = data.data;
                for (c in classification) {
                    if (classification.hasOwnProperty(c)) {
                        $('#sub-' + c).html(renderArrData(classification[c]));
                    }
                }
            }
        });

        /**
         * 切换排序
         * @params $cur 当前选中nav-item
         */
        function toggleSort($cur) {
            var type = getFocusNavType(),
                nav = navInfo[type],
                direction;

            $cur.find('.sort i').toggleClass('cur');

            if ($cur.find('.sort .cur').hasClass('up')) {
                direction = 1;
            } else {
                direction = 0;
            }

            nav.direction = direction;
            nav.reload = true;
            search();
        }

        /**
         * 导航 touch/click处理句柄
         */
        function navTouchEvt(e) {
            var $cur = $(e.currentTarget),
                type;

            if ($cur.hasClass('screen-nav')) {
                //筛选
                $screen.toggleClass('hide');
                $prevFocusNav.toggleClass('focus');
                $cur.toggleClass('focus');
            } else {
                if ($cur.hasClass('focus')) {
                    if ($cur.hasClass('price-nav')) {
                        toggleSort($cur);
                    }
                    return;
                }

                $prevFocusNav = $cur;

                $navItem.removeClass('focus');
                $cur.addClass('focus');

                type = getFocusNavType(); //当前focus项(new/sale/price)

                $goodList.addClass('hide');
                switch (type) {
                    case 'newest':
                        $npc.removeClass('hide');
                        break;
                    case 'sale':
                        $svc.removeClass('hide');
                        break;
                    case 'price':
                        $pc.removeClass('hide');
                        break;
                }

                if (navInfo[type].reload) {
                    search();
                }
            }
        }

        //切换“最新”，“销量”，“价格”以及“筛选”功能
        $('#goods-nav').delegate('.nav-item', 'click', function(e) {
            navTouchEvt(e);
        });


        /**
         * 筛选分类点击事件句柄
         */
        function scTouchEvt(e) {
            var $cur = $(e.currentTarget),
                cs = ['brand', 'msort', 'color', 'size', 'price', 'discount'],
                curType;

            if ($cur.hasClass('active')) {
                return;
            }

            $('#screen-content .c-item').removeClass('active');
            $cur.addClass('active');

            curType = _.filter(cs, function(c) {
                return $cur.hasClass(c);
            });

            $('.sub-classify:not(.hide)').addClass('hide');
            $('#sub-' + curType).removeClass('hide');
        }

        $('#screen-content').delegate('.c-item', 'click', function(e) {
            scTouchEvt(e);
        });

        /**
         * 筛选
         * @params string 数据id
         * @params string 数据类型
         * @name string 值
         * @navNam string 最新/销量/价格
         * @direction int 0(降序)/1(升序)
         */
        function doFilter(id, type, name, navName) {
            var $shower = $('#show-' + type),
                att;
            //更新当前过滤项
            curFilter[type] = id;

            //更新显示值
            if (id === 0) {
                $shower.addClass('default');
            } else {
                $shower.removeClass('default');
            }

            $shower.text(name);

            //重置reload
            for (att in navInfo) {
                if (navInfo.hasOwnProperty(att)) {
                    navInfo[att].reload = true;
                }
            }
            search();
        }

        /**
         * 筛选子类点击事件句柄
         */
        function subScTouchEvt(e) {
            var $cur = $(e.currentTarget),
                $parent = $cur.closest('ul'),
                id = $cur.data('id'),
                type = $parent.data('type'),
                name = $cur.children('.text').text();

            $parent.children('li.chosed').removeClass('chosed');
            $cur.addClass('chosed');

            doFilter(id, type, name);
        }

        $('.sub-classify').delegate('li', 'click', function(e) {
            subScTouchEvt(e);
            //子筛选类点击后关闭筛选框
            $navItem.filter('.screen-nav').click(); //触发点击筛选导航的点击事件
        });

        //加载更多
        $(document).scroll(function(e) {
            //当scroll到1/3$goodsContainer高度后继续请求
            if (canLoadAjax && $(window).scrollTop() + winH >=
                $(document).height() - 0.33 * $goodsContainer.height() - loadMoreH) {
                search(true);
            }
        });

        //点击蒙版关闭筛选框
        $('#screen-mask').click(function() {
            $navItem.filter('.screen-nav').click(); //触发点击筛选导航的点击事件
        });

        //Like  
        $('#goods-content').delegate('.good-islike', 'touchstart', function(e) {
            var $cur,
                $good,
                id;
            if (isLogin === 'Y') {
                $cur = $(e.currentTarget);
                $good = $cur.closest('.good-info');
                id = $good.data('id');

                $.ajax({
                    type: 'GET',
                    url: '/favorite/product',
                    data: {
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
            if (isLogin === 'Y') {
                e.preventDefault();
            }
        });
    });
};
exports.init();
});
