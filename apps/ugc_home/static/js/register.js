$(function(){

	var error_name = false;
	var error_password = false;
	var error_check_password = false;
	var error_email = false;
	var error_check = false;

    if($("#hidden_errmsg").val() != ''){
        alert($("#hidden_errmsg").val())
    }

	$('#username').blur(function() {
		check_user_name()
	});

	$('#pwd').blur(function() {
		check_pwd();
	});

	$('#cpwd').blur(function() {
		check_cpwd();
	});

	$('#email').blur(function() {
		check_email();
	});

    $("#identity").blur(function(){
        check_identity();
    })

	$('#agree').click(function() {
		if($(this).is(':checked'))
		{
			error_check = false;
			$(this).siblings('span').hide();
		}
		else
		{
			error_check = true;
			$(this).siblings('span').html('请勾选同意');
			$(this).siblings('span').show();
		}
	});


	function check_user_name(){
		var len = $('#username').val().length;
		var re = /^\s/
		if(re.test($('#username').val())){
		    $('#username').next().html('用户名不能以空格开头')
			$('#username').next().show();
			error_name = true;
		}
		else if(len>20)
		{
			$('#username').next().html('请输入少于20个字符的用户名')
			$('#username').next().show();
			error_name = true;
		}
		else
		{
			$('#username').next().hide();
			error_name = false;
		}
	}

	function check_pwd(){
		var len = $('#pwd').val().length;
		var re = /\s+/g
		if(re.test($("#pwd").val())){
		    $('#pwd').next().html('密码不能有空格')
			$('#pwd').next().show();
			error_password = true;
		}
		else if(len<6||len>16)
		{
			$('#pwd').next().html('密码最少6位，最长16位')
			$('#pwd').next().show();
			error_password = true;
		}
		else
		{
			$('#pwd').next().hide();
			error_password = false;
		}
	}


	function check_cpwd(){
		var pass = $('#pwd').val();
		var cpass = $('#cpwd').val();

		if(pass!=cpass)
		{
			$('#cpwd').next().html('两次输入的密码不一致')
			$('#cpwd').next().show();
			error_check_password = true;
		}
		else
		{
			$('#cpwd').next().hide();
			error_check_password = false;
		}

	}

	function check_email(){
		var re = /^[a-z0-9][\w\.\-]*@[a-z0-9\-]+(\.[a-z]{2,5}){1,2}$/;

		if(re.test($('#email').val()))
		{
			$('#email').next().hide();
			error_email = false;
		}
		else
		{
			$('#email').next().html('你输入的邮箱格式不正确')
			$('#email').next().show();
			error_check_password = true;
		}

	}
	function check_identity(){
	    var identity_len = $("#identity").val().length
	    var re = /[a-zA-Z0-9]{18}/g

	    if(identity_len != 18){
	        $('#identity').next().html('请输入18位身份证号信息')
			$('#identity').next().show();
			error_check_identity = true;
	    }else if(!re.test($("#identity").val())){
	        $('#identity').next().html('身份证号不能有特殊字符')
			$('#identity').next().show();
			error_check_identity = true;
	    }
	    else{
	        $('#identity').next().hide();
			error_check_identity = false;
	    }
	}

	$('form').submit(function(){
		check_user_name();
		check_pwd();
		check_cpwd();
		check_email();
		if(error_name == false && error_password == false && error_check_password == false && error_email == false && error_check == false && error_check_identity == false)
		{
			return true;
		}
		else
		{
			return false;
		}
	});

})