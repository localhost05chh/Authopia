$(function () {
    $(".filter").click(function () {
        $(".modal").show();
    });

    $(document).click(function (e) {
        if ($(".modal").is(e.target)) {
            $(".modal").hide();
        }
    })

});

function searchParam(key) {
    return new URLSearchParams(location.search).get(key);
};

$(document).ready(function () {
    let order = searchParam('order');
    if (order == "trand") {
        $(".new label a").removeClass("font_label_bold_xl content_primary").addClass("font_label_regular_xl content_quaternary");
        $(".trand label a").removeClass("font_label_regular_xl content_quaternary").addClass("font_label_bold_xl content_primary");
    } else {
        $(".new label a").removeClass("font_label_regular_xl content_quaternary").addClass("font_label_bold_xl content_primary");
        $(".trand label a").removeClass("font_label_bold_xl content_primary").addClass("font_label_regular_xl content_quaternary");
    }
})

$(".new").click(function () {
    let type = searchParam('type');
    if(type==null){
        location.href = `/post/list?&type=writing&order=new`;
    }else{
        location.href = `/post/list?&type=${type}&order=new`;
    }
});

$(".trand").click(function () {
    let type = searchParam('type');
    if(type==null){
        location.href = `/post/list?&type=writing&order=trand`;
    }else{
        location.href = `/post/list?&type=${type}&order=trand`;
    }
});