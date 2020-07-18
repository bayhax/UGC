$("#confirm").click(function(){
    var password = $("#authenticate_password").val()
    var id_num = window.atob(window.location.search.substring(1)).split('=')[1]
    var private
    if(window.opener.$("#is_server_private_" + id_num).is(":checked")){
        private = 0
    }else{
        private = 1
    }
    $.post("/ugc_server/authenticate_password", {"password": password, "server_id": id_num, "private": private}, function(result){
        ret = JSON.parse(result)
        if(ret.tips == "1"){
            if(window.opener){
                // 改变父窗口状态
                if(window.opener.$("#is_server_private_" + id_num).is(":checked")){
                    window.opener.$("#is_server_private_"+id_num).prop("checked", false)
                    window.opener.$("#is_server_private_text_"+id_num).text("开放")
                }else{
                    window.opener.$("#is_server_private_"+id_num).prop("checked", true)
                    window.opener.$("#is_server_private_text_"+id_num).text("私密")
                }
                // window.opener.location.reload()
                window.close()
                // 返回父窗口
            }
        }else{
            alert("密码输入错误，请重新输入")
        }
    })
})
$("#cancel").click(function(){
    window.close()
})