/**
 * '逛'js
 * @author: yue.liu@yoho.cn
 * @date；2015/3/31
 */

var $ = require('jquery'),
    IScroll = require('iscroll/iscroll-probe'),
    ellipsis = require('mlellipsis');

require('lazyload');

//lazyLoad-Fn
function lazyLoad(imgs, options) {
    var setting = {
        effect : 'fadeIn',
        effect_speed: 10,
        placeholder: 'data:image/gif;base64,R0lGODlhAQABAJEAAAAAAP///93d3f///yH5BAEAAAMALAAAAAABAAEAAAICVAEAOw=='
    }, $imgs;
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
            hasAt= true;
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
        
        document.addEventListener('touchmove', function (e) {
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