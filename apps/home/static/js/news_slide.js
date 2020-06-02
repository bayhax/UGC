//$(".news_img").on('click', (function(){
//    // 获取是第几个标签
//    var index = $(".news_img").index($(this))
//    var url="/news/news_content"
//    $.ajax({
//            dataType: "json",
//            traditional:true,//这使json格式的字符不会被转码
//            data: {'news_alt':$(".news_img").eq(index).attr("alt")},
//            type: "post",
//            url: url,
//            //timeout:200000,
//            success : function (data) {
//
//            },
//            complete: function(XMLHttpRequest, status){
//
//            }
//    });
//}))