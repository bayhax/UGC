// 初始显示邮箱绑定
user_center_right = $(".user_center_right")
span = document.getElementById("right_text")
button = document.getElementById("right_button")
function replace_pos(text,start,stop,replacetext){
     mystr = text.substring(0,start)+replacetext+text.substring(stop+1);
     return mystr;
}
hidden_email = $("#hidden_email").val()
if(hidden_email != null){
    span.innerHTML = "已绑定邮箱 " + replace_pos(hidden_email, 3, hidden_email.indexOf("@") - 1, '*****')
}
// 点击切换
$("#email").click(function(){
    $("#email").addClass("active_color")
    $("#password").removeClass("active_color")
    $("#change").attr("href", "/change_email_confirm")

    span.innerHTML = "已绑定邮箱 " + replace_pos(hidden_email, 3, hidden_email.indexOf("@") - 1, '*****')
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
$('#change_password1').blur(function() {
		check_pwd();
	});

$('#change_password2').blur(function() {
    check_cpwd();
});
function check_pwd(){
    var len = $('#change_password1').val().length;
    if(len<6||len>16)
    {
        $('#change_password1').next().html('密码最少6位，最长16位')
        $('#change_password1').next().show();
        error_password = true;
    }
    else
    {
        $('#change_password1').next().hide();
        error_password = false;
    }
}


function check_cpwd(){
    var pass = $('#change_password1').val();
    var cpass = $('#change_password2').val();

    if(pass!=cpass)
    {
        $('#change_password2').next().html('两次输入的密码不一致')
        $('#change_password2').next().show();
        error_check_password = true;
    }
    else
    {
        $('#change_password2').next().hide();
        error_check_password = false;
    }

}

