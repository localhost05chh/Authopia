post();
/* noPost(); */

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

/* 필터 동작 */
const $filterAll = $("#filter-all");
const $filterNew = $("#filter-new");
const $buttonAll = $("#button-all");
const $buttonNew = $("#button-new");

$filterAll.hide();
$filterNew.hide();

$buttonAll.on("click", function(){
    modalShow($filterAll, $buttonAll);

    $("#all").on("mousedown", function(){
        $buttonAll.children("span").text("전체");
        modalHide($filterAll, $buttonAll);
    });
    $("#open").on("mousedown", function(){
        $buttonAll.children("span").text("전체공개");
        modalHide($filterAll, $buttonAll);
    });
    $("#closed").on("mousedown", function(){
        $buttonAll.children("span").text("멤버공개");
        modalHide($filterAll, $buttonAll);
    });
});

$buttonAll.on("focusout", function(){
    modalHide($filterAll, $buttonAll);
});

$buttonNew.on("click", function(){
    modalShow($filterNew, $buttonNew);

    $("#new").on("mousedown", function(){
        $buttonNew.children("span").text("최신순");
        modalHide($filterNew, $buttonNew);
    });
    $("#view").on("mousedown", function(){
        $buttonNew.children("span").text("조회순");
        modalHide($filterNew, $buttonNew);
    });
    $("#like").on("mousedown", function(){
        $buttonNew.children("span").text("좋아요순");
        modalHide($filterNew, $buttonNew);
    });
});

$buttonNew.on("focusout", function(){
    modalHide($filterNew, $buttonNew);
});

function modalShow(modal, button){
    modal.show();
    button.removeClass("border_black_opacity");
    button.addClass("border_accent");
}

function modalHide(modal, button){
    modal.hide();
    button.addClass("border_black_opacity");
    button.removeClass("border_accent");
}

/* 페이징 */
const $pages = $(".page");

$pages.each((i, page)=>{
    $(page).on("click", () => {
        $pages.removeClass("surface_tertiary");
        $(page).addClass("surface_tertiary");
    });
});

/* 글이 없을 때 */
function noPost(){
    $(".post").hide();
    $(".no-post").show();
};

function post(){
    $(".post").show();
    $(".no-post").hide();
};

