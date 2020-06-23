const makePage = (total, cur, around) => {
    let result = [];
    let baseCount = around * 2 + 1 + 2 + 2 + 2; //总共元素个数
    let surplus = baseCount - 4; //只出现一个省略号 剩余元素个数
    let startPosition = 1 + 2 + around + 1;//前面出现省略号的临界点
    let endPosition = total - 2 - around - 1;//后面出现省略号的临界点

    if(total <= baseCount - 2){ //全部显示 不出现省略号
        result =  Array.from({length: total}, (v, i) => i + 1);
    }else{ //需要出现省略号
        if(cur < startPosition){ //1.只有后面出现省略号
            result = [...Array.from({length: surplus}, (v, i) => i + 1),"...",total]
        }else if(cur > endPosition) { //2.只有前边出现省略号
            result = [1,'...',...Array.from({length: surplus}, (v, i) => total - surplus + i + 1)]
        }else{ //3.两边都有省略号
            result = [1,'...',...Array.from({length: around * 2 + 1}, (v, i) => cur - around + i),'...',total]
        }
    }

    return result
}

function mod_show(data){
    var temp = data.mod_list
    var mod_list = temp;
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
}

$("#obtained").click(function(){
    // 账号id
    var user_id = document.getElementById("user_id").value;
    $.ajax ({
        dataType: 'json',
        type: 'post',
        data: {'user_id':user_id},
        url:'/ugc_mod/user_obtained',
        success: function(data){
            mod_show(data);
        },
        error: function(data){

        },
    })
})

$("#created").click(function(){
    // 账号id
    var user_id = document.getElementById("user_id").value;
    $.ajax ({
        dataType: 'json',
        type: 'post',
        data: {'user_id':user_id},
        url:'/ugc_mod/user_create',
        success: function(data){
            var mod_table = document.getElementById('mod_table')
            var item_a = document.createElement('a')
            item_a.href = '/ugc_mod/create_mod'
            var item_div = document.createElement('div')
            item_div.innerHTML = '创建DIV'
            item_a.appendChild(item_div)
            ugc_mod_mod.insertBefore(item_a, mod_table)
            mod_show(data);
        },
        error: function(data){

        },
    })
})

