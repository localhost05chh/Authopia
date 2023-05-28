post();
/* noPost(); */
let page = 1;

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

// 카테고리 선택
$(document).ready(function () {
    let type = searchParam('type');
    let href = window.location.href

    function searchParam(key) {
        return new URLSearchParams(location.search).get(key);
    };

    $(".fAzCXd a").on("click", function (e) {
        e.preventDefault();
        let type = this.classList[0];
        if (type == "main") {
            location.href = `/main`;
        } else {
            location.href = `/member/member-mypost?type=${type}`;
        }
    });
})

/*keyword 값 주소에 전달하기*/
function addFunc() {
    let keyword = $("#input_search").val();
    let type = searchParam('type');
    let order = searchParam('order');
    if (type == null) {
        location.href = `/member/member-mypost?&type=writing&order=new&keyword=${keyword}`;
    } else {
        if (order == null) {
            location.href = `/member/member-mypost?&type=${type}&order=new&keyword=${keyword}`;
        } else {
            location.href = `/member/member-mypost?&type=${type}&order=${order}&keyword=${keyword}`;
        }
    }
}

/* 글이 없을 때 */
function noPost(){
    $(".post").hide();
    $(".no-post").show();
};

function post(){
    $(".post").show();
    $(".no-post").hide();
};

//ajax로 가져오기
let postService =  (function () {
    function getListMyPost(callback) {
        $.ajax({
            url: `/member/member-mypost/${page}`,
            type: 'post',
            success: function (posts) {
                if(callback){
                    callback(posts);
                }
            }
        })
    }

    return {getListMyPost: getListMyPost};
})();

postService.getListMyPost(showList);

// li태그로 목록 뿌리기

