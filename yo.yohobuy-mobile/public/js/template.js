/**
 * 模板页js
 * @author: xuqi(qi.xu@yoho.cn)
 * @date；2015/4/14
 */

var $ = require('jquery'),
    _ = require('underscore'),
    ellipsis = require('mlellipsis'),
    Mustache = require('mustache'),
    timer = null;

require('lazyload');

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
                    if(classification.hasOwnProperty(c)) {
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