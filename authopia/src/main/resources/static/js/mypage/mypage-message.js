message();
/* noMessage(); */

/* 삭제 모달 */
$(".delete-modal").hide();
const deletes = $(".delete");
deletes.on("click", function(){
    $(".delete-modal").show();
});

deletes.on("focusout", function(){
    $(".delete-modal").hide();
});

/* tab 동작 */
const $buttonTabs = $(".button-tab");
const $lines = $(".button-line");

$lines.not(":first").hide();

$buttonTabs.each((i, tab)=>{
    $(tab).on("click", () => {
        $buttonTabs.removeClass("content_primary");
        $buttonTabs.addClass("content_disabled");
        $(tab).addClass("content_primary");
        $(tab).removeClass("content_disabled");
        $lines.hide();
        $lines.eq(i).show();
    });
});

/* 페이징 */
const $pages = $(".page");

$pages.each((i, page)=>{
    $(page).on("click", () => {
        $pages.removeClass("surface_tertiary");
        $(page).addClass("surface_tertiary");
    });
});

/* 글이 없을 때 */
function noMessage(){
    $(".post").hide();
    $(".no-post").show();
};

function message(){
    $(".post").show();
    $(".no-post").hide();
};