function showList(posts) {
    const $ul = $("#content-wrap");
    let text = "";
    posts.forEach(post => {
        text += `
            <li class="px-[8px] py-[16px] flex items-center border-b border_secondary hover:surface_secondary">
                <button class="text-left w-[280px] block">
                    <div class="content_secondary flex flex-col gap-y-[2px]">
                        <div class="flex flex-row gap-[2px]">
                            <p class="font_label_medium_xl text-ellipsis overflow-hidden whitespace-nowrap">${post.postName}</p>
                        </div>
                        <p class="mt-[2px] font_body_regular_md content_quaternary text-ellipsis overflow-hidden whitespace-nowrap">${post.postContent}</p>
                    </div>
                </button>
                <div class="relative h-[36px] w-[36px] ml-[40px]">
                        <span style="box-sizing: border-box; display: block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: absolute; inset: 0px;">
                            <img src="python_icon.png" class="rounded-[8px]" style="position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%;">
                        </span>
                </div>
                <div class="min-h-[40px] flex items-start ml-[40px]">
                    <div class="px-[7px] py-[4px] rounded-[4px] flex items-center justify-center surface_tertiary">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-[12px] h-[12px] mr-[4px] content_secondary">
                            <mask id="UnlockedSolid_svg__a">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.708 6.777c-.437.194-.94-.04-1.163-.463C14.04 5.35 13.18 4.5 12 4.5a2.9 2.9 0 0 0-2.9 2.9v1.9h7.3a3.6 3.6 0 0 1 3.6 3.6v4.8a3.6 3.6 0 0 1-3.6 3.6H7.6A3.6 3.6 0 0 1 4 17.7v-4.8a3.6 3.6 0 0 1 3.3-3.588V7.4a4.7 4.7 0 0 1 9.046-1.792c.181.44-.068.917-.502 1.11l-.136.06ZM12.8 14.4a.8.8 0 0 0-1.6 0v1.4a.8.8 0 0 0 1.6 0v-1.4Z"></path>
                            </mask>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.708 6.777c-.437.194-.94-.04-1.163-.463C14.04 5.35 13.18 4.5 12 4.5a2.9 2.9 0 0 0-2.9 2.9v1.9h7.3a3.6 3.6 0 0 1 3.6 3.6v4.8a3.6 3.6 0 0 1-3.6 3.6H7.6A3.6 3.6 0 0 1 4 17.7v-4.8a3.6 3.6 0 0 1 3.3-3.588V7.4a4.7 4.7 0 0 1 9.046-1.792c.181.44-.068.917-.502 1.11l-.136.06ZM12.8 14.4a.8.8 0 0 0-1.6 0v1.4a.8.8 0 0 0 1.6 0v-1.4Z"></path>
                            <path d="m14.545 6.314 1.417-.744-1.417.744Zm1.163.463.649 1.463-.649-1.463ZM9.1 9.3H7.5v1.6h1.6V9.3Zm-1.8.013.131 1.594 1.469-.121V9.312H7.3Zm9.046-3.704 1.48-.61-1.48.61Zm-.502 1.11-.649-1.463.649 1.462Zm-2.715.34c.527 1.004 1.862 1.787 3.228 1.182L15.06 5.315a.773.773 0 0 1 .604-.014.585.585 0 0 1 .298.269l-2.833 1.487Zm-1.13-.958c.317 0 .747.23 1.13.957l2.833-1.487C15.333 4.372 14.044 2.9 12 2.9v3.2Zm-1.3 1.3A1.3 1.3 0 0 1 12 6.1V2.9a4.5 4.5 0 0 0-4.5 4.5h3.2Zm0 1.9V7.4H7.5v1.9h3.2ZM16.4 7.7H9.1v3.2h7.3V7.7Zm5.2 5.2a5.2 5.2 0 0 0-5.2-5.2v3.2a2 2 0 0 1 2 2h3.2Zm0 4.8v-4.8h-3.2v4.8h3.2Zm-5.2 5.2a5.2 5.2 0 0 0 5.2-5.2h-3.2a2 2 0 0 1-2 2v3.2Zm-8.8 0h8.8v-3.2H7.6v3.2Zm-5.2-5.2a5.2 5.2 0 0 0 5.2 5.2v-3.2a2 2 0 0 1-2-2H2.4Zm0-4.8v4.8h3.2v-4.8H2.4Zm4.768-5.183A5.2 5.2 0 0 0 2.4 12.9h3.2a2 2 0 0 1 1.831-1.993l-.263-3.189ZM5.7 7.4v1.912h3.2V7.4H5.7ZM12 1.1a6.3 6.3 0 0 0-6.3 6.3h3.2A3.1 3.1 0 0 1 12 4.3V1.1Zm5.825 3.897A6.302 6.302 0 0 0 12 1.1v3.2c1.29 0 2.401.79 2.867 1.918l2.958-1.22ZM16.492 8.18c1.055-.467 1.913-1.777 1.333-3.183l-2.958 1.221a.811.811 0 0 1 .013-.648.636.636 0 0 1 .315-.315l1.297 2.925Zm-.136.06.136-.06-1.297-2.925-.135.06 1.296 2.925ZM12 15.2a.8.8 0 0 1-.8-.8h3.2A2.4 2.4 0 0 0 12 12v3.2Zm.8-.8a.8.8 0 0 1-.8.8V12a2.4 2.4 0 0 0-2.4 2.4h3.2Zm0 1.4v-1.4H9.6v1.4h3.2ZM12 15a.8.8 0 0 1 .8.8H9.6a2.4 2.4 0 0 0 2.4 2.4V15Zm-.8.8a.8.8 0 0 1 .8-.8v3.2a2.4 2.4 0 0 0 2.4-2.4h-3.2Zm0-1.4v1.4h3.2v-1.4h-3.2Z" mask="url(#UnlockedSolid_svg__a)"></path>
                        </svg>
                        <span class="font_label_medium_sm">전체 공개</span>
                    </div>
                </div>
                <div class="ml-[40px] flex items-center gap-x-[40px]">
                    <div class="w-[56px] flex flex-col gap-y-[4px] items-end">
                        <p class="font_label_medium_lg"> ${post.postViewCount}</p>
                        <p class="font_label_regular_md content_quaternary">조회</p>
                    </div>
                    <div class="w-[56px] flex flex-col gap-y-[4px] items-end">
                        <p class="font_label_medium_lg">${post.postRecommend}</p>
                        <p class="font_label_regular_md content_quaternary">좋아요</p>
                    </div>
                    <div class="w-[88px] flex flex-col gap-y-[4px] items-end">
                        <p class="font_label_medium_lg">${post.postRegisterDate}</p>
                        <p class="font_label_regular_md content_quaternary">게시일</p>
                    </div>
                </div>
                <div class="ml-auto flex items-center gap-x-[12px]">
                    <button type="button" class="w-[40px] h-[40px] border border_primary rounded-full flex justify-center items-center">
                        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" class="w-[20px] h-[20px] content_secondary">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="m15.687 8.163.545-.506c1.024-.951 1.024-2.493 0-3.444-1.024-.95-2.684-.95-3.709 0l-8.362 7.765-1.127 3.547c-.183.577.395 1.113 1.016.943l3.82-1.046 6.661-6.186.005.004 1.155-1.073-.004-.004Zm-2.312 0-6.367 5.912-1.981.543.584-1.84 6.367-5.912 1.397 1.297Zm1.156-1.073-1.397-1.298.545-.506a1.042 1.042 0 0 1 1.397 0 .872.872 0 0 1 0 1.298l-.545.506Z"></path>
                        </svg>
                    </button>
                    <button type="button" class="delete w-[40px] h-[40px] border border_primary rounded-full flex justify-center items-center">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-[20px] h-[20px] content_secondary">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10 15.6a.7.7 0 0 1-.7-.7v-3.6a.7.7 0 0 1 1.4 0v3.6a.7.7 0 0 1-.7.7ZM14 15.6a.7.7 0 0 1-.7-.7v-3.6a.7.7 0 1 1 1.4 0v3.6a.7.7 0 0 1-.7.7Z"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.6 3.8h4.6c.22 0 .4.178.4.4v1.4H9.2V4.2c0-.222.179-.4.4-.4Zm-2 .4a2 2 0 0 1 2-2h4.6a2 2 0 0 1 2 2v1.4h3.5a.8.8 0 0 1 0 1.6H19v10.4a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V7.2h-.7a.8.8 0 1 1 0-1.6h3.3V4.2Zm-1 3h10.8v10.4A2.4 2.4 0 0 1 15 20H9a2.4 2.4 0 0 1-2.4-2.4V7.2Z"></path>
                        </svg>
                    </button>
                </div>
            </li>
        `
    });

    $ul.append(text);
};