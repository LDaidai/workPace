(function () {
//    调用选项卡
    tab();
    //2 .动态创建元素
    autoCreateImg();


    //3.  瀑布流布局
    setTimeout(function () {
        waterFull("dom-pull", "box");
    }, 200);
    
    //4.窗口的滚动
    window.onscroll=function () {
        if (checkWillloadImage() ){
            autoCreateImg();
            waterFull("dom-pull", "box");
        }

        //4.2 判断是否吸顶
        var scrollTop=scroll().top;
        if (scrollTop>=150){
            $("top_nav").style.display="block";
            $("elevator").style.display="block";
        } else {
            $("top_nav").style.display="none";
            $("elevator").style.display="none";
        }

        //4.4 滚回顶部

        var scroll_top = 0, begin = 0, end = 0, timer = null;
        scroll_top = scroll().top;
        begin = scroll_top;
        $("elevator").onclick=function () {
            clearInterval(timer);

            //开启缓动动画
            timer = setInterval(function () {
                begin = begin + (end - begin) / 100;                                         //(除以的数相当于回到顶部的速度)
                window.scrollTo(0, begin);

                //清除定时器
                if (parseInt(begin) === end) {
                    clearInterval(timer);
                }
            }, 20)
        }

    };
    $("login").onclick=function () {
        $("mask").style.display="block";
    };
    $("close_btn").onclick=function () {
        $("mask").style.display="none";
    };


    //6.广告轮播
    bannerAutoPlay();
})(window);
function bannerAutoPlay() {
    //1.获取所有li标签
    var lis=$("slider_banner").getElementsByTagName("li");
    var index=0;
    //2.开始定时器
    setInterval(function () {

        //2.1  改变透明度
        for (var i = 0; i <lis.length ; i++) {
            var sigerLi=lis[i];
          buffer(sigerLi,{opacity:0},null);
        }
        buffer(lis[index],{opacity:1},null);
        //2.2 索引++
        index++;
        if (index===lis.length){
            index=0;
        }

    },3000) ;
    clearTimeout();
}

