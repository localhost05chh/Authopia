/* 멤버 유무 */
member();
/* noMember(); */

/* 필터 동작 */
const $filterStatus = $("#filter-status");
const $buttonStatus = $("#button-status");

$filterStatus.hide();

$buttonStatus.on("click", function(){
    modalShow($filterStatus, $buttonStatus);

    $("#all").on("mousedown", function(){
        $buttonStatus.children("span").text("상태 전체");
        modalHide($filterStatus, $buttonStatus);
    });
    $("#subscribe").on("mousedown", function(){
        $buttonStatus.children("span").text("구독");
        modalHide($filterStatus, $buttonStatus);
    });
    $("#terminate").on("mousedown", function(){
        $buttonStatus.children("span").text("해지");
        modalHide($filterStatus, $buttonStatus);
    });

});

$buttonStatus.on("focusout", function(){
    modalHide($filterStatus, $buttonStatus);
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

/* 오름차순 내림차순 */
const $sorts = $(".sort");
let dateCount = 1;
let priceCount = 0;
let payCount = 0;

$("#join-date").on("click", function(){
    $sorts.css("fill","#B9B9BB");
    if(dateCount % 2 == 1){
        $("#join-date").find(".up").css("fill","#333334");
    } else {
        $("#join-date").find(".down").css("fill","#333334");
    }
    dateCount++;
});

$("#price").on("click", function(){
    $sorts.css("fill","#B9B9BB");
    if(priceCount % 2 == 1){
        $("#price").find(".up").css("fill","#333334");
    } else {
        $("#price").find(".down").css("fill","#333334");
    }
    priceCount++;
});

$("#pay-count").on("click", function(){
    $sorts.css("fill","#B9B9BB");
    if(payCount % 2 == 1){
        $("#pay-count").find(".up").css("fill","#333334");
    } else {
        $("#pay-count").find(".down").css("fill","#333334");
    }
    payCount++;
});


/* 페이징 */
const $pages = $(".page");

$pages.each((i, page)=>{
    $(page).on("click", () => {
        $pages.removeClass("surface_tertiary");
        $(page).addClass("surface_tertiary");
    });
});

/* 멤버가 없을 때 */
function noMember(){
    $(".member").hide();
    $(".no-member").show();
};

function member(){
    $(".member").show();
    $(".no-member").hide();
};

