const $inputtext = $(".inputtext");
const $input = $(".input");
const $cancle = $(".cancle")
const $changecolor = $(".changcolor");
const $textinput = $("#text-count");
const $target = $("#target-button");

$inputtext.show();
$input.hide();

$inputtext.on('click', function () {
    $inputtext.hide();
    $input.show();
})

$cancle.on('click', function () {
    $input.hide();
    $inputtext.show();
    $textinput.val("");
})

$changecolor.on('focus', function () {
    $changecolor.css({
        'border': '2px solid blue'
    });
})

$changecolor.on('blur', function () {
    $changecolor.css({
        'border': '2px solid #e6e6e7',
    });
})

$textinput.keyup(function (e) {
    var content = $(this).val();
    if (content.length > 0) {
        $target.attr('disabled', false);
    }
    if (content.length == 0) {
        $target.attr('disabled', true);
    }
})

$cancle.on('mouseover', function (event) {
    $(event.target).css({
        'background-color': '#f3f3f4'
    })
})

$cancle.on('mouseout', function (event) {
    $(event.target).css({
        'background-color': '#ffffff'
    })
})

/*댓글 뿌리기*/
const $commentBox = $("#comment-box");

let commentService = (function () {

    function getList(callback) {
        $.ajax({
            url: `/commentes/list/${postId}`,
            success: function (commentes) {
                if (callback) {
                    callback(commentes);
                }
            }
        });
    }


    return {getList: getList};
})();

commentService.getList(showList);

function showList(commentes) {
    let text = ``;
    commentes.forEach(comment => {
        text += `<li>
                    <div class="pt-[15px] pb-[8px] flex flex-col gap-[8px]">
                        <!--글쓴이-->
                        <p class="font_title_bold_lg content_secondary">${comment.memberName}</p>
                        <!--내용-->
                        <p class="font_label_regular_xl content_quaternary">${comment.commentContent}</p>
                    </div>
                  </li>`;
    });
    console.log(text);
    $commentBox.append(text);
}

/*게시글 뿌리기*/




