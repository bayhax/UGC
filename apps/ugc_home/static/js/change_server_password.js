$("#cancel").click(function(){
    window.close()
})
$("#confirm").click(function(){
    var server_id = $("#server_id").val()
    var password1 = $("#password1").val()
    var password2 = $("#password2").val()
    if(password1 == password2){
        $.post('/ugc_server/change_server_password', {'server_id':server_id, 'password': password1}, function(result){
            ret = JSON.parse(result)
            alert(ret.tips)
        })
    }else{
        alert('两次填入的密码不一致，请重新输入')
    }
})