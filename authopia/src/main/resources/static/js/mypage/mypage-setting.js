/* 페이지 샘플 */
let sampleCheck = false;
$("#page-sample").hide();


$("#page-sample-button").on("click", function(){
    if(!sampleCheck){
        $("#page-sample").show();
        sampleCheck = true;
    } else {
        $("#page-sample").hide();
        sampleCheck = false;
    }
});

$("#page-sample-OK").on("click", function(){
    $("#page-sample").hide();
    sampleCheck = false;
});

/* 프로필 사진 썸네일 */
$("#profile").on("change", function(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        $("#profile-preview").attr("src", e.target.result);
    }
    reader.readAsDataURL(file);
});


/* 커버 사진 썸네일 */
if($("#cover-preview").attr("src")){
    $("#cover-preview").show();
} else {
    $("#cover-preview").hide();
}

$("#cover").on("change", function(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        $("#cover-preview").attr("src", e.target.result);
        $("#cover-preview").show();
        $("#no-cover").hide();
    }
    reader.readAsDataURL(file);
});

/* 한줄 소개 */
$("#warn-intro").hide();
$("#letter-count").text($("#input-intro").val().length + "/50");

$("#input-intro").on("change keyup paste", function(){
    if($("#input-intro").val().length < 1){
        $("#warn-intro span").text("필수항목입니다.");
        warn($("#label-intro"),$("#warn-intro"));
    } else {
        check($("#label-intro"),$("#warn-intro"));
    }
    $("#letter-count").text($("#input-intro").val().length + "/50");
});

/* 링크 썸네일 */
if($("#link-preview").attr("src")){
    $("#link-preview").show();
} else {
    $("#link-preview").hide();
}

$("#link").on("change", function(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        $("#link-preview").attr("src", e.target.result);
        $("#link-preview").show();
        $("#no-link").hide();
    }
    reader.readAsDataURL(file);
});

/* URL 정규식 */
$("#check-complete").hide();

$("#input-url").on("change keyup paste", function(){
    if(checkURL($("#input-url").val())){
        check($("#label-url"),$("#warn-url"));
        $("#check-url").attr("disabled", false);
    } else {
        warn($("#label-url"),$("#warn-url"));
        $("#check-url").attr("disabled", true);
    }
});

/*  */
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

