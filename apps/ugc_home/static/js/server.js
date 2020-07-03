// 服务器租赁价格
function price() {
    var rent_time = $("input[name='rent_time']:checked").val();
    var number = $("input[name='package']:checked").val();
    if(rent_time == null || rent_time == 'on' || number == null){
        return false
    }else{
        document.getElementById("score_purchase").innerText = number * rent_time + " 积分获得"
        document.getElementById("money_purchase").innerText = number * rent_time + "￥ 购买"
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
// 积分获得
$("#score_purchase").click(function(){
    // 购买前必须能计算出金额
    var rent_time = $("input[name='rent_time']:checked").val();
    var number = $("input[name='package']:checked").val();
    if(rent_time == null || number == null){
        return false;
    }else{
        var price = rent_time * number
        if($("input[name='agree']:checked").val() == 'on'){
            $.post("/ugc_server/purchase", {'price': price}, function(ret){

            })
        }else{
            window.open()
        }
    }
})
// 人民币玩家
$("#money_purchase").click(function(){
    if($("input[name='agree']:checked").val() == 'on'){
        window.open()
    }else{
        window.open()
    }
})