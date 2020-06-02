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
}
format(timestamp2);
// 顶部导航栏隐藏
$(".hide_title").click(function(){
    if($(".title_link ul").css('width') != '0px'){
        $(".title_link ul").css({'margin-left':'90%','width':'0','opacity':'0','overflow':'hidden'})
    }else{
        $(".title_link ul").css({'margin-left':'0','width':'90%','opacity':'1','overflow':'hidden'})
    }
})