/**
 * 模拟数据
 * @author: xuqi(qi.xu@yoho.cn)
 * @date: 2015/3/30
 */
module.exports = function(flag) {
    switch (flag) {
        //"逛"页面模拟数据
        case 'saunter':
            return {
                author: {
                    avatar: 'http://7xidk0.com1.z0.glb.clouddn.com/avater.png',
                    name: '山本耀司',
                    intro: '日本设计界一代宗师,分享一些个人区委分享内容不求有用但求有趣区委分享内容不求有用但求有趣区委分享内容不求有用但求有趣区委分享内容不求有用但求有趣',
                    url: ''
                },
                article: {
                    title: 'Skin Art Series INN 2015新品',
                    publishTime: '2月13日 12:34',
                    pageView: 3445,
                    content: [
                        {
                            text: {
                                deps: '复古风劲吹，在各路复古跑鞋嚣张跋扈的当下，历史悠久的Onitsuka也动作频频'
                            }
                        },
                        {
                            text: {
                                deps: '测试商品组行为奇怪的问题'
                            }
                        },
                        {
                            recommendation: {
                                list: [
                                    {
                                        id: 1,
                                        thumb: 'http://img11.static.yhbimg.com/goodsimg/2015/03/02/07/01ebfb219e22770ffb0c2c3a2cbb2b4bef.jpg?imageMogr2/thumbnail/235x314/extent/235x314/background/d2hpdGU=/position/center/quality/90',
                                        name: 'GAWS DIGI 丛林数码印花拼接卫衣',
                                        isLike: false,
                                        price: 1268,
                                        salePrice: 589,
                                        isSale: true,
                                        isFew: true,
                                        isNew: false,
                                        url: '',
                                        likeUrl: ''
                                    },
                                    {
                                        id: 2,
                                        thumb: 'http://img13.static.yhbimg.com/goodsimg/2015/03/03/08/023d70c59e81ccbfb39404487aaf642da2.jpg?imageMogr2/thumbnail/235x314/extent/235x314/background/d2hpdGU=/position/center/quality/90',
                                        name: 'CLOTtee 撞色连帽外套',
                                        isLike: false,
                                        price: 488,
                                        salePrice: 139,
                                        isSale: true,
                                        isFew: true,
                                        isNew: false,
                                        url: '',
                                        likeUrl: ''
                                    },
                                    {
                                        id: 3,
                                        thumb: 'http://img12.static.yhbimg.com/goodsimg/2015/03/02/08/02e2d44125e95495e3152aa459fa6b9b0c.jpg?imageMogr2/thumbnail/235x314/extent/235x314/background/d2hpdGU=/position/center/quality/90',
                                        name: 'HALFGIRL 插肩棒球服短裙套装',
                                        isLike: true,
                                        price: 478,
                                        salePrice: 208,
                                        isSale: true,
                                        isFew: true,
                                        isNew: false,
                                        url: '',
                                        likeUrl: ''
                                    },
                                    {
                                        id: 4,
                                        thumb: 'http://img12.static.yhbimg.com/goodsimg/2015/03/03/08/022f25fbe177ee12803c522f04fcce06d0.jpg?imageMogr2/thumbnail/235x314/extent/235x314/background/d2hpdGU=/position/center/quality/90',
                                        name: '黄伟文Wyman X yohood联名商品YYYOHOOD连帽卫衣',
                                        isLike: false,
                                        salePrice: 148,
                                        isSale: false,
                                        isFew: false,
                                        isNew: true,
                                        url: '',
                                        likeUrl: ''
                                    }
                                ]
                            }
                        },
                        {
                            collocation: { 
                                list: [
                                    {
                                        thumb: 'http://7xidk0.com1.z0.glb.clouddn.com/clothe.png',
                                        type: 'pants',
                                        products: [
                                            {
                                                id: 1,
                                                thumb: 'http://img11.static.yhbimg.com/goodsimg/2015/03/02/07/01ebfb219e22770ffb0c2c3a2cbb2b4bef.jpg?imageMogr2/thumbnail/235x314/extent/235x314/background/d2hpdGU=/position/center/quality/90',
                                                name: 'GAWS DIGI 丛林数码印花拼接卫衣',
                                                isLike: false,
                                                price: 1268,
                                                salePrice: 589,
                                                isSale: true,
                                                isFew: true,
                                                isNew: false,
                                                url: '',
                                                likeUrl: ''
                                            },
                                            {
                                                id: 2,
                                                thumb: 'http://img13.static.yhbimg.com/goodsimg/2015/03/02/08/023f696cf1ae78688bc6c8edeccc480c2c.jpg?imageMogr2/thumbnail/235x314/extent/235x314/background/d2hpdGU=/position/center/quality/90',
                                                name: 'CLOTtee 撞色连帽外套',
                                                isLike: false,
                                                price: 488,
                                                salePrice: 139,
                                                isSale: true,
                                                isFew: true,
                                                isNew: false,
                                                url: '',
                                                likeUrl: ''
                                            },
                                            {
                                                id: 3,
                                                thumb: 'http://img11.static.yhbimg.com/goodsimg/2015/03/02/07/01ebfb219e22770ffb0c2c3a2cbb2b4bef.jpg?imageMogr2/thumbnail/235x314/extent/235x314/background/d2hpdGU=/position/center/quality/90',
                                                name: 'HALFGIRL 插肩棒球服短裙套装',
                                                isLike: true,
                                                price: 478,
                                                salePrice: 208,
                                                isSale: true,
                                                isFew: true,
                                                isNew: false,
                                                url: '',
                                                likeUrl: ''
                                            },
                                            {
                                                id: 4,
                                                thumb: 'http://img10.static.yhbimg.com/goodsimg/2015/01/08/07/012f23fc2390ccd634082d34cc2982bf4c.jpg?imageMogr2/thumbnail/235x314/extent/235x314/background/d2hpdGU=/position/center/quality/90',
                                                name: '黄伟文Wyman X yohood联名商品YYYOHOOD连帽卫衣',
                                                isLike: false,
                                                price: 589,
                                                salePrice: 148,
                                                isSale: false,
                                                isFew: false,
                                                isNew: true,
                                                url: '',
                                                likeUrl: ''
                                            }
                                        ]
                                    },
                                    {
                                        thumb: 'http://7xidk0.com1.z0.glb.clouddn.com/clothe.png',
                                        type: 'swim-suit',
                                        products: [
                                            {
                                                id: 1,
                                                thumb: 'http://img11.static.yhbimg.com/goodsimg/2015/03/02/07/01ebfb219e22770ffb0c2c3a2cbb2b4bef.jpg?imageMogr2/thumbnail/235x314/extent/235x314/background/d2hpdGU=/position/center/quality/90',
                                                name: 'GAWS DIGI 丛林数码印花拼接卫衣',
                                                isLike: false,
                                                price: 1268,
                                                salePrice: 589,
                                                isSale: true,
                                                isFew: true,
                                                isNew: false,
                                                url: '',
                                                likeUrl: ''
                                            },
                                            {
                                                id: 2,
                                                thumb: 'http://img13.static.yhbimg.com/goodsimg/2015/03/02/08/023f696cf1ae78688bc6c8edeccc480c2c.jpg?imageMogr2/thumbnail/235x314/extent/235x314/background/d2hpdGU=/position/center/quality/90',
                                                name: 'CLOTtee 撞色连帽外套',
                                                isLike: false,
                                                price: 488,
                                                salePrice: 139,
                                                isSale: true,
                                                isFew: true,
                                                isNew: false,
                                                url: '',
                                                likeUrl: ''
                                            },
                                            {
                                                id: 3,
                                                thumb: 'http://img11.static.yhbimg.com/goodsimg/2015/03/02/07/01ebfb219e22770ffb0c2c3a2cbb2b4bef.jpg?imageMogr2/thumbnail/235x314/extent/235x314/background/d2hpdGU=/position/center/quality/90',
                                                name: 'HALFGIRL 插肩棒球服短裙套装',
                                                isLike: true,
                                                price: 478,
                                                salePrice: 208,
                                                isSale: true,
                                                isFew: true,
                                                isNew: false,
                                                url: '',
                                                likeUrl: ''
                                            },
                                            {
                                                id: 4,
                                                thumb: 'http://img10.static.yhbimg.com/goodsimg/2015/01/08/07/012f23fc2390ccd634082d34cc2982bf4c.jpg?imageMogr2/thumbnail/235x314/extent/235x314/background/d2hpdGU=/position/center/quality/90',
                                                name: '黄伟文Wyman X yohood联名商品YYYOHOOD连帽卫衣',
                                                isLike: false,
                                                price: 589,
                                                salePrice: 148,
                                                isSale: false,
                                                isFew: false,
                                                isNew: true,
                                                url: '',
                                                likeUrl: ''
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    ]
                },
                brands: {
                    list: [
                        {
                            thumb: 'http://7xidk0.com1.z0.glb.clouddn.com/logo.png',
                            name: 'HALFGIRL测试名字长的情况',
                            url: ''
                        },
                        {
                            thumb: 'http://7xidk0.com1.z0.glb.clouddn.com/logo.png',
                            name: '黄伟文Wyman',
                            url: ''
                        },
                        {
                            thumb: 'http://7xidk0.com1.z0.glb.clouddn.com/logo.png',
                            name: 'HIPANDA',
                            url: ''
                        },
                        {
                            thumb: 'http://7xidk0.com1.z0.glb.clouddn.com/logo.png',
                            name: 'holymoly',
                            url: ''
                        },
                        {
                            thumb: 'http://7xidk0.com1.z0.glb.clouddn.com/logo.png',
                            name: 'HALFGIRL',
                            url: ''
                        },
                        {
                            thumb: 'http://7xidk0.com1.z0.glb.clouddn.com/logo.png',
                            name: '黄伟文Wyman',
                            url: ''
                        }
                    ]
                },
                tags: {
                    list: [
                        {
                            name: '棒球服',
                            url: ''
                        },
                        {
                            name: '卫衣',
                            url: ''
                        },
                        {
                            name: '印花卫衣',
                            url: ''
                        },
                        {
                            name: '针织衫',
                            url: ''
                        },
                        {
                            name: '工装裤',
                            url: ''
                        },
                    ]
                },
                otherArticle: [
                    {
                        thumb: 'http://7xidk0.com1.z0.glb.clouddn.com/pant.png',
                        title: '复古风劲吹，在各路复古跑鞋嚣张跋扈的当下，历史悠久的Onitsuka',
                        url: ''
                    },
                    {
                        thumb: 'http://7xidk0.com1.z0.glb.clouddn.com/pant.png',
                        title: '复古风劲吹，在各路复古跑鞋嚣张跋扈的当下，历史悠久的Onitsuka',
                        url: ''
                    },
                    {
                        thumb: 'http://7xidk0.com1.z0.glb.clouddn.com/pant.png',
                        title: '复古风劲吹，在各路复古跑鞋嚣张跋扈的当下，历史悠久的Onitsuka',
                        url: ''
                    }
                ]
            };
        //标签页模拟数据
        case 'tag':
            return {
                query: '卫衣',
                gender: '1',
                content: [
                    {
                        id: 1,
                        img: 'http://7xidk0.com1.z0.glb.clouddn.com/bg.png',
                        alt: '复古风',
                        title: 'Skin Art Series INN 2015春季新品测试是否会被截取啊真是的',
                        text: '复古风劲吹，在各路复古跑鞋嚣张跋扈的当下，历史悠久的Onitsuka Tiger鬼冢' +
                              '虎也动作频频，于北京时间3.14日在东京发布其与意大利设计师AndreaPompilio合作的' +
                              '第2波--ONITSUKATIGER X ANDEREAPOMPILIO 2015秋冬新品便是其中之一。Yoho！Boy也' +
                              '为获取第一手的东宝特地来到东京并抢到了头排的“赏秀位”',
                        url: '',
                        publishTime: '2月13日 12:34',
                        pageView: 3445,
                        like: true,
                        share: false //不显示share标签
                    }
                ]
            };
        case 'matchs':
            return [
                {
                    id: 1,
                    img: 'http://7xidk0.com1.z0.glb.clouddn.com/bg.png',
                    alt: '复古风',
                    title: 'Skin Art Series INN 2015春季新品',
                    text: '复古风劲吹，在各路复古跑鞋嚣张跋扈的当下，历史悠久的Onitsuka Tiger鬼冢' +
                          '虎也动作频频，于北京时间3.14日在东京发布其与意大利设计师AndreaPompilio合作的' +
                          '第2波--ONITSUKATIGER X ANDEREAPOMPILIO 2015秋冬新品便是其中之一。Yoho！Boy也' +
                          '为获取第一手的东宝特地来到东京并抢到了头排的“赏秀位”',
                    url: '',
                    publishTime: '2月13日 12:34',
                    pageView: 3445,
                    like: true,
                    share: false //不显示share标签
                },
                {
                    id: 2,
                    img: 'http://7xidk0.com1.z0.glb.clouddn.com/bg.png',
                    alt: '复古风',
                    title: 'Skin Art Series INN 2015春季新品测试是否会被截取的长字符串',
                    text: '复古风劲吹，在各路复古跑鞋嚣张跋扈的当下，历史悠久的Onitsuka Tiger鬼冢' +
                          '虎也动作频频，于北京时间3.14日在东京发布其与意大利设计师AndreaPompilio合作的' +
                          '第2波--ONITSUKATIGER X ANDEREAPOMPILIO 2015秋冬新品便是其中之一。Yoho！Boy也' +
                          '为获取第一手的东宝特地来到东京并抢到了头排的“赏秀位”',
                    url: '',
                    publishTime: '2月13日 12:34',
                    pageView: 3445,
                    like: true,
                    share: false
                }
            ];
        //编辑页模拟数据
        case 'editor':
            return {
                author: {
                    id: 1,
                    avatar: 'http://7xidk0.com1.z0.glb.clouddn.com/avater.png',
                    name: '山本耀司',
                    info:'设计理念：他以简洁而富有韵味，线条流畅，反时尚的设计风格而著称。'
                },
                content: [
                    {
                        id: 1,
                        img: 'http://7xidk0.com1.z0.glb.clouddn.com/bg.png',
                        alt: '复古风',
                        title: 'Skin Art Series INN 2015春季新品',
                        text: '复古风劲吹，在各路复古跑鞋嚣张跋扈的当下，历史悠久的Onitsuka Tiger鬼冢' +
                              '虎也动作频频，于北京时间3.14日在东京发布其与意大利设计师AndreaPompilio合作的' +
                              '第2波--ONITSUKATIGER X ANDEREAPOMPILIO 2015秋冬新品便是其中之一。Yoho！Boy也' +
                              '为获取第一手的东宝特地来到东京并抢到了头排的“赏秀位”',
                        url: '',
                        publishTime: '2月13日 12:34',
                        pageView: 3445,
                        like: true,
                        share: false //不显示share标签
                    },
                    {
                        id: 2,
                        img: 'http://7xidk0.com1.z0.glb.clouddn.com/bg.png',
                        alt: '复古风',
                        title: 'Skin Art Series INN 2015春季新品',
                        text: '复古风劲吹，在各路复古跑鞋嚣张跋扈的当下，历史悠久的Onitsuka Tiger鬼冢' +
                              '虎也动作频频，于北京时间3.14日在东京发布其与意大利设计师AndreaPompilio合作的' +
                              '第2波--ONITSUKATIGER X ANDEREAPOMPILIO 2015秋冬新品便是其中之一。Yoho！Boy也' +
                              '为获取第一手的东宝特地来到东京并抢到了头排的“赏秀位”',
                        url: '',
                        publishTime: '2月13日 12:34',
                        pageView: 3445,
                        like: true,
                        share: false
                    }
                ]
            }
        //plus+star页模拟数据
        case 'ps':
            return {
                id: 1,
                banner: 'http://7xidk0.com1.z0.glb.clouddn.com/star-banner.png',
                logo: 'http://7xidk0.com1.z0.glb.clouddn.com/star-brand.png',
                name: 'SSUR',
                isLike: true,
                likeUrl: '',
                intro: '纽约地下街头品牌SSUR，由艺术家Russell所成立，近年来以恶搞、讽刺各大' +
                       '品牌而闻名，包括了CHANEL、ROLEX、Cartier等等。Ssur的创办人是艺术家' +
                       'Russell, ssur就是其名字反过来写。剩余的位置为了测试文字截取功能是我不' +
                       '得以而添加的，呵呵哒',
                newArrival: {
                    moreUrl: '',
                    naList: [
                        {
                            id: 1,
                            thumb: 'http://img13.static.yhbimg.com/goodsimg/2015/03/02/08/023f696cf1ae78688bc6c8edeccc480c2c.jpg?imageMogr2/thumbnail/235x314/extent/235x314/background/d2hpdGU=/position/center/quality/90',
                            name: 'GAWS DIGI 丛林数码印花拼接卫衣',
                            isLike: false,
                            price: 1268,
                            salePrice: 589,
                            isSale: true,
                            isFew: true,
                            isNew: false,
                            url: '',
                            likeUrl: ''
                        },
                        {
                            id: 2,
                            thumb: 'http://img10.static.yhbimg.com/goodsimg/2015/01/08/07/012f23fc2390ccd634082d34cc2982bf4c.jpg?imageMogr2/thumbnail/235x314/extent/235x314/background/d2hpdGU=/position/center/quality/90',
                            name: 'CLOTtee 撞色连帽外套',
                            isLike: false,
                            price: 488,
                            salePrice: 139,
                            isSale: true,
                            isFew: true,
                            isNew: false,
                            url: '',
                            likeUrl: ''
                        },
                        {
                            id: 3,
                            thumb: 'http://img13.static.yhbimg.com/goodsimg/2015/03/03/08/0244a127c89c1f77ab47f55891e45be1e6.jpg?imageMogr2/thumbnail/235x314/extent/235x314/background/d2hpdGU=/position/center/quality/90',
                            name: 'HALFGIRL 插肩棒球服短裙套装',
                            isLike: true,
                            price: 478,
                            salePrice: 208,
                            isSale: true,
                            isFew: true,
                            isNew: false,
                            url: '',
                            likeUrl: ''
                        },
                        {
                            id: 4,
                            thumb: 'http://img11.static.yhbimg.com/goodsimg/2015/03/02/09/0139514beb37bf2bf321eafd1a915117f5.jpg?imageMogr2/thumbnail/235x314/extent/235x314/background/d2hpdGU=/position/center/quality/90',
                            name: '黄伟文Wyman X yohood联名商品YYYOHOOD连帽卫衣',
                            isLike: false,
                            price: 589,
                            salePrice: 148,
                            isSale: false,
                            isFew: false,
                            isNew: true,
                            url: '',
                            likeUrl: ''
                        }
                    ]
                },
                article: {
                    info: [
                        {
                            id: 1,
                            img: 'http://7xidk0.com1.z0.glb.clouddn.com/bg.png',
                            title: '1.副线不知为何总是好看点',
                            content: '具有绅士气质的英伦风格是永走前沿的经典，在众多的Made ' +
                                     'In England中Panul Smith缔造了一个传奇',
                            publishTime: '2月13日 12:34',
                            pageView: 3445,
                            like: true,
                            share: true,
                            url: '',
                            likeUrl: ''
                        },
                        {
                            id: 2,
                            img: 'http://7xidk0.com1.z0.glb.clouddn.com/bg.png',
                            title: '2.副线不知为何总是好看点测试长度是否会被截取塞真的很恶心啊',
                            content: '具有绅士气质的英伦风格是永走前沿的经典，在众多的Made ' +
                                     'In England中Panul Smith缔造了一个传奇',
                            publishTime: '2月13日 12:34',
                            pageView: 3445,
                            like: true,
                            share: true,
                            url: '',
                            likeUrl: ''
                        }
                    ]
                }
            };
        //模板页数据
        case 'tpl':
            return {
                promotionId: 1, //促销id
                clientType: 'h5', //客户端类型
                contentCode: 1,
                blocks: [
                    {
                        img: {
                            src: 'http://7xidk0.com1.z0.glb.clouddn.com/pic01.png',
                            alt: '季末终极折扣',
                            url: ''
                        }
                    },
                    {
                        text: '清水翔太的很多作品都是词曲包办，这次由三人作曲的作品依然一听就知道是他的作品。'
                    },
                    {
                        //推荐列表
                        recommendation: {
                            recos: [
                                {
                                    id: 1,
                                    thumb: 'http://img13.static.yhbimg.com/goodsimg/2015/03/02/08/023f696cf1ae78688bc6c8edeccc480c2c.jpg?imageMogr2/thumbnail/235x314/extent/235x314/background/d2hpdGU=/position/center/quality/90',
                                    name: 'G-Star白色后腰拉链款男士牛仔裤测试一下名字太长了后的情况',
                                    price: 488,
                                    salePrice: 139,
                                    url: ''
                                },
                                {
                                    id: 2,
                                    thumb: 'http://img13.static.yhbimg.com/goodsimg/2015/03/02/08/023f696cf1ae78688bc6c8edeccc480c2c.jpg?imageMogr2/thumbnail/235x314/extent/235x314/background/d2hpdGU=/position/center/quality/90',
                                    name: 'G-Star白色后腰拉链款',
                                    price: 488,
                                    salePrice: 139,
                                    url: ''
                                },
                                {
                                    id: 3,
                                    thumb: 'http://img13.static.yhbimg.com/goodsimg/2015/03/02/08/023f696cf1ae78688bc6c8edeccc480c2c.jpg?imageMogr2/thumbnail/235x314/extent/235x314/background/d2hpdGU=/position/center/quality/90',
                                    name: 'G-Star白色后腰拉链款男士牛仔裤',
                                    price: 488,
                                    salePrice: 139,
                                    url: ''
                                },
                                {
                                    id: 1,
                                    thumb: 'http://img13.static.yhbimg.com/goodsimg/2015/03/02/08/023f696cf1ae78688bc6c8edeccc480c2c.jpg?imageMogr2/thumbnail/235x314/extent/235x314/background/d2hpdGU=/position/center/quality/90',
                                    name: 'G-Star白色后腰拉链款',
                                    price: 488,
                                    salePrice: 139,
                                    url: ''
                                },
                                {
                                    id: 1,
                                    thumb: 'http://img13.static.yhbimg.com/goodsimg/2015/03/02/08/023f696cf1ae78688bc6c8edeccc480c2c.jpg?imageMogr2/thumbnail/235x314/extent/235x314/background/d2hpdGU=/position/center/quality/90',
                                    name: 'G-Star白色后腰拉链款男士牛仔裤',
                                    price: 488,
                                    salePrice: 139,
                                    url: ''
                                },
                                {
                                    id: 1,
                                    thumb: 'http://img13.static.yhbimg.com/goodsimg/2015/03/02/08/023f696cf1ae78688bc6c8edeccc480c2c.jpg?imageMogr2/thumbnail/235x314/extent/235x314/background/d2hpdGU=/position/center/quality/90',
                                    name: 'G-Star白色后腰拉链款男士牛仔裤',
                                    price: 488,
                                    salePrice: 139,
                                    url: ''
                                },
                                {
                                    id: 1,
                                    thumb: 'http://img13.static.yhbimg.com/goodsimg/2015/03/02/08/023f696cf1ae78688bc6c8edeccc480c2c.jpg?imageMogr2/thumbnail/235x314/extent/235x314/background/d2hpdGU=/position/center/quality/90',
                                    name: 'G-Star白色后腰拉链款男士牛仔裤',
                                    price: 488,
                                    salePrice: 139,
                                    url: ''
                                }
                            ]
                        }
                    },
                    {
                        brands: {
                            list: [
                                {
                                    thumb: 'http://7xidk0.com1.z0.glb.clouddn.com/logo.png',
                                    name: 'HALFGIRL测试名字很长的情况怎么显示呢',
                                    url: ''
                                },
                                {
                                    thumb: 'http://7xidk0.com1.z0.glb.clouddn.com/logo.png',
                                    name: '黄伟文Wyman',
                                    url: ''
                                },
                                {
                                    thumb: 'http://7xidk0.com1.z0.glb.clouddn.com/logo.png',
                                    name: 'HIPANDA',
                                    url: ''
                                },
                                {
                                    thumb: 'http://7xidk0.com1.z0.glb.clouddn.com/logo.png',
                                    name: 'holymoly',
                                    url: ''
                                },
                                {
                                    thumb: 'http://7xidk0.com1.z0.glb.clouddn.com/logo.png',
                                    name: 'HALFGIRL',
                                    url: ''
                                },
                                {
                                    thumb: 'http://7xidk0.com1.z0.glb.clouddn.com/logo.png',
                                    name: '黄伟文Wyman',
                                    url: ''
                                }
                            ]
                        }
                    },
                    {
                        text: '清水翔太的很多作品都是词曲包办，这次由三人作曲的作品依然一听就知道是他的作品。'
                    },
                    {
                        goods: {
                            //classify初始化筛选主类的显示和active状态
                            classify: [
                                {
                                    type: 'brand',
                                    isActive: true,
                                    isHide: false,
                                    name: '品牌'
                                },
                                {
                                    type: 'msort',
                                    isActive: false,
                                    isHide: false,
                                    name: '品类'
                                },
                                {
                                    type: 'color',
                                    isActive: false,
                                    isHide: false,
                                    name: '颜色'
                                },
                                {
                                    type: 'size',
                                    isActive: false,
                                    isHide: false,
                                    name: '尺寸'
                                },
                                {
                                    type: 'price',
                                    isActive: false,
                                    isHide: false,
                                    name: '价格'
                                },
                                {
                                    type: 'discount',
                                    isActive: false,
                                    isHide: false,
                                    name: '折扣'
                                }
                            ],
                            //初始“最新”商品列表
                            newPatterns: [
                                {
                                    id: 1,
                                    thumb: 'http://img13.static.yhbimg.com/goodsimg/2015/03/02/08/023f696cf1ae78688bc6c8edeccc480c2c.jpg?imageMogr2/thumbnail/235x314/extent/235x314/background/d2hpdGU=/position/center/quality/90',
                                    name: 'GAWS DIGI 丛林数码印花拼接卫衣',
                                    isLike: false,
                                    price: 1268,
                                    salePrice: 589,
                                    isSale: true,
                                    isFew: true,
                                    isNew: false,
                                    url: '',
                                    likeUrl: ''
                                },
                                {
                                    id: 2,
                                    thumb: 'http://img10.static.yhbimg.com/goodsimg/2015/01/08/07/012f23fc2390ccd634082d34cc2982bf4c.jpg?imageMogr2/thumbnail/235x314/extent/235x314/background/d2hpdGU=/position/center/quality/90',
                                    name: 'CLOTtee 撞色连帽外套',
                                    isLike: false,
                                    price: 488,
                                    salePrice: 139,
                                    isSale: true,
                                    isFew: true,
                                    isNew: false,
                                    url: '',
                                    likeUrl: ''
                                },
                                {
                                    id: 3,
                                    thumb: 'http://img13.static.yhbimg.com/goodsimg/2015/03/03/08/0244a127c89c1f77ab47f55891e45be1e6.jpg?imageMogr2/thumbnail/235x314/extent/235x314/background/d2hpdGU=/position/center/quality/90',
                                    name: 'HALFGIRL 插肩棒球服短裙套装',
                                    isLike: true,
                                    price: 478,
                                    salePrice: 208,
                                    isSale: true,
                                    isFew: true,
                                    isNew: false,
                                    url: '',
                                    likeUrl: ''
                                },
                                {
                                    id: 4,
                                    thumb: 'http://img11.static.yhbimg.com/goodsimg/2015/03/02/09/0139514beb37bf2bf321eafd1a915117f5.jpg?imageMogr2/thumbnail/235x314/extent/235x314/background/d2hpdGU=/position/center/quality/90',
                                    name: '黄伟文Wyman X yohood联名商品YYYOHOOD连帽卫衣',
                                    isLike: false,
                                    price: 589,
                                    salePrice: 148,
                                    isSale: false,
                                    isFew: false,
                                    isNew: true,
                                    url: '',
                                    likeUrl: ''
                                }
                            ]
                        }
                    }
                ]
            };
        //模板页筛选子项结构
        case 'classification':
            return {
                brand: [
                    {
                        name: '所有品牌',
                        id: 0
                    },
                    {
                        name: 'HARDLYEVER\'S',
                        id: 1
                    },
                    {
                        name: 'DUNKELVOLK',
                        id: 2
                    },
                    {
                        name: 'izzue',
                        id: 3
                    },
                    {
                        name: ':CHOCOOLATE',
                        id: 4
                    },
                    {
                        name: 'Life·After Life',
                        id: 5
                    },
                    {
                        name: 'JOYRICH',
                        id: 6
                    },
                    {
                        name: '5CM',
                        id: 7
                    },
                    {
                        name: 'THETHING',
                        id: 8
                    }
                ],
                msort: [
                    {
                        name: '所有品类',
                        id: 0
                    },
                    {
                        name: '上衣',
                        id: 1
                    },
                    {
                        name: '裤装',
                        id: 2
                    },
                    {
                        name: '裙装',
                        id: 3
                    },
                    {
                        name: '鞋靴',
                        id: 4
                    },
                    {
                        name: '包类/装备',
                        id: 5
                    },
                    {
                        name: '服配',
                        id: 6
                    },
                    {
                        name: '创意生活',
                        id: 7
                    },
                    {
                        name: '内衣/泳衣',
                        id: 8
                    }
                ],
                color: [
                    {
                        name: '所有颜色',
                        id: 0
                    },
                    {
                        name: '黑色',
                        id: 1
                    },
                    {
                        name: '红色',
                        id: 2
                    },
                    {
                        name: '灰色',
                        id: 3
                    },
                    {
                        name: '黄色',
                        id: 4
                    },
                    {
                        name: '彩色',
                        id: 5
                    },
                    {
                        name: '棕色',
                        id: 6
                    },
                    {
                        name: '银色',
                        id: 7
                    },
                    {
                        name: '橙色',
                        id: 8
                    }
                ],
                size: [
                    {
                        name: '所有尺码',
                        id: 0
                    },
                    {
                        name: 'S',
                        id: 1
                    },
                    {
                        name: 'M',
                        id: 2
                    },
                    {
                        name: 'L',
                        id: 3
                    },
                    {
                        name: 'XL',
                        id: 4
                    },
                    {
                        name: 'XXL',
                        id: 5
                    },
                    {
                        name: 'XXXL',
                        id: 6
                    }
                ],
                price: [
                    {
                        name: '所有价格',
                        id: 0
                    },
                    {
                        name: '¥0-300',
                        id: 1
                    },
                    {
                        name: '¥300-600',
                        id: 2
                    },
                    {
                        name: '¥600-1000',
                        id: 3
                    },
                    {
                        name: '¥1000-2000',
                        id: 4
                    },
                    {
                        name: '¥2000以上',
                        id: 5
                    }
                ],
                discount: [
                    {
                        name: '所有折扣',
                        id: 0
                    },
                    {
                        name: '1~3折',
                        id: 1
                    },
                    {
                        name: '4~6折',
                        id: 2
                    },
                    {
                        name: '7~9折',
                        id: 3
                    }
                ]
            };
        //筛选查询返回
        case 'search':
            return [
                {
                    id: 1,
                    thumb: 'http://img13.static.yhbimg.com/goodsimg/2015/03/03/08/0244a127c89c1f77ab47f55891e45be1e6.jpg?imageMogr2/thumbnail/235x314/extent/235x314/background/d2hpdGU=/position/center/quality/90',
                    name: 'HALFGIRL 插肩棒球服短裙套装',
                    isLike: true,
                    price: 478,
                    salePrice: 208,
                    isSale: true,
                    isFew: true,
                    isNew: false,
                    url: '',
                    likeUrl: ''
                },
                {
                    id: 2,
                    thumb: 'http://img13.static.yhbimg.com/goodsimg/2015/03/02/08/023f696cf1ae78688bc6c8edeccc480c2c.jpg?imageMogr2/thumbnail/235x314/extent/235x314/background/d2hpdGU=/position/center/quality/90',
                    name: 'GAWS DIGI 丛林数码印花拼接卫衣',
                    isLike: false,
                    price: 1268,
                    salePrice: 589,
                    isSale: true,
                    isFew: true,
                    isNew: false,
                    url: '',
                    likeUrl: ''
                },
                {
                    id: 3,
                    thumb: 'http://img12.static.yhbimg.com/goodsimg/2015/04/20/09/02ef617e5704729b9e8741831d805fac20.jpg?imageMogr2/thumbnail/235x314/extent/235x314/background/d2hpdGU=/position/center/quality/90',
                    name: 'CLOTtee 撞色连帽外套',
                    isLike: false,
                    price: 488,
                    salePrice: 139,
                    isSale: true,
                    isFew: true,
                    isNew: false,
                    url: '',
                    likeUrl: ''
                },
                {
                    id: 4,
                    thumb: 'http://img13.static.yhbimg.com/goodsimg/2015/04/03/07/0235b2d48417d0e92b94484d284dca06fc.jpg?imageMogr2/thumbnail/235x314/extent/235x314/background/d2hpdGU=/position/center/quality/90',
                    name: 'Lee Cooper 蓝色花丛系T恤',
                    isLike: false,
                    price: 589,
                    salePrice: 148,
                    isSale: false,
                    isFew: false,
                    isNew: true,
                    url: '',
                    likeUrl: ''
                }
            ];
    }
};