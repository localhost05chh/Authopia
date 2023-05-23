const $change = $(".change-button");
const $ablebutton = $("#ablebutton");
const $button = $(".button");

$change.on('keyup',function(){
    let $input = $("#input").val();
    let $textarea = $("#textarea").val();

    if($input.length > 0 && $textarea.length > 0){
        $ablebutton.attr('disabled', false);
    }
    if($input.length == 0 || $textarea.length == 0){
        $ablebutton.attr('disabled', true);
    }
})

$button.on('mouseover', function(event){
    $(event.target).css({
        'background-color' : '#f3f3f4'
    })
})

$button.on('mouseout', function(event){
    $(event.target).css({
        'background-color': '#ffffff'
    })
})

let type = "writing";

//임시 체크박스 입니다!!
$(".type").on('click', function () {
    type = this.classList[0];
    $(".type").children('div').children().children().css('display', 'none');
    $(this).children('div').children().children().css('display', 'block');
})

//게시 버튼 클릭 이벤트
$ablebutton.on("click", function(){
    $('.postType').attr('value', type);
    $("#writeForm").submit();
});

