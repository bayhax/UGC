// 2020.04.04全国抗击疫情哀悼日灰色
var timestamp2 = (new Date()).valueOf();
function format(shijianchuo)
{
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    if( d == 4 && m == 4 & y == 2020) {
        $('body').addClass('gray');
    }
};
format(timestamp2);

//// 使footer始终固定在底部。
//function footerPosition(){
//    // footer对象, 当footer底部到页面顶端距离小于页面可见区域高度，固定页尾到底部
//    var footer = $(".footer");
//    var height = footer.offset().top + footer.height();
//    if(height < document.body.clientHeight){
//        $(".footer").addClass("fixed_bottom")
//    }
//}
//function footerPosition2(){
//    var footer = $(".footer");
//    var scroll_height = $(document).scrollTop() + document.documentElement.clientHeight;
//    var height = footer.offset().top + footer.height();
//    if(scroll_height >= height){
//        $(".footer").addClass("fixed_bottom")
//    }else{
//        $(".footer").removeClass("fixed_bottom")
//    }
//}
//// 滑动和滚动时改变位置
//footerPosition();
//footerPosition2();
//$(document).resize(footerPosition2)
//$(document).scroll(footerPosition2)

//function footer_test(){
//    $(".footer").removeClass("fixed_bottom");
//    var contentHeight = document.body.scrollHeight
//    var winHeight = window.innerHeight;
//    if(!(contentHeight>winHeight)){
//        $(".footer").addClass("fixed_bottom");
//    }
//}
//footer_test();
//$(window).resize(footer_test);

// 积分格式化
function score_format(){
    var score = parseInt($("#score").text().split(":")[1])
    var format_score
    if(score >= 100000000){
        format_score = (score / 100000000).toFixed(2) + "亿"
    }else if(score>=10000){
        format_score = (score / 10000).toFixed(2) + "万"
    }else{
        format_score = score
    }
    $("#score").text("积分:" + format_score)
}
score_format()


// 返回顶部
function backTop(minHeight){
    var backTopHtml = "<div id='backTopBtn'></div>"
    $(".ugc_box").append(backTopHtml)
    // 初始时隐藏箭头
    $("#backTopBtn").fadeOut(100)
    // 返回到顶部所需时间，及鼠标悬停时样式
    $("#backTopBtn").click(function(){
        $("html, body").animate({scrollTop:0}, 500)
    }).hover(
        function(){

        },
        function(){

        }
    )

    // 最大多少距离会显示箭头
    minHeight = 400

    // 页面滚动时距离顶部距离，确定显示或者隐藏返回顶部箭头
    $(window).scroll(function(){
        // 滚动条距离顶部距离， 大于minHeight，显示箭头，都则隐藏。
        var s = $(window).scrollTop()
        if(s > minHeight){
            $("#backTopBtn").fadeIn(100)
        }else{
            $("#backTopBtn").fadeOut(100)
        }
    })
}
backTop()