function autoCreateImg() {
    //2.1  数据
    var json = [
        {txt: '任春风十里轻飏，奏一曲波澜眷恋。', pic: 'img/1.png'},
        {
            txt: '我慢慢地、慢慢地了解到，所谓父女母子一场，只不过意味着，你和他的缘分就是今生今世不断地在目送他的背影渐行渐远。你站在小路的这一端，看着他逐渐消失在小路转弯的地方，而且，他用背影默默地告诉你，不用追。------龙应台《目送》。',
            pic: 'img/2.png'
        },
        {txt: '春天从不偏心 她给每个人都要发一个春 ', pic: 'img/3.png'},
        {txt: '即便浪迹天涯，也要心有所属 ', pic: 'img/4.png'},
        {txt: '山河同寂，月明江湖。 - 回形岛 - CNU视觉联盟', pic: 'img/5.png'},
        {
            txt: '读书的女人，更善于倾听，书训练了她们耳朵，教会了她们谦逊，知道世间多明达之人，吸收即是成长。 她们更乐于思考，书开阔了她们眼界，拓展了原本纤细的胸怀，明白世态有正有反，一厢情愿只是幻想。她们更勇于决断，懂得万事有得必有失。 她们更充满自信，书让她们明辨自身长短，既不自大，也不自卑。 ',
            pic: 'img/6.png'
        },
        {
            txt: '真正的爱，终是不关风月，不逮风情，而是醉心于平淡流年，在时光里相守，在困苦间相牵，在老去中相望。别把爱情之路看得很远，徜徉其中尚觉得煎熬，偶然定睛回首，所有往事只是云淡风轻，情爱之旅亦不过弹指瞬间。爱之本质，原是烦忧与困苦，就算布满风尘险恶，皆需用心之虔诚默默守护。 ',
            pic: 'img/7.png'
        },
        {txt: '平生知己知谁是/十里樱花十里尘 ', pic: 'img/8.png'},
        {
            txt: '记住，好好活着，活过一切歧视、欺侮、不公和厄运。 并把这句话，作为自己一生的宗教。 如果打不败命运，你就活过命运。也就是说，它难缠，你要比它更难缠。记住，坚韧是最实用的方式，这样也许悲壮，但悲壮的活胜过悲怆的死。 —— 马德<br/>Tom Waits ',
            pic: 'img/9.png'
        },
        {txt: '眼儿媚<br/>王雱（宋）<br/>杨柳丝丝弄轻柔，烟缕织成愁。海棠未雨，梨花先雪，一半春休。<br/>而今往事难重省，归梦绕秦楼。相思只在，丁香枝上，豆蔻梢头。 ', pic: 'img/10.png'},
        {txt: 'selective focus photo of red rose flower ', pic: 'img/11.png'},
        {txt: '你曾是我平淡生活里的来日方长，最后猝不及防的成为了大梦一场。 ', pic: 'img/12.png'},
        {txt: '世乱他乡见落梅，野塘晴暖独徘徊。<br/>船冲水鸟飞还住，袖拂杨花去却来。 ', pic: 'img/13.png'},
        {txt: '楠梓兮采集/失恋博物馆/愿喜♡ ', pic: 'img/14.png'},
        {
            txt: '回首，一起走过的日子，自我们踏上缘分轮回的开始，到如今褪下往昔的尘嚣，几多缤纷，几许花红，构成了执子之手，与子偕老的传奇。十指交扣，桃花为盟，闭上眼睛，我便能感受到你款款的嫣然，缓缓地步入青石路上，最是那回眸一笑惊艳了唯美的诗行，我确不敢落墨，怕一执笔就会老去。 ',
            pic: 'img/15.png'
        },
        {txt: '任春风十里轻飏，奏一曲波澜眷恋。', pic: 'img/1.png'},
        {
            txt: '我慢慢地、慢慢地了解到，所谓父女母子一场，只不过意味着，你和他的缘分就是今生今世不断地在目送他的背影渐行渐远。你站在小路的这一端，看着他逐渐消失在小路转弯的地方，而且，他用背影默默地告诉你，不用追。------龙应台《目送》。',
            pic: 'img/2.png'
        },
        {txt: '春天从不偏心 她给每个人都要发一个春 ', pic: 'img/3.png'},
        {txt: '即便浪迹天涯，也要心有所属 ', pic: 'img/4.png'},
        {txt: '山河同寂，月明江湖。 - 回形岛 - CNU视觉联盟', pic: 'img/5.png'},
        {
            txt: '读书的女人，更善于倾听，书训练了她们耳朵，教会了她们谦逊，知道世间多明达之人，吸收即是成长。 她们更乐于思考，书开阔了她们眼界，拓展了原本纤细的胸怀，明白世态有正有反，一厢情愿只是幻想。她们更勇于决断，懂得万事有得必有失。 她们更充满自信，书让她们明辨自身长短，既不自大，也不自卑。 ',
            pic: 'img/6.png'
        },
        {
            txt: '真正的爱，终是不关风月，不逮风情，而是醉心于平淡流年，在时光里相守，在困苦间相牵，在老去中相望。别把爱情之路看得很远，徜徉其中尚觉得煎熬，偶然定睛回首，所有往事只是云淡风轻，情爱之旅亦不过弹指瞬间。爱之本质，原是烦忧与困苦，就算布满风尘险恶，皆需用心之虔诚默默守护。 ',
            pic: 'img/7.png'
        },
        {txt: '平生知己知谁是/十里樱花十里尘 ', pic: 'img/8.png'},
        {
            txt: '记住，好好活着，活过一切歧视、欺侮、不公和厄运。 并把这句话，作为自己一生的宗教。 如果打不败命运，你就活过命运。也就是说，它难缠，你要比它更难缠。记住，坚韧是最实用的方式，这样也许悲壮，但悲壮的活胜过悲怆的死。 —— 马德<br/>Tom Waits ',
            pic: 'img/9.png'
        },
        {txt: '眼儿媚<br/>王雱（宋）<br/>杨柳丝丝弄轻柔，烟缕织成愁。海棠未雨，梨花先雪，一半春休。<br/>而今往事难重省，归梦绕秦楼。相思只在，丁香枝上，豆蔻梢头。 ', pic: 'img/10.png'},
        {txt: 'selective focus photo of red rose flower ', pic: 'img/11.png'},
        {txt: '你曾是我平淡生活里的来日方长，最后猝不及防的成为了大梦一场。 ', pic: 'img/12.png'},
        {txt: '世乱他乡见落梅，野塘晴暖独徘徊。<br/>船冲水鸟飞还住，袖拂杨花去却来。 ', pic: 'img/13.png'},
        {txt: '楠梓兮采集/失恋博物馆/愿喜♡ ', pic: 'img/14.png'},
        {
            txt: '回首，一起走过的日子，自我们踏上缘分轮回的开始，到如今褪下往昔的尘嚣，几多缤纷，几许花红，构成了执子之手，与子偕老的传奇。十指交扣，桃花为盟，闭上眼睛，我便能感受到你款款的嫣然，缓缓地步入青石路上，最是那回眸一笑惊艳了唯美的诗行，我确不敢落墨，怕一执笔就会老去。 ',
            pic: 'img/15.png'
        },
    ], str, txt, pic, htmlStr;

    //2.2遍历
    for (var i = 0; i < 30; i++) {
        //2.2.0  获取父标签的文本
        str = $("dom-pull").innerHTML;

//2.2.1  取出图片的地址和文字
        txt = json[i].txt;
        pic = json[i].pic;

        //2.2.2  创建子标签
        htmlStr = "<div class='box'>" +
            "<div class='pic'>" +
            "<img src=" + pic + " alt=''>" +
            "<div class='cover'></div>" +
            "</div>" +
            "<p>" + txt + "</p>" +
            "<div class='btn-box'  >" +
            "<a href='' class='collect'>采集</a>" +
            "<a href='' class='like'>" +
            "<span class='heart'></span>" +
            "</a></div></div>";


        //2.2.3  拼接
        str += htmlStr;
        $("dom-pull").innerHTML = str;

        //2.2.4  绑定事件
        var warpBox = $('dom-pull').getElementsByClassName("box");
        var warpPic = $('dom-pull').getElementsByClassName("pic");

        for (var j = 0; j < warpBox.length; j++) {

            warpBox[j].onmouseover = function () {
                this.childNodes[2].style.display = "block";
            };
            warpBox[j].onmouseout = function () {
                this.childNodes[2].style.display = "none";
            };
            warpPic[j].onmouseover = function () {
                this.childNodes[1].style.display = "block";
            };
            warpPic[j].onmouseout = function () {
                this.childNodes[1].style.display = "none";
            };
        }
    }
}


function tab() {
//    获取需要标签
    var allLis = $("tab_header").getElementsByTagName("li");
    var doms = $("tab_content").getElementsByClassName("dom");
    var lastOne = 0;
//    2.遍历监听
    for (var i = 0; i < allLis.length; i++) {
        var li = allLis[i];
        (function (i) {
            li.onmousedown = function () {
                //  1.  清除样式
                allLis[lastOne].className = "";
                doms[lastOne].style.display = "none";
                //   2. 设置选中
                this.className = "current";
                doms[i].style.display = "block";
                //   3. 赋值
                lastOne = i;
            }
        })(i);
    }
}

function $(id) {
    return typeof id === "string" ? document.getElementById(id) : null;
}