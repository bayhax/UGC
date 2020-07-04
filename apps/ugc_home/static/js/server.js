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
function pay_way(purchase_url){
    // 购买前必须能计算出金额
    var rent_time = $("input[name='rent_time']:checked").val();
    var number = $("input[name='package']:checked").val();
    if(rent_time == null || number == null){
        alert('请选择正确的租赁套餐（人数和时长）');
    }else{
        var user_id = $("#user_id").val()
        if(user_id !== ''){
            var price = rent_time * number
            // 支付页面弹出居中
            var iHeight = 200;
            var iWidth = 500;
            var iTop = (window.screen.availHeight - iHeight) / 2;
            var iLeft = (window.screen.availWidth - iWidth) / 2;

            var windowStyle = 'height=' + iHeight + ',width=' + iWidth + ',top=' + iTop + ',left=' + iLeft +
                                ',status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=0,titlebar=no';
            if($("input[name='agree']:checked").val() == 'on'){
                window.open(purchase_url + '?price=' + price, '支付页面', windowStyle)
            }else{
                alert('请勾选协议按钮')
            }
        }else{
            alert('请先登录')
        }
    }
}
// 积分获得
$("#score_purchase").click(function(){
    pay_way("/ugc_server/score_purchase")
})
// 人民币玩家
$("#money_purchase").click(function(){
    pay_way("/ugc_server/money_purchase")
})