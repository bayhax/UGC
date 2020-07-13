$("#ugc_index").addClass("active_button")
$("#ugc_mod,#ugc_server").removeClass("active_button")

// 获取mod数据
function getMod(offset, size){
    $.post("/mod", function(data){
        var mod_dic = JSON.parse(data)
        var sum = mod_dic.mod_title.length

        if(sum - offset < size){
            size = sum - offset;
        }

        var table = document.getElementById('ugc_index_mod_table') // 获取表格元素
        //table.innerHTML = ''
        for(var i=offset; i< offset + size; i++){
            var link = document.createElement('a')
            var row = document.createElement('div')
            row.className = 'mod_row'
            row.style = 'background:no-repeat url(./media/' + mod_dic.main_pic[i] + ');'
            mod_row_title = document.createElement('div')
            mod_row_title.className = "mod_row_title"
            //mod_row_title.innerHTML = mod_title
            row.appendChild(mod_row_title)
            title_text = document.createElement('span')
            title_text.style = "margin-left: -33rem;"
            title_text.innerText = mod_dic.mod_title[i]
            mod_row_title.appendChild(title_text)
            //row.innerHTML = mod_title;
            link.appendChild(row)
            link.href = '/'
            table.appendChild(link);
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
    var page_size = 2;

    // 首次从服务器端取得数据
    getMod(page_start, page_size)

    // 监听加载更多的按钮
    $(document).on('click', '#load_more', function(){
        counter++;
        page_start = counter * page_size;

        getMod(page_start, page_size);
    })
}
// 加载数据
load_mod()

function backTop(minHeight){
    var backTopHtml = "<div id='backTopBtn'></div>"
    $(".ugc_box").append(backTopHtml)
    $("#backTopBtn").fadeOut(100)
    $("#backTopBtn").click(function(){
        $("html, body").animate({scrollTop:0}, 500)
    }).hover(
        function(){
            $(this).addClass("hover")
        },
        function(){
            $(this).removeClass("hover")
        }
    )
    minHeight ? minHeight = minHeight : minHeight = 600

    $(window).scroll(function(){
        var s = $(window).scrollTop()
        if(s > minHeight){
            $("#backTopBtn").fadeIn(100)
        }else{
            $("#backTopBtn").fadeOut(100)
        }
    })
}
backTop()