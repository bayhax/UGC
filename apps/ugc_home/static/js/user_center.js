// 初始显示邮箱绑定
user_center_right = $(".user_center_right")
span = document.getElementById("right_text")
button = document.getElementById("right_button")
// 点击切换
$("#email").click(function(){
    $("#email").addClass("active_color")
    $("#password").removeClass("active_color")
    $("#change").attr("href", "/change_email_confirm")
    span.innerText = "已绑定邮箱"
    button.innerText = "修改绑定邮箱"
})

$("#password").click(function(){
    $("#password").addClass("active_color")
    $("#email").removeClass("active_color")
    $("#change").attr("href", "/change_password_confirm")
    span.innerText = "定期更换密码有助于账号安全"
    button.innerText = "修改登录密码"
})

// 修改密码
$("#change").click(function(){
    var password1 = $("#change_password1").val()
    var password2 = $("#change_password2").val()
    if(password1 == password2){
        $.post("/change_password", {'new_password': password1}, function(){
            window.location.href = "/change_password_done"
        })
    }else{
        alert("两次输入的密码不一致，请重新输入")
        return false;
    }
})

// 修改邮箱
$("#change_email").click(function(){
    var email = $("#change_email_text").val()
    $.post("/change_email", {'new_email': email}, function(){
        window.location.href = "/change_email_done"
    })
})
