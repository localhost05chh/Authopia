const $inputtext = $(".inputtext");
const $input = $(".input");
const $cancel = $(".cancle")
const $changecolor = $(".changcolor");
const $textinput = $("#text-count");
const $target = $("#target-button");
let page = 1;

$("#post-remove").on("click", function () {
    location.href = `remove?id=${postId}`;
})

// $("#post-modify").on("click", function () {
//     location.href = `modify?id=${postId}`;
// })

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

//작성시간 함수
function elapsedTime(date) {
    const start = new Date(date);
    const end = new Date();

    const diff = (end - start) / 1000;

    const times = [
        { name: '년', milliSeconds: 60 * 60 * 24 * 365 },
        { name: '개월', milliSeconds: 60 * 60 * 24 * 30 },
        { name: '일', milliSeconds: 60 * 60 * 24 },
        { name: '시간', milliSeconds: 60 * 60 },
        { name: '분', milliSeconds: 60 },
    ];

    for (const value of times) {
        const betweenTime = Math.floor(diff / value.milliSeconds);

        if (betweenTime > 0) {
            return `${betweenTime}${value.name} 전`;
        }
    }
    return '방금 전';
}

$(".post-register-date").next().text(elapsedTime($(".post-register-date").val()));

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

    function remove(commentId, callback){
        $.ajax({
            url: `/commentes/${commentId}`,
            type: `DELETE`,
            success: function(){
                if(callback){
                    callback();
                }
            }
        });
    }

    function write(commentContent, callback){
        $.ajax({
            url: `/commentes/write`,
            type: `post`,
            data: JSON.stringify({memberId: memberId, postId: postId, commentContent: commentContent}),
            contentType: "application/json;charset=utf-8",
            success: function(){
                if(callback){
                    callback();
                }
            }
        })
    }

    function modify(comment, callback){
        $.ajax({
            url: "/commentes/modify",
            type: "put",
            data: JSON.stringify(comment),
            contentType: "application/json;charset=utf-8",
            success: function(){
                if(callback){
                    callback();
                }
            }
        })
    }


    return {getList: getList, remove: remove, write: write, modify: modify};
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

/* 댓글 목록 */
function showList(commentes) {
    let text = ``;
    commentes.forEach(comment => {
        text += `<li>
                    <div class="pt-[15px] pb-[8px] flex flex-col gap-[8px]">
                        <!--글쓴이-->
                        <p class="font_title_bold_lg content_secondary">${comment.memberName}</p>
                        <!--내용-->
                        <p class="commentContent" class="font_label_regular_xl content_quaternary">${comment.commentContent}</p>
                    </div>
                    `
        if(memberId == comment.memberId) {
            text += `
                    <span class="date">·</span>
                    <span class="update">수정</span>
                    <input type="text" value="${comment.commentContent}" style="display: none;">
                    <button class="update-done" style="display: none;">수정완료</button>
                    <span class="date">·</span>
                    <span class="delete" data-comment-id="${comment.id}">삭제</span>
            `
        }
         text +=    `
                  </li>`;
    });
    $commentBox.append(text);
}
/*댓글 수정*/
$commentBox.on("click", "span.update", function(){
    let i = $commentBox.find("span.update").index($(this));
    $(this).prev().css("display", "none");
    $(this).next().next().next().css("display", "none")
    $(".commentContent").eq(i).css("display", "none");
    $(this).css("display", "none");
    $(".delete").eq(i).css("display", "none");
    $(this).next().css("display", "block");
    $(this).next().next().css("display", "block");
});

$commentBox.on("click", ".update-done", function(){
    let i = $commentBox.find("button.cancel").index($(this));
    let commentContent = $(this).prev().val();
    let commentId = $(this).next().next().data("comment-id");
    console.log(commentContent);
    console.log(commentId);
    let comment = new Object();
    comment.commentContent = commentContent;
    comment.id = commentId;
    commentService.modify(comment, function(){
        $commentBox.html("");
        page = 1;
        commentService.getList(showList);
    });
});

/*댓글 삭제*/
$commentBox.on("click", ".delete", function(){
    let commentId = $(this).data("comment-id");
    commentService.remove(commentId, function(){
        $commentBox.html("");
        page = 1;
        commentService.getList(showList);
    });
});

/* 댓글 쓰기 */
$("#target-button").on("click", function(){
    commentService.write($("#text-count").val(), function(){
        $commentBox.html("");
        page = 1;
        commentService.getList(showList);
        $("#text-count").val("");
    });
});

/* 이미지 파일 뿌리기 */
$(document).ready(function () {
    let $imgBox = $("#img-box");
    let text = "";
    files.forEach(file => {
        text += `
                    <div style="height: 102px; width: 102px; margin-right:15px;  float:right;">
                        <img src="/files/display?fileName=${file.filePath}/${file.fileUuid}_${file.fileName}" style="height: 102px; width: 102px;">
                    </div>
                `;
    })
    $imgBox.html(text);
})




