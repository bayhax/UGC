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
// 顶部导航栏隐藏
//$(".hide_title").click(function(){
//    if($(".title_link ul").css('width') != '0px'){
//        $(".title_link ul").css({'margin-left':'25rem','width':'0','opacity':'0','overflow':'hidden'})
//        $(".hide_title img").css({"transform":"rotate(90deg)","transition":"all 0.5s ease-in-out"})
//    }else{
//        $(".title_link ul").css({'margin-left':'0','width':'35rem','opacity':'1','overflow':'hidden'})
//        $(".hide_title img").css({"transform":"rotate(0deg)","transition":"all 0.5s ease-in-out"})
//    }
//})
var game_video = document.getElementById('display_video');
function playPause(){
    if(game_video.paused){
        $(".play_pause").css("background", "no-repeat url(../static/img/play.png)");
        game_video.play();
    }
    else{
        $(".play_pause").css("background", "no-repeat url(../static/img/pause.png)");
        game_video.pause();
    }
};

