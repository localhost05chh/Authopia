/* 필터 동작 */
const $filterCategory = $("#filter-category");
const $buttonCategory = $("#button-category");
const $categories = $("#filter-category button")

$filterCategory.hide();

$buttonCategory.on("click", function(){
    $filterCategory.show();

    $categories.each((i, category)=>{
        $(category).on("mousedown", () => {
            $buttonCategory.val($(category).text());
            $filterCategory.hide();
        });
    });
});

$buttonCategory.on("focusout", function(){
    $filterCategory.hide();
});

/* URL 정규식 */

$("#check-url").hide();
$("#warn-url").hide();

$("#input-url").on("change keyup paste", function(){
    $("#check-complete").hide();
    $("#check-url").show();
    if(checkURL($("#input-url").val())){
        check($("#label-url"),$("#warn-url"));
        $("#check-url").attr("disabled", false);
    } else {
        warn($("#label-url"),$("#warn-url"));
        $("#check-url").attr("disabled", true);
    }
});

// 카테고리 선택
$("button.my-category").on("mousedown", function(){
    category = $(this).attr("value");
    console.log(category);
});

/* 중복확인을 클릭하면 DB에서 검사 후에 $("#check-complete").show();로 바꾸시면 됩니다. */

function warn(label, message){
    label.removeClass("border_black_opacity");
    label.removeClass("border-[1px]");
    label.addClass("border_negative_active");
    label.addClass("border-[2px]");
    message.show();
}

function check(label, message){
    label.removeClass("border_negative_active");
    label.removeClass("border-[2px]");
    label.addClass("border_black_opacity");
    label.addClass("border-[1px]");
    message.hide();
}

function checkURL(url){
    let reg = /^[a-zA-Z0-9]{3,28}$/

    if(!reg.test(url)){
        return false;
    }
    return true;
}

/* 검색 태그 */
$("#input-search").on("change keyup paste", function(){
    if($("#input-search").val().length < 2){
        $("#warn-search").show();
        $("#button-search").attr("disabled", true);
    } else {
        $("#warn-search").hide();
        $("#button-search").attr("disabled", false);
    }
});

/* 이용자 이름 */

$("#warn-name").hide();

$("#input-name").on("change keyup paste", function(){
    if($("#input-name").val().length < 1){
        $("#warn-name span").text("필수항목입니다.");
        warn($("#label-name"),$("#warn-name"));
    } else if($("#input-name").val().length < 2 || $("#input-name").val().length > 20){
        $("#warn-name span").text("2자 이상, 20자 이하로 입력해주세요.");
        warn($("#label-name"),$("#warn-name"));
    } else {
        check($("#label-name"),$("#warn-name"));
    }
});

// 프로필 사진 불러오기
console.log(memberProfileImage);
if(memberProfileImage != null){
    $("img.profile-image").attr("src", `/files/display?fileName=${memberProfileImage.filePath}/t_${memberProfileImage.fileUuid}_${memberProfileImage.fileName}`);
} else {
    $("img.profile-image").attr("src", "/image/profile_icon.png");
}