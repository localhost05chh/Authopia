var allposts = 2;

$(".delete-selected").on("click", function() {
    var deleting = $(".selected-label input:checked").parent().parent("li");
    deleting.remove();
    allposts -= deleting.length;
    countingFunc();
});

$(".relative button").on("click", function() {
    var drop = $(this).next();
    if(drop.css("display") == "none") {
        drop.show();
    } else {
        drop.hide();
    }
});

var countingFunc = function() {
    $(".post-count").text(allposts);
};

$("button.delete").on("click", function() {
    $(this).parent().parent("li").remove();
    allposts -= 1;
    countingFunc();
});

document.addEventListener("DOMContentLoaded", countingFunc, false);
