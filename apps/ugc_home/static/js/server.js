// 服务器租赁价格
function price() {
    var rent_time = $("input[name='rent_time']:checked").val();
    var number = $("input[name='package']:checked").val();
    if(rent_time == null || rent_time == 'on' || number == null){
        return false
    }else{
        document.getElementById("score").innerText = number * rent_time + " 积分获得"
        document.getElementById("money").innerText = number * rent_time + "￥ 购买"
    }
}
// 服务器租赁截止日期
$(".rent_time_radio").change(function(){
    var date = new Date(Date.now());
    var rent_time = $("input[name='rent_time']:checked").val();
    if(rent_time != 'on'){
        date.setTime(date.getTime() + rent_time * 60 * 60 * 24 * 1000);
        var end = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        document.getElementById("deadline").innerText = end;
        price();
    }
})
$(".package_radio").change(function(){
    price();
})