// 租赁服务器
// 服务器是否对外开放
$(document).on("change", "input[name='is_private']", function(){
    if($("input[name='is_private']:checked").val() == 'on'){

    }else{

    }
})
// 服务器租赁价格
function price(way) {
    var rent_time = $("input[name='rent_time']:checked").val();
    var number = $("input[name='package']:checked").val();
    if(rent_time == null || rent_time == 'on' || number == null){
        return false
    }else{
        if(way=="weChat"){
            document.getElementById("amount").innerHTML = "<span class='weChat_pay_text'>微信扫码支付<span id='money'>" +
                                                           number * rent_time+ "</span>元</span>"
        }else{
            document.getElementById("amount").innerHTML = "积分支付<span id='money'>" + number * rent_time + "</span>"
        }
    }
};
// 支付
$("#score_pay").on("click", function(){
    $("#weChat_pay").removeClass("pay_activate_li")
    $("#score_pay").addClass("pay_activate_li")
    $("#pay_way_hidden").val("2")
    price("score")
})
$("#weChat_pay").on("click", function(){
    $("#score_pay").removeClass("pay_activate_li")
    $("#weChat_pay").addClass("pay_activate_li")
    $("#pay_way_hidden").val("1")
    price("weChat")
})
// 服务器租赁截止日期
$(".rent_time_radio").change(function(){
    // 日期对象
    var date = new Date(Date.now());
    // 起始日期
    var start = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
    var rent_time = $("input[name='rent_time']:checked").val();
    // 计算结束日期
    if(rent_time != 'on'){
        date.setTime(date.getTime() + rent_time * 60 * 60 * 24 * 1000);
        var end = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
        document.getElementById("deadline").innerText = start + '——' + end;
        price("weChat");
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
// 支付按钮
$("#pay_button").on("click", function(){
    var pay_way_hidden = $("#pay_way_hidden").val()
    if(pay_way_hidden == "1"){
        pay_way("/ugc_server/money_purchase")
    }else{
        pay_way("/ugc_server/score_purchase")
    }
})