const $inputtext = $(".inputtext");
const $input = $(".input");
const $cancel = $(".cancle")
const $changecolor = $(".changcolor");
const $textinput = $("#text-count");
const $target = $("#target-button");
let page = 1;

$inputtext.show();
$input.hide();

$inputtext.on('click', function () {
    $inputtext.hide();
    $input.show();
})

$cancel.on('click', function () {
    $input.hide();
    $inputtext.show();
    $textinput.val("");
    $target.css('color', '#b9b9bb');
    $target.css('background-color', '#f3f3f4');
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
        $target.css('color', 'white');
        $target.css('background-color', 'black');

    }
    if (content.length == 0) {
        $target.attr('disabled', true);
        $target.css('color', '#b9b9bb');
        $target.css('background-color', '#f3f3f4');
    }
})

$cancel.on('mouseover', function (event) {
    $(event.target).css({
        'background-color': '#f3f3f4'
    })
})

$cancel.on('mouseout', function (event) {
    $(event.target).css({
        'background-color': '#ffffff'
    })
})

/*댓글 뿌리기*/
const $commentBox = $("#comment-box");

let commentService = (function () {

    function getList(callback) {
        $.ajax({
            url: `/commentes/list/${postId}/${page}`,
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

/* 무한 스크롤 */
$(window).scroll(function(){
    //if ($(window).scrollTop() == $(document).height() - $(window).height()) {
    if (Math.ceil(window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        page++;
        commentService.getList(showList)
    }
});

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




