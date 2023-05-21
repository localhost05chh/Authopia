

$(".relative button").on("click", function() {
    var drop = $(this).next();
    if(drop.css("display") == "none") {
        drop.show();
    } else {
        drop.hide();
    }
});

$("button.delete").on("click", function() {
    var list = $(this).parent().parent("li").remove();
});

