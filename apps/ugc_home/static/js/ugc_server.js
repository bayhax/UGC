$("#ugc_server").addClass("active_button")
$("#ugc_mod,#ugc_index").removeClass("active_button")
// 服务器状态
$(document).on("change", "input[name='server_status']", function(){
    var id_num = $(this).attr("id").split('_')[2]
    if($("#server_status_" + id_num).is(":checked")){
        this.previousElementSibling.innerText = "开启"
    }else{
        this.previousElementSibling.innerText = "关闭"
    }
})

// 服务器是否对外开放
$(document).on("change", "input[name='is_server_private']", function(){
    // 验证是否开启密码验证
    var id_num = $(this).attr("id").split('_')[3]
    var authenticate = $("#authenticate_password_" + id_num).val()
    if(authenticate == 0){
        if($("#is_server_private_" + id_num).is(":checked")){
            //兄弟节点span元素改变值
            this.previousElementSibling.innerText = "私密"
        }else{
            this.previousElementSibling.innerText = "开放"
        }
    }else{
        // 开启密码验证，要密码输入对才可以进行私密/开放等的切换
        if($("#is_server_private_" + id_num).is(":checked")){
            $("#is_server_private_"+id_num).prop("checked", false)
        }else{
            $("#is_server_private_"+id_num).prop("checked", true)
        }
        // 打开窗口，输入密码
        // 支付页面弹出居中
        var iHeight = 400;
        var iWidth = 600;
        var iTop = (window.screen.availHeight - iHeight) / 2;
        var iLeft = (window.screen.availWidth - iWidth) / 2;

        var windowStyle = 'height=' + iHeight + ',width=' + iWidth + ',top=' + iTop + ',left=' + iLeft +
                            ',status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=0,titlebar=no';
        window.open('/ugc_server/authenticate_password?' + window.btoa("id="+id_num), '服务器密码认证', windowStyle)
    }
})

