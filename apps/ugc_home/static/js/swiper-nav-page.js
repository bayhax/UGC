// ugc页面
var ugcSwiper = new Swiper('.swiper-ugc', {
    direction: 'horizontal',
    lazy: {
        loadPrevNext: true,
    },
    mousewheel: false,
    hashNavigation:true,
});
$('#ugc_index').click(function(){
    ugcSwiper.slideTo(0, 1000, true);
})
$('#ugc_mod').click(function(){
    ugcSwiper.slideTo(1, 1000, true);
})
$('#ugc_server').click(function(){
    ugcSwiper.slideTo(2, 1000, true);
})
$("#server_status").change(function(){
    if($("input[name='server_status']:checked").val() == 'on'){
        document.getElementById("server_status_text").innerText = '开放'
    }else{
        document.getElementById("server_status_text").innerText = '关闭'
    }
})
$("#is_server_private").change(function(){
    if($("input[name='is_server_private']:checked").val() == 'on'){
        document.getElementById("is_server_private_text").innerText = '开放'
    }else{
        document.getElementById("is_server_private_text").innerText = '关闭'
    }
})
recognize_url_hash();
// 导航追踪
window.onhashchange=function(event){
    recognize_url_hash();
};
function recognize_url_hash(){
    if(window.location.hash=="#ugc_index" || window.location.hash == ""){
        $("#ugc_index").addClass("active_button")
        $("#ugc_mod,#ugc_server").removeClass("active_button")
        $.post("/mod", function(data){
            var mod_list = JSON.parse(data)
            var table = document.getElementById('ugc_index_mod_table') // 获取表格元素
            table.innerHTML = ''
            for(var i=0;i<mod_list.length;i++){
                var link = document.createElement('a')
                var row = document.createElement('div')
                row.style = 'height:25rem;width:100%;margin:1rem auto;no-repeat background:url(../../static/img/bg_1.png);color:#F2F2F2;'
                row.innerHTML = mod_list[i].mod_title;
                link.appendChild(row)
                link.href = '/index'
                table.appendChild(link);
            }
        });
    }else if(window.location.hash=="#ugc_mod"){
        $("#ugc_mod").addClass("active_button")
        $("#ugc_index,#ugc_server").removeClass("active_button")
        $.post('/ugc_mod/all_mod', function(data){
            var temp = JSON.parse(data);
            var mod_list = temp.mod_list;
            var index;//数组下标
            var pageIndex=1; // 页码
            var pageSize = 10; // 每页显示10条数据
            var table = document.getElementById('mod_table') // 获取表格元素
            var pagination = document.getElementById('page_select') // 页码按钮们的父盒子
            var previous = document.getElementById('prev') // 获取上一页按钮
            var next = document.getElementById('next') // 获取下一页按钮
            // 每次请求数据，前一次的数据要清除，table和页码,并且页码选择要清除
            table.innerHTML = ''
            pagination.innerHTML = ''
            previous.style.display = 'inline-block'
            next.style.display = 'inline-block'
            pagination.style.display = 'inline-block'
            // 一、动态生成页码
            var pageCount = Math.ceil(mod_list.length/pageSize)  // 向上取整得出总页数
            for(let i = 0; i<pageCount;i++){
                var item = document.createElement('span')
                item.innerHTML = i + 1
                pagination.appendChild(item) // 将遍历生成的每个页码按钮放入父盒子pagination内
            }
            // 二、点击页码,显示不同的数据内容
            var buttonList = pagination.children // 页码数列
            //首先,打开页面默认显示前10条数据
            for(let i = 0;i<pageSize;i++){
                var row = document.createElement('tr')
                row.innerHTML = mod_list[i];
                table.appendChild(row)
                // 假如第一页没有填满，退出。剩下的不填充数据。
                if(i == mod_list.length - 1){
                    break
                }
                // console.log(table)
            }
            //相对应的页码为1的按钮显示背景色
            buttonList[0].style.background = 'lightseagreen'
            // 当默认显示为第一页内容时,上一页按钮不显示
            previous.style.display = 'none'
            // 如果只有一页，上一页下一页都不显示
            if(pageCount == 1){
                next.style.display = 'none'
            }
            //其次,点击每一个按钮,table对应显示不同数据
            for(let i = 0;i<buttonList.length;i++){
                buttonList[i].onclick = function (){
                    //每次点击时,table之前的内容需要清空来展示新内容
                    table.innerHTML = ''
                    //按钮也相应的改变背景色,但是未被电击的按钮恢复原来颜色
                    //所以,每次点击时,先把所有按钮遍历一遍清除其背景色
                    for(let i = 0; i<buttonList.length;i++){
                        buttonList[i].style.background = ''
                    }
                    buttonList[i].style.background = '#a9daef'

                    // 记录此时此刻的页码值
                    pageIndex = i + 1
                    //根据特殊情况,决定上一页和下一页按钮的是否出现
                    if(pageIndex >1){
                      previous.style.display = 'inline-block'
                    } else {
                      previous.style.display = 'none'
                    }
                    if(pageIndex === pageCount){
                      next.style.display = 'none'
                    } else {
                      next.style.display = 'inline-block'
                    }
                    //接下来,每点击一个按钮,实现上方table内容的变化

                    //寻找表格内容展示的规律
                    // 当 pageIndex =1 ,起始位置index = 0,展示内容为0 1 2,那么循环的判断条件为小于3.即结束位置的值小于3
                    // 当 pageIndex =2 ,起始位置index = 3,展示内容为3 4 5,那么循环的判断条件为小于6.即结束位置的值小于6
                    // 当 pageIndex =3 ,起始位置index = 6,展示内容为6 7 8,那么循环的判断条件为小于9.即结束位置的值小于9
                    // 当 pageIndex =4 ,起始位置index = 9,展示内容为9 空 空,那么循环的判断条件为小于12.即结束位置的值小于12
                    // l 值为每一页数据的起始数据的下标,判断条件为结束数据的下标
                    for(let l =(i+1 -1)*pageSize;l < (i+1)*pageSize;l++){

                        // 注意,因为数据个数显示,当点击到最后一个按钮时,会多出两行undefined
                        //判断 如果超出数组长度,那么停止遍历
                        if(l >= mod_list.length){
                            return false
                        }
                        var row = document.createElement('tr')
                        row.innerHTML = mod_list[l];
                        table.appendChild(row)
                    }
                }
            }

            // 三、增加上一页、下一页功能
            // 当默认显示为第一页内容时,上一页按钮不显示
            // previous.style.display = 'none'
            // console.log(previous)
            previous.onclick = function () {

                // 每点击上一页按钮,页码按钮的背景色需要先清除
                for(let i = 0;i < buttonList.length;i++){
                    buttonList[i].style.background = ''
                }
                //寻找每点击上一页按钮时,与当前页码之间的关系
                //当table显示为第4页内容时,即为buttonList[3] ,点击上一页,显示第3页,即buttonList[2]应该添加背景色
                //当table显示为第3页内容时,即为buttonList[2] ,点击上一页,显示第2页,即buttonList[1]应该添加背景色
                //当table显示为第2页内容时,即为buttonList[1] ,点击上一页,显示第1页,即buttonList[0]应该添加背景色
                // console.log(pageIndex)
                buttonList[pageIndex - 2].style.background = 'lightseagreen'
                table.innerHTML = ''
                pageIndex--
                if(pageIndex < buttonList.length){
                  next.style.display = 'inline-block'
                }
                if(pageIndex === 1){
                    previous.style.display = 'inline-block'
                }
                // table表格中展示内容规律和之前相同
                for(let i =(pageIndex -1)*pageSize;i < pageIndex* pageSize;i++){
                    //当table显示为第1页内容时,即为buttonList[0] ,上一页按钮应当消失
                    if(pageIndex === 1){
                        previous.style.display ='none'
                    }
                    var row = document.createElement('tr')
                    row.innerHTML = mod_list[i]
                    table.appendChild(row)
                }
            }
            // 点击下一页
            next.onclick = function () {
                // 每点击一次,集体清除一遍背景色
                for(let i = 0;i<buttonList.length;i++){
                    buttonList[i].style.background = ''
                }
                //寻找每点击下一页按钮时,与当前页码之间的关系
                //当table显示为第1页内容时,即为buttonList[0] ,点击下一页,显示第2页,即buttonList[1]应该添加背景色
                //当table显示为第2页内容时,即为buttonList[1] ,点击下一页,显示第3页,即buttonList[2]应该添加背景色
                //当table显示为第3页内容时,即为buttonList[2] ,点击下一页,显示第4页,即buttonList[3]应该添加背景色
                console.log(pageIndex)
                //当前页的页码显示背景色
                buttonList[pageIndex].style.background = '#a9daef'
                // 表格也得清除一次内容
                table.innerHTML = ''
                // 页码值增加1
                pageIndex++
                //点击下一页时,如果页码大于1,那么显示上一页按钮
                if(pageIndex >1){
                  previous.style.display = 'inline-block'
                }

                for(let i = (pageIndex-1)*pageSize ; i< pageIndex * pageSize;i++){
                    //当table显示为第4页内容时,即为buttonList[3] ,下一页按钮应当消失
                    if(pageIndex === buttonList.length){
                        next.style.display = 'none'
                    }
                    // 最后一页,超出mod_list的部分,去除
                    if(i >= mod_list.length){
                        return false
                    }
                    var row = document.createElement('tr')
                    row.innerHTML = mod_list[i];
                    table.appendChild(row)
                }
            }
        })
    }else{
        $("#ugc_server").addClass("active_button")
        $("#ugc_mod,#ugc_index").removeClass("active_button")
        // 获得该用户所有的租赁服
        $.post('/ugc_server/ugc_server', function(server_data){
            var server_data = JSON.parse(server_data);
            // 根据server_data动态创建租赁服div个数
            // 清除原有内容
            var server_manage = document.getElementById("server_manage")
            server_manage.innerHTML = '';
            // 开关1
            var switch_inner = document.createElement('div')
            switch_inner.class = "switch_inner"
            var switch_box = document.createElement('div')
            switch_box.class = "switch_box"
            switch_box.appendChild(switch_inner)

            var server_status = document.createElement('input')
            server_status.type = "checkbox"
            server_status.name = "server_status"
            server_status.id = "server_status"
            server_status.style = "hidden"

            var server_status_text = document.createElement('span')
            server_status_text.class = "server_status_text"
            server_status_text.id = "server_status_text"
            server_status_text.innerText = "关闭"

            var label = document.createElement('label')
            label.for = "server_status"

            label.append(server_status_text, server_status, switch_box)

            // 开关2
            var switch_inner2 = document.createElement('div')
            switch_inner2.class = "switch_inner"
            var switch_box2 = document.createElement('div')
            switch_box2.class = "switch_box"
            switch_box2.appendChild(switch_inner2)

            var server_private = document.createElement('input')
            server_private.type = "checkbox"
            server_private.name = "is_server_private"
            server_private.id = "is_server_private"
            server_private.style = 'hidden'

            var is_server_private_text = document.createElement('span')
            is_server_private_text.class = "is_server_private_text"
            is_server_private_text.id = "is_server_private_text"
            is_server_private_text.innerText = "关闭"

            var label2 = document.createElement('label')
            label2.for = "is_server_private"
            label2.append(is_server_private_text, server_private, switch_box2)

            // 开关div
            var switch_show = document.createElement('div')
            switch_show.class = "switch_show"
            switch_show.appendChild(label)
            switch_show.appendChild(label2)

            // 服务器信息
            var server_id = document.createElement('span')
            server_id.class = "server_id"
            server_id.innerText = "ID:0000"
            var server_name = document.createElement('span')
            server_name.class = "server_name"
            server_name.innerText = "名称：叫啥好呢"
            var server_max_player = document.createElement('span')
            server_max_player.class = "server_max_player"
            server_max_player.innerText = "人数：3/10"
            var server_rent_time = document.createElement('span')
            server_rent_time.class = "server_rent_time"
            server_rent_time.innerText = "有效期： 2020-9-02 12：39 至 2020-10-31 12：39"
            var server_mod = document.createElement('span')
            server_mod.class = "server_mod"
            server_mod.innerText = ""

            var server_info = document.createElement('div')
            server_info.class = "server_info"
            server_info.append(server_id, server_name, server_max_player, server_rent_time, server_mod)

            // 服务器管理按钮
            var renewal = document.createElement('button')
            renewal.type = "button"
            renewal.innerHTML = '续费'
            var edit_mod = document.createElement('button')
            edit_mod.type = "button"
            edit_mod.innerHTML = "编辑MOD"

            var server_manage_button = document.createElement('div')
            server_manage_button.class = "server_manage_button"

            server_manage_button.appendChild(renewal)
            server_manage_button.appendChild(edit_mod)

            // 加入服务器管理块
            var box = document.createElement('div')
            box.class = "server_manage_box"
            box.append(switch_show, server_info, server_manage_button)

            server_manage.appendChild(box)
        })
    }
};