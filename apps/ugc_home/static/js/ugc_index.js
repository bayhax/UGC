$("#ugc_index").addClass("active_button")
$("#ugc_mod,#ugc_server").removeClass("active_button")
$.post("/mod", function(data){
    var mod_dic = JSON.parse(data)
    var table = document.getElementById('ugc_index_mod_table') // 获取表格元素
    table.innerHTML = ''
    for(var mod_title in mod_dic){
        var link = document.createElement('a')
        var row = document.createElement('div')
        row.className = 'mod_row'
        row.style = 'background:no-repeat url(./media/' + mod_dic[mod_title] + ');'
        mod_row_title = document.createElement('div')
        mod_row_title.className = "mod_row_title"
        //mod_row_title.innerHTML = mod_title
        row.appendChild(mod_row_title)
        title_text = document.createElement('span')
        title_text.style = "margin-left: -33rem;"
        title_text.innerText = mod_title
        mod_row_title.appendChild(title_text)
        //row.innerHTML = mod_title;
        link.appendChild(row)
        link.href = '/'
        table.appendChild(link);
    }

})