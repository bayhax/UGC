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

// 使footer始终固定在底部。
function footerPosition(){
    // footer对象, 当footer底部到页面顶端距离小于页面可见区域高度，固定页尾到底部
    var footer = $(".footer");
    var height = footer.offset().top + footer.height();
    if(height < document.body.clientHeight){
        $(".footer").addClass("fixed_bottom")
    }
}
function footerPosition2(){
    var footer = $(".footer");
    var scroll_height = $(document).scrollTop() + document.documentElement.clientHeight;
    var height = footer.offset().top + footer.height();
    if(scroll_height >= height){
        $(".footer").addClass("fixed_bottom")
    }else{
        $(".footer").removeClass("fixed_bottom")
    }
}
// 滑动和滚动时改变位置
footerPosition();
footerPosition2();
$(document).resize(footerPosition2)
$(document).scroll(footerPosition2)
