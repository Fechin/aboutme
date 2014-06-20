(function($){
    // 全局变量，就靠它了
    var Fechin = {
        scrolling:false,
        curr_section:1,
        max_font_size:80,
        min_font_size:30,
        curr_fadeliNo:-1
    };

    Fechin.initial = function(){
        // 初始化高频对象
        Fechin.navs = $("#nav li a");
        Fechin.header = $("#header");
        Fechin.secs = $("#section-wrap section");
        Fechin.secslen = Fechin.secs.length;
        Fechin.fadelst = $(".fade li");
        Fechin.fadelstlen = Fechin.fadelst.length;

        $('html').animate({scrollTop:0},function(){
            $('body').animate({scrollTop:0},Fechin.fadeInText);
        });
    };

    // 鼠标滚轮方向
    Fechin.mouseWheel = function(){
        $(document).on("DOMMouseScroll mousewheel", function(e){
            e.preventDefault();
            if (e.originalEvent.detail > 0 || e.originalEvent.wheelDelta <0 ){
                // 向下滚动
                Fechin.scrollPage(true);
            }
            else{
                Fechin.scrollPage(false);
            }
        });
    };

    // 响应鼠标滚动事件
    Fechin.scrollPage = function(direction){
        if (Fechin.scrolling || (!direction && Fechin.curr_section === 1)){
            return;
        }
        Fechin.scrolling = true;
        var next_section_no = direction ? ++Fechin.curr_section:--Fechin.curr_section;
        var scrollHeight = Fechin.scrollHeight(next_section_no);

        if (Fechin.curr_section >  Fechin.secslen || Fechin.curr_section < 1){
            Fechin.scrolling = false;
            return;
        }

        var timer = setTimeout(function () { 
            $('html,body').stop().animate({scrollTop: scrollHeight}, 'fast', function(){
                Fechin.scrolling = false;
                Fechin.navsPos(Fechin.curr_section);
            });
            clearTimeout(timer);
        }, 200); 
    };

    // 滚动高度
    Fechin.scrollHeight = function(next_section_no){
        if (Fechin.curr_section > Fechin.secslen){
            Fechin.curr_section = Fechin.secslen;
        } 
        if (Fechin.curr_section < 1){
            Fechin.curr_section = 1;
        }
        var differ = next_section_no - 1;
        return $(window).height() * differ;
    };

    // 导航点击交互
    Fechin.navsClick= function(){
        Fechin.navs.each(function(i,n){
            i++;
            $(n).click(function(e){
                e.preventDefault();
                $('html,body').stop().animate({scrollTop:Fechin.scrollHeight(i)},300,function(){
                    Fechin.curr_section = i;
                    Fechin.navsPos(i);
                });
            });
        });
    };

    // 导航位置变换
    Fechin.navsPos = function(i){
        // 向下停靠
        var top = i == 1 ? -Fechin.header.height() : 0;
        // 首页向上滚动不做处理
        Fechin.header.stop().animate({top:top},300,function(){
            Fechin.fadelst.hide();
            Fechin.fadeInText();
        });
    };


    // loading 处理
    Fechin.loading = function(){
        var loading = $("aside.loading");
        var timer = setTimeout(function(){
            if (loading.length){
                loading.fadeOut(function(){
                    loading.remove();
                });
            }
        },500);
    };

    // 首页渐显文本
    Fechin.fadeInText = function(){
        // 当前不是首页
        if (Fechin.header.offset().top > -Fechin.header.height()){
            return;
        }
        // 减少重复
        var tempNo = Math.floor(Math.random() * Fechin.fadelstlen);
        Fechin.curr_fadeliNo = Fechin.curr_fadeliNo == tempNo ? Fechin.curr_fadeliNo++ : tempNo;

        console.log(Fechin.curr_fadeliNo);

        var e = Fechin.fadelst.eq(Fechin.curr_fadeliNo);
        var size = (Math.random() * Fechin.max_font_size + Fechin.min_font_size).toFixed();
        e.css({"font-size":size + "px"});

        var posx = (Math.random() * ($(window).width() - e.width())).toFixed();
        var posy = (Math.random() * ($(window).height() - e.height())).toFixed();
        console.log("text:"+e.text()+"font-size:"+size+"\tew:"+e.width()+"\teh:"+e.height()+"\tposx:"+posx+"\tposy:"+posy);

        e.css({
            'position':'absolute',
            'left':posx+'px',
            'top':posy+'px'
        }).fadeIn(500).delay(Math.random()*1000).fadeOut(Math.random()*800,Fechin.fadeInText); 
    };


    $(window).load(function(){
        Fechin.initial();
        Fechin.mouseWheel();
        Fechin.navsClick();
        Fechin.loading();
    });
})(window.jQuery);
