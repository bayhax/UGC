 // 整体swiper切换
var mySwiper = new Swiper('.swiper-container', {
    lazy: true,
    direction: 'vertical',
    mousewheel: true,
    hashNavigation:true,
    //pagination: {
    //  el: '.swiper-pagination',
    //  clickable: true,

    //},
});
// 导航条切换swiper页面
$('#index').click(function(){
    mySwiper.slideTo(0, 1000, true);
})
$('#ugc').click(function(){
    mySwiper.slideTo(1, 1000, true);
})
$('#contact').click(function(){
    mySwiper.slideTo(2, 1000, true);
})
$('#download').click(function(){
    mySwiper.slideTo(3, 1000, true);
})

// 新闻页面轮播
var ugcSwiper = new Swiper('.swiper-ugc', {
    direction: 'horizontal',
    lazy: {
        loadPrevNext: true,
    },
});
recognize_url_hash();
// 导航追踪
window.onhashchange=function(event){
    recognize_url_hash();
};
function recognize_url_hash(){
    if(window.location.hash=="#index" || window.location.hash==""){
        $("#index").addClass("active")
        $(".bg_img").css("background","url(../../static/img/bg_1.jpeg")
        $("#ugc,#contact,#download").removeClass("active")
    }else if(window.location.hash=="#ugc"){
        $("#ugc").addClass("active")
        $(".bg_img").css("background","url(../../static/img/bg_1.jpeg")
        $("#index,#contact,#download").removeClass("active")
    }else if(window.location.hash=="#contact"){
        $("#contact").addClass("active")
        $(".bg_img").css("background","url(../../static/img/bg_1.jpeg")
        $("#ugc,#index,#download").removeClass("active")
    }else{
        $("#download").addClass("active")
        $(".bg_img").css("background","url(../../static/img/bg_1.jpeg")
        $("#ugc,#contact,#index").removeClass("active")
    };
};