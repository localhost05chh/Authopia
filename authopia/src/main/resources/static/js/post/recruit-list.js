$(function(){
    $(".filter").click(function(){
        $(".modal").show();
    });

    $(document).click(function(e){
        if($(".modal").is(e.target)) {
            $(".modal").hide();
        }
    })

});

$(".new").click(function(){
    $(".new label span").removeClass("font_label_regular_xl content_quaternary").addClass("font_label_bold_xl content_primary");
    $(".trand label span").removeClass("font_label_bold_xl content_primary").addClass("font_label_regular_xl content_quaternary");
});

$(".trand").click(function(){
    $(".new label span").removeClass("font_label_bold_xl content_primary").addClass("font_label_regular_xl content_quaternary");
    $(".trand label span").removeClass("font_label_regular_xl content_quaternary").addClass("font_label_bold_xl content_primary");
});