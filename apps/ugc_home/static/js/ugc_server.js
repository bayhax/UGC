// 服务器状态
$(document).on("change", "input[name='server_status']", function(){
    if($("input[name='server_status']:checked").val() == 'on'){
        this.previousElementSibling.innerText = "开放"
    }else{
        this.previousElementSibling.innerText = "关闭"
    }
})
// 服务器是否对外开放
$(document).on("change", "input[name='is_server_private']", function(){
    if($("input[name='is_server_private']:checked").val() == 'on'){
        //兄弟节点span元素改变值
        this.previousElementSibling.innerText = "开放"
    }else{
        this.previousElementSibling.innerText = "关闭"
    }
})
$("#ugc_server").addClass("active_button")
$("#ugc_mod,#ugc_index").removeClass("active_button")
// 获得该用户所有的租赁服
$.post('/ugc_server/ugc_server', function(server_data){
    var server_data = JSON.parse(server_data);
    // 根据server_data动态创建租赁服div个数
    // 清除原有内容
    var server_manage = document.getElementById("server_manage")
    server_manage.innerHTML = '';
    for(i=0;i<server_data.server_id.length;i++){
        // 开关1
        var switch_inner = document.createElement('div');
        switch_inner.className = "switch_inner";
        var switch_box = document.createElement('div');
        switch_box.className = "switch_box";
        switch_box.appendChild(switch_inner);

        var server_status = document.createElement('input')
        server_status.type = "checkbox"
        server_status.name = "server_status"
        server_status.id = "server_status_" + i
        server_status.hidden = "hidden"
        //server_status.addEventListener('change', server_is_open())

        var server_status_text = document.createElement('span')
        server_status_text.class = "server_status_text"
        server_status_text.id = "server_status_text_" + i
        server_status_text.innerText = "关闭"

        var label = document.createElement('label')
        label.setAttribute('for', 'server_status_' + i)

        label.append(server_status_text, server_status, switch_box)

        // 开关2
        var switch_inner2 = document.createElement('div')
        switch_inner2.className = "switch_inner"
        var switch_box2 = document.createElement('div')
        switch_box2.className = "switch_box"
        switch_box2.appendChild(switch_inner2)

        var server_private = document.createElement('input')
        server_private.type = "checkbox"
        server_private.name = "is_server_private"
        server_private.id = "is_server_private_" + i
        server_private.hidden = 'hidden'

        var is_server_private_text = document.createElement('span')
        is_server_private_text.className = "is_server_private_text"
        is_server_private_text.id = "is_server_private_text_" + i
        is_server_private_text.innerText = "关闭"

        var label2 = document.createElement('label')
        label2.setAttribute('for', 'is_server_private_' + i)
        label2.append(is_server_private_text, server_private, switch_box2)

        // 开关div
        var switch_show = document.createElement('div')
        switch_show.className= "switch_show"
        switch_show.appendChild(label)
        switch_show.appendChild(label2)

        // 服务器信息
        var server_id = document.createElement('span')
        server_id.className = "server_id"
        server_id.innerText = "ID:" + server_data.server_id[i]
        var server_name = document.createElement('span')
        server_name.className = "server_name"
        server_name.innerText = "名称：" + server_data.server_name[i]
        var server_max_player = document.createElement('span')
        server_max_player.className = "server_max_player"
        server_max_player.innerText = "人数：3/" + server_data.server_max_player[i]
        var server_rent_time = document.createElement('span')
        server_rent_time.className = "server_rent_time"
        server_rent_time.innerText = "有效期：" + server_data.server_start_time[i] + "至" + server_data.server_end_time[i]
        var server_mod = document.createElement('span')
        server_mod.className = "server_mod"
        server_mod.innerText = ""

        var server_info = document.createElement('div')
        server_info.className = "server_info"
        server_info.append(server_id, server_name, server_max_player, server_rent_time, server_mod)

        // 服务器管理按钮
        var renewal = document.createElement('button')
        renewal.type = "button"
        renewal.innerHTML = '续费'
        var edit_mod = document.createElement('button')
        edit_mod.type = "button"
        edit_mod.innerHTML = "编辑MOD"

        var server_manage_button = document.createElement('div')
        server_manage_button.className = "server_manage_button"

        server_manage_button.appendChild(renewal)
        server_manage_button.appendChild(edit_mod)

        // 加入服务器管理块
        var box = document.createElement('div')
        box.className = "server_manage_box"
        box.innerText = "基本信息"
        box.append(server_info, switch_show, server_manage_button)

        server_manage.appendChild(box)
    }
})