// 获得该用户所有的租赁服
function getServer(offset, size){
    $.post('/ugc_server/ugc_server', function(server_data){
        var server_data = JSON.parse(server_data);
        var sum = server_data.server_id.length
        if(sum - offset < size){
            size = sum - offset;
        }
        // 根据server_data动态创建租赁服div个数
        // 清除原有内容
        var server_manage = document.getElementById("server_manage")
        //server_manage.innerHTML = '';
        for(var i=offset; i< offset + size; i++){
            if(server_data.server_is_deadline[i] == 0){
                // 开关1
                var on_text = document.createElement("span")
                on_text.className = "switch_on"
                on_text.innerText = 'ON'

                var off_text = document.createElement("span")
                off_text.className = "switch_off"
                off_text.innerText = 'OFF'

                var switch_inner = document.createElement('div');
                switch_inner.className = "switch_inner";

                var switch_box = document.createElement('div');
                switch_box.className = "switch_box";
                switch_box.append(switch_inner, on_text, off_text);

                var server_status = document.createElement('input')
                server_status.type = "checkbox"
                server_status.name = "server_status"
                server_status.id = "server_status_" + server_data.server_id[i]
                server_status.hidden = "hidden"

                var server_status_text = document.createElement('span')
                server_status_text.class = "server_status_text"
                server_status_text.id = "server_status_text_" + server_data.server_id[i]
                server_status_text.innerText = "关闭"
                // 服务器是否开启
                if(server_data.server_status[i] == 1){
                    server_status.checked = "checked"
                    server_status_text.innerText = "开启"
                }else{
                    server_status_text.innerText = "关闭"
                }

                var label = document.createElement('label')
                label.setAttribute('for', 'server_status_' + server_data.server_id[i])

                label.append(server_status_text, server_status, switch_box)

                // 开关2
                var on_text2 = document.createElement("span")
                on_text2.className = "switch_on"
                on_text2.innerText = 'ON'

                var off_text2 = document.createElement("span")
                off_text2.className = "switch_off"
                off_text2.innerText = 'OFF'
                var switch_inner2 = document.createElement('div')
                switch_inner2.className = "switch_inner"

                var switch_box2 = document.createElement('div')
                switch_box2.className = "switch_box"
                switch_box2.append(switch_inner2, on_text2, off_text2)

                var server_private = document.createElement('input')
                server_private.type = "checkbox"
                server_private.name = "is_server_private"
                server_private.id = "is_server_private_" + server_data.server_id[i]
                server_private.hidden = 'hidden'

                var is_server_private_text = document.createElement('span')
                is_server_private_text.className = "is_server_private_text"
                is_server_private_text.id = "is_server_private_text_" + server_data.server_id[i]
                // 服务器是否私密
                if(server_data.server_is_private[i] == 1){
                    server_private.checked = "checked"
                    is_server_private_text.innerText = "私密"
                }else{
                    is_server_private_text.innerText = "开放"
                }

                var label2 = document.createElement('label')
                label2.setAttribute('for', 'is_server_private_' + server_data.server_id[i])
                label2.append(is_server_private_text, server_private, switch_box2)

                // 开关div
                var switch_show = document.createElement('div')
                switch_show.className= "switch_show"
                switch_show.appendChild(label)
                switch_show.appendChild(label2)
            }else{
                // 开关div
                var switch_show = document.createElement('div')
                switch_show.className= "switch_show"
                switch_show.innerHTML = "服务器已到期"
                switch_show.style = "margin-right: 10.5rem;color: #272727;"
            }

            // 服务器信息
            var info_text = document.createElement('span')
            info_text.className = "info_text"
            info_text.innerText = "基本信息"

            var server_id = document.createElement('div')
            server_id.className = "server_id"
            server_id.innerText = "ID: " + server_data.user_name

            var basic_info = document.createElement('div')
            basic_info.className = "basic_info"
            basic_info.append(info_text, server_id)

            var hr = document.createElement('hr')
            hr.className = "server_manage_hr"

            var server_name = document.createElement('div')
            server_name.className = "server_name"
            server_name.innerText = "名称: " + server_data.server_name[i]

            var server_max_player = document.createElement('div')
            server_max_player.className = "server_max_player"
            server_max_player.innerText = "人数: 3/" + server_data.server_max_player[i]

            var server_rent_time = document.createElement('div')
            server_rent_time.className = "server_rent_time"
            server_rent_time.innerText = "有效期: " + server_data.server_start_time[i] + " —— " + server_data.server_end_time[i]

            var server_mod = document.createElement('div')
            server_mod.className = "server_mod"
            server_mod.innerText = "MOD: 无"

            var server_info = document.createElement('div')
            server_info.className = "server_info"
            server_info.append(basic_info, hr, server_name, server_max_player, server_rent_time, server_mod)

            // 服务器操作
            var server_operate_text = document.createElement('span')
            server_operate_text.className = "server_operate_text"
            server_operate_text.innerText = "服务器操作"

            var server_operate = document.createElement('div')
            server_operate.className = "server_operate"
            server_operate.appendChild(server_operate_text)

            var hr2 = document.createElement('hr')
            hr2.className = "server_manage_hr"
            // 服务器管理按钮
            var change_password = document.createElement('button')
            change_password.type = "button"
            change_password.className = "change_password"
            change_password.id = "server_" + server_data.server_id[i]
            change_password.innerHTML = '修改密码'
            var renewal = document.createElement('button')
            renewal.type = "button"
            renewal.className = "renewal"
            renewal.id = "renewal_server_" + server_data.server_id[i]
            renewal.innerHTML = '续费'
            var edit_mod = document.createElement('button')
            edit_mod.type = "button"
            edit_mod.className = "edit_mod"
            edit_mod.id = "edit_mod_server_" + server_data.server_id[i]
            edit_mod.innerHTML = "编辑MOD"

            var server_manage_button = document.createElement('div')
            server_manage_button.className = "server_manage_button"

            server_manage_button.append(change_password, renewal, edit_mod)

            // 是否开启密码验证
            var authenticate_password = document.createElement('input')
            authenticate_password.type = "hidden"
            authenticate_password.name = "authenticate_password"
            authenticate_password.value = server_data.is_authenticate_password[i]
            authenticate_password.id = "authenticate_password_" + server_data.server_id[i]
            // 加入服务器管理块
            var box = document.createElement('div')
            box.className = "server_manage_box"
            box.append(server_info, server_operate, hr2, switch_show, server_manage_button, authenticate_password)

            server_manage.appendChild(box)
        }
        // 控制加载更多按钮的显示和隐藏
        if((offset + size) >= sum){
            $("#load_more").hide()
        }else{
            $("#load_more").show()
        }
    })
}
function load_mod(){
    // 初始化
    var counter = 0
    var page_start = 0;
    var page_size = 3;

    // 首次从服务器端取得数据
    getServer(page_start, page_size)

    // 监听加载更多的按钮
    $(document).on('click', '#load_more', function(){
        counter++;
        page_start = counter * page_size;

        getServer(page_start, page_size);
    })
}
// 加载数据
load_mod()
// 修改服务器密码按钮
$(document).on("click", ".change_password", function(){
    // 支付页面弹出居中
    var iHeight = 400;
    var iWidth = 600;
    var iTop = (window.screen.availHeight - iHeight) / 2;
    var iLeft = (window.screen.availWidth - iWidth) / 2;

    var windowStyle = 'height=' + iHeight + ',width=' + iWidth + ',top=' + iTop + ',left=' + iLeft +
                        ',status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=0,titlebar=no';
    window.open('/ugc_server/change_server_password?server_id=' + $(this).attr("id"), '修改服务器密码', windowStyle)
})

// 服务器续费按钮
$(document).on("click", ".renewal", function(){
    // 支付页面弹出居中
    var iHeight = 400;
    var iWidth = 600;
    var iTop = (window.screen.availHeight - iHeight) / 2;
    var iLeft = (window.screen.availWidth - iWidth) / 2;

    var windowStyle = 'height=' + iHeight + ',width=' + iWidth + ',top=' + iTop + ',left=' + iLeft +
                        ',status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=0,titlebar=no';
    window.open('/ugc_server/renewal?server_id=' + $(this).attr("id"), '修改服务器密码', windowStyle)
})