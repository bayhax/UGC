// 取消积分购买
$("#score_cancel").click(function(){
    window.close();
})
// 确认花费积分购买
$("#score_confirm").click(function(){
    var server_name = window.opener.document.getElementById("server_name").value;
    var max_player = window.opener.$("input[name='package']:checked").val();
    var rent_time = window.opener.$("input[name='rent_time']:checked").val();
    var date = new Date(Date.now());
    var start_time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    var end_time = window.opener.document.getElementById("deadline").innerText;
    var pay = $("#pay_score").html();
    // ajax  post请求，查看用户积分信息，能否购买
    var url = "/ugc_server/score_purchase";
    $.ajax({
        type: 'post',
        dataType: 'json',
        data: {'server_name':server_name, 'max_player':max_player, 'start_time':start_time, 'end_time':end_time, 'rent_time':rent_time, 'pay':pay},
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
})