// 检查服务器名称规范
var error_check_server_name = false
var error_password = false
$("#server_name").blur(function(){
    check_server_name()
})

function check_server_name(){
    var name_len = $("#server_name").val().length
    if(name_len > 6){
        $('#server_name').next().html('服务器名称长度小于6位')
        $('#server_name').next().show();
        error_check_server_name = true;
    }else{
        $('#server_name').next().hide();
        error_check_server_name = false;
    }
}
// 检查服务器密码规范
$("#password").blur(function(){
    check_password()
})
function check_password(){
    if($("input[name='is_private']:checked").val() == 'on'){
        var len = $('#password').val().length;
        var re = /\s+/g
        if(re.test($("#password").val())){
            $('#password').next().html('密码不能有空格')
            $('#password').next().show();
            error_password = true;
        }
        else if(len<8||len>14)
        {
            $('#password').next().html('密码最少8位，最长14位')
            $('#password').next().show();
            error_password = true;
        }
        else
        {
            $('#password').next().hide();
            error_password = false;
        }
    }else{
        error_password = false;
    }
}

// 租赁服务器
// 服务器是否对外开放
$(document).on("change", "input[name='is_private']", function(){
    if($("input[name='is_private']:checked").val() == 'on'){
        $("#password").attr("readonly", null)
    }else{
        $("#password").attr("readonly", "readonly")
    }
})

// 是否勾选同意协议按钮
$(document).on("change", "input[name='agree']", function(){
    if($("input[name='agree']:checked").val() == 'on'){
        $("#pay_button").attr("disabled", null)
        $("#pay_button").css("background-color", "#0095c6")
    }else{
        $("#pay_button").attr("disabled", "disabled")
        $("#pay_button").css("background-color","#999")
    }
})

// 服务器租赁价格
function price(way) {
    var rent_time = $("input[name='rent_time']:checked").val();
    var number = $("input[name='package']:checked").val();
    var money = (rent_time * number).toFixed(2)
    if(rent_time == null || number == null){
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
        var pay_way_hidden = $("#pay_way_hidden").val()
        if(pay_way_hidden == "1"){
            price("weChat");
        }else{
            price("score");
        }
    }
})
$(".package_radio").change(function(){
    var pay_way_hidden = $("#pay_way_hidden").val()
    if(pay_way_hidden == "1"){
        price("weChat");
    }else{
        price("score");
    }
})
function pay_way(purchase_url){
    // 购买前必须能计算出金额
    var rent_time = $("input[name='rent_time']:checked").val();
    var number = $("input[name='package']:checked").val();
    var is_private = $("input[name='is_private']").val()
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
        // 租赁服务器所需信息变量  服务器名称/最大人数/租赁时间
        var server_name = document.getElementById("server_name").value;
        var max_player = $("input[name='package']:checked").val();
        var rent_time = $("input[name='rent_time']:checked").val();
        var date = new Date(Date.now());
        var start_time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        date.setTime(date.getTime() + rent_time * 60 * 60 * 24 * 1000);
        var end_time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        // 所选择的地域
        var select_region = document.getElementById("select_region")
        var region_index = select_region.selectedIndex
        var region = select_region.options[region_index].text
        // 是否私密
        var is_private
        var password = ''
        // 检查服务器名称和密码规则
        check_server_name()
        check_password()
        if($("input[name='is_private']:checked").val() == "on"){
            is_private = 1
            password = $("#password").val()
        }else{
            is_private = 0
        }
        if(rent_time == null || max_player == null || error_password == true || error_check_server_name == true){
            alert('请选择正确的租赁套餐（人数和时长）,并按规则填写服务器名称和密码');
        }else{
            var user_id = $("#user_id").val()
            if(user_id !== ''){
                var price = rent_time * max_player
                // 支付页面弹出居中
                if($("input[name='agree']:checked").val() == 'on'){
                    var url = "/ugc_server/score_purchase";
                    $.ajax({
                        type: 'post',
                        dataType: 'json',
                        data: {'server_name':server_name, 'max_player':max_player, 'is_private': is_private, 'password':password,
                        'start_time':start_time, 'end_time':end_time, 'rent_time':rent_time, 'price':price, 'region': region},
                        url: url,
                        success: function(ret){
                            alert(ret.tips)
                        },
                        error: function(ret){
                            alert(ret.tips)
                        },
                        timeout: function(){
                            alert('连接超时，请稍后再试')
                        },
                    })
                }else{
                    alert('请勾选协议按钮')
                }
            }else{
                alert('请先登录')
            }
        }
    }
})