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

