// 服务器租赁价格
function price(way) {
    var rent_time = $("input[name='rent_time']:checked").val();
    var number = $("#max_player").val()
    var money = (rent_time * number).toFixed(2)
    if(rent_time == null){
        return false
    }else{
        if(way=="weChat"){
            document.getElementById("amount").innerHTML = "<img src='../static/img/weChat_pay.png'>" +
                                                          "<span class='pay_text'>微信扫码支付" +
                                                          "<span style='font-size:2.25rem;font-weight:bold;'>" +
                                                           money + "</span>元</span>"
        }else{
            document.getElementById("amount").innerHTML = "<span class='pay_text'>积分支付" +
                                                          "<span style='font-size:2.25rem;font-weight:bold;'>"
                                                          + money + "</span>积分</span>"
        }
    }
};
// 支付选择
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
    var end_time = $("#end_time").text()
    // 日期对象
    var date = new Date(end_time);
    // 起始日期
    var rent_time = $("input[name='rent_time']:checked").val();
    // 计算结束日期
    if(rent_time != 'on'){
        date.setTime(date.getTime() + rent_time * 60 * 60 * 24 * 1000);
        var minutes = date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()
        var end = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + " " + date.getHours() + ":" + minutes;
        document.getElementById("deadline").innerText = end;
        var pay_way_hidden = $("#pay_way_hidden").val()
        if(pay_way_hidden == "1"){
            price("weChat");
        }else{
            price("score");
        }
    }
})
// 支付按钮
$("#pay_button").on("click", function(){
    var pay_way_hidden = $("#pay_way_hidden").val()
    if(pay_way_hidden == "1"){

    }else{
        var rent_time = $("input[name='rent_time']:checked").val();
        var number = $("#max_player").val()
        var score = rent_time * number
        var server_id = $("#server_id").val()
        var renewal_end_time = document.getElementById("deadline").innerText
        $.post("/ugc_server/renewal", {'score': score, 'server_id':server_id, 'renewal_end_time': renewal_end_time}, function(result){
            var ret = JSON.parse(result)
            alert(ret.tips)
        })
    }
})