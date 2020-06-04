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

// ugc页面
var ugcSwiper = new Swiper('.swiper-ugc', {
    direction: 'horizontal',
    lazy: {
        loadPrevNext: true,
    },
    mousewheel: false,
    hashNavigation:true,
});
$('#ugc_index').click(function(){
    ugcSwiper.slideTo(0, 1000, true);
})
$('#ugc_mod').click(function(){
    ugcSwiper.slideTo(1, 1000, true);
})
$('#ugc_server').click(function(){
    ugcSwiper.slideTo(2, 1000, true);
})
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
        $("#ugc_index").addClass("active_button")
        $("#ugc_mod,#ugc_server").removeClass("active_button")
    }else if(window.location.hash=="#contact"){
        $("#contact").addClass("active")
        $(".bg_img").css("background","url(../../static/img/bg_1.jpeg")
        $("#ugc,#index,#download").removeClass("active")
    }else if(window.location.hash=="#download"){
        $("#download").addClass("active")
        $(".bg_img").css("background","url(../../static/img/bg_1.jpeg")
        $("#ugc,#contact,#index").removeClass("active")
    }else if(window.location.hash=="#ugc_index"){
        mySwiper.slideTo(1, 500, true);
        $("#ugc_index").addClass("active_button")
        $("#ugc_mod,#ugc_server").removeClass("active_button")
    }else if(window.location.hash=="#ugc_mod"){
        mySwiper.slideTo(1, 500, true);
        $("#ugc_mod").addClass("active_button")
        $("#ugc_index,#ugc_server").removeClass("active_button")
    }else{
        mySwiper.slideTo(1, 500, true);
        $("#ugc_server").addClass("active_button")
        $("#ugc_mod,#ugc_index").removeClass("active_button")
    }
};