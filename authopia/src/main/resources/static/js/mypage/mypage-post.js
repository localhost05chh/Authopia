post();
/* noPost(); */
let page = 1;

// 무한 스크롤
$(window).scroll(function(){
    console.log("hi")
    console.log(Math.ceil(window.innerHeight + window.scrollY));
    console.log(document.body.scrollHeight);
    if (Math.ceil(window.innerHeight + window.scrollY) >= document.body.scrollHeight) {

        page++;
        console.log(page)
        postService.getListMyPost(showList)
    }
});

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

// $buttonTabs.each((i, tab)=>{
//     $(tab).on("click", () => {
//         $buttonTabs.removeClass("content_primary");
//         $buttonTabs.addClass("content_disabled");
//         $(tab).addClass("content_primary");
//         $(tab).removeClass("content_disabled");
//         $lines.hide();
//         $lines.eq(i).show();
//     });
// });

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
// const $pages = $(".page");
//
// $pages.each((i, page)=>{
//     $(page).on("click", () => {
//         $pages.removeClass("surface_tertiary");
//         $(page).addClass("surface_tertiary");
//     });
// });

$("a.change-page").on("click", function(e){
    e.preventDefault();
    let page = $(this).attr("href");
    let type = searchParam('type') == null ? "writing" : searchParam('type');
    location.href = `/member/member-mypost?type=${type}&page=${page}`;
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

    // 장르 강조 효과
    // $(".fAzCXd a").removeClass("content_primary").addClass("content_disabled");
    // if(href.split('/')[3]=='member'){
    //     if (type == null) {
    //         $(".writing").removeClass("content_disabled").addClass("content_primary");
    //     } else {
    //         $("." + type).removeClass("content_disabled").addClass("content_primary");
    //     }
    // }
    // // 라인 제발 바껴라
    // $(".fAzCXd a").on("click", function() {
    //     var index = $(this).index();
    //     $lines.hide();
    //     $lines.eq(index).show();
    // });

    if(searchParam('type')=="writing" || searchParam('type')==null){
        $(".fAzCXd a").eq(1).removeClass("content_primary");
        $(".fAzCXd a").eq(1).addClass("content_disabled");
        $(".fAzCXd a").eq(2).removeClass("content_primary");
        $(".fAzCXd a").eq(2).addClass("content_disabled");
        $(".fAzCXd a").eq(3).removeClass("content_primary");
        $(".fAzCXd a").eq(3).addClass("content_disabled");
        $(".fAzCXd a").eq(0).addClass("content_primary");
        $(".fAzCXd a").eq(0).removeClass("content_disabled");
        $lines.eq(1).hide();
        $lines.eq(2).hide();
        $lines.eq(3).hide();
        $lines.eq(0).show();
    } else if(searchParam('type')=="drawing") {
        $(".fAzCXd a").eq(0).removeClass("content_primary");
        $(".fAzCXd a").eq(0).addClass("content_disabled");
        $(".fAzCXd a").eq(2).removeClass("content_primary");
        $(".fAzCXd a").eq(2).addClass("content_disabled");
        $(".fAzCXd a").eq(3).removeClass("content_primary");
        $(".fAzCXd a").eq(3).addClass("content_disabled");
        $(".fAzCXd a").eq(1).addClass("content_primary");
        $(".fAzCXd a").eq(1).removeClass("content_disabled");
        $lines.eq(0).hide();
        $lines.eq(2).hide();
        $lines.eq(3).hide();
        $lines.eq(1).show();
    } else if(searchParam('type')=="free") {
        $(".fAzCXd a").eq(0).removeClass("content_primary");
        $(".fAzCXd a").eq(0).addClass("content_disabled");
        $(".fAzCXd a").eq(1).removeClass("content_primary");
        $(".fAzCXd a").eq(1).addClass("content_disabled");
        $(".fAzCXd a").eq(3).removeClass("content_primary");
        $(".fAzCXd a").eq(3).addClass("content_disabled");
        $(".fAzCXd a").eq(2).addClass("content_primary");
        $(".fAzCXd a").eq(2).removeClass("content_disabled");
        $lines.eq(0).hide();
        $lines.eq(1).hide();
        $lines.eq(3).hide();
        $lines.eq(2).show();
    } else if(searchParam('type')=="recruit") {
        $(".fAzCXd a").eq(0).removeClass("content_primary");
        $(".fAzCXd a").eq(0).addClass("content_disabled");
        $(".fAzCXd a").eq(1).removeClass("content_primary");
        $(".fAzCXd a").eq(1).addClass("content_disabled");
        $(".fAzCXd a").eq(2).removeClass("content_primary");
        $(".fAzCXd a").eq(2).addClass("content_disabled");
        $(".fAzCXd a").eq(3).addClass("content_primary");
        $(".fAzCXd a").eq(3).removeClass("content_disabled");
        $lines.eq(0).hide();
        $lines.eq(1).hide();
        $lines.eq(2).hide();
        $lines.eq(3).show();
    }

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
    /* 글이 없을 때 */
    if(posts.length == 0){
        text += `
            <div class="no-post col-span-full mt-[88px] flex flex-col items-center justify-center">
                <svg width="101" height="97" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M21.617 63.243c.462-.167 1.355-.362 2.03.311.933.93 1.125 2.136 1.092 3.153-.03.917-.252 1.848-.416 2.534l-.043.184c-.313 1.33-.79 2.55-1.57 3.582a6.838 6.838 0 0 1-.73.819c.88.089 1.763.138 2.636.136.238-.73.731-1.365 1.221-1.865a10.708 10.708 0 0 1 1.916-1.517c.624-.391 1.268-.714 1.76-.861.607-.18 1.732-.417 2.727-.315.489.05 1.127.198 1.62.657.566.529.733 1.265.6 2.022-.128.724-.537 1.266-.95 1.648-.41.38-.884.66-1.275.858-1.21.615-2.512 1.028-3.857 1.283.576.145 1.25.222 1.998.238 1.47.032 3.005-.172 4.201-.35.177-.026.36-.055.547-.084.904-.144 1.904-.303 2.807-.23 1.225.101 2.351.619 3.241 1.901.354.509.23 1.21-.275 1.565a1.112 1.112 0 0 1-1.555-.278c-.477-.686-.97-.896-1.593-.947-.612-.05-1.281.054-2.172.193l-.674.104c-1.202.178-2.901.41-4.575.373-1.631-.035-3.476-.326-4.791-1.402a3.126 3.126 0 0 1-.673-.748c-2.071.026-4.146-.216-6.059-.577-1.963.712-3.965 1.247-5.914 1.77-.087.022-.173.045-.26.069-2.273.609-4.477 1.21-6.598 2.067a1.114 1.114 0 0 1-1.452-.624c-.23-.576.048-1.23.62-1.461 2.265-.915 4.595-1.548 6.856-2.154l.22-.058c1.02-.274 2.026-.543 3.017-.833a2.453 2.453 0 0 1-.433-.603c-.354-.694-.344-1.463-.209-2.137.268-1.331 1.13-2.815 2.091-4.096.98-1.305 2.171-2.54 3.247-3.368.529-.408 1.09-.765 1.627-.959Zm-2.999 10.06.061-.023c1.024-.395 1.733-.947 2.253-1.634.53-.701.906-1.598 1.175-2.74l.037-.154c.17-.725.34-1.441.363-2.12.017-.54-.064-.938-.238-1.232-.221.098-.534.287-.922.586-.888.684-1.94 1.765-2.822 2.939-.9 1.198-1.517 2.355-1.683 3.186-.082.407-.028.599.006.666.014.028.072.14.408.222.446.108.901.21 1.362.305Zm3.878-7.98s-.01.004-.026.005c.018-.005.026-.004.026-.004Zm4.84 8.446c1.387-.204 2.705-.582 3.892-1.185.306-.156.575-.325.77-.505.192-.179.248-.309.262-.389l.001-.006a1.401 1.401 0 0 0-.247-.045c-.578-.059-1.382.09-1.866.234-.217.065-.667.271-1.213.614-.531.333-1.08.75-1.508 1.187a4.88 4.88 0 0 0-.09.095Z" fill="#020202"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M50.13 70.441a2.817 2.817 0 0 1 1.25 3.768 25.557 25.557 0 0 1-1.167 2.083l-.078.128a21.613 21.613 0 0 0-1.1 2 2.784 2.784 0 0 1-3.731 1.296 2.817 2.817 0 0 1-1.288-3.755 27.19 27.19 0 0 1 1.356-2.471c.023-.039.046-.077.07-.114.337-.556.61-1.005.944-1.677a2.784 2.784 0 0 1 3.744-1.258Z" fill="#000"></path><path d="M80.91 12.434a3.337 3.337 0 0 1 4.481-.943l10.498 6.42a3.383 3.383 0 0 1 1.002 4.818L65.06 68.332c-.342.49-.808.879-1.349 1.128l-11.67 5.367a3.332 3.332 0 0 1-3.132-.185l-.66-.403a3.378 3.378 0 0 1-1.577-3.347l1.517-10.936c.074-.53.271-1.034.577-1.471L80.91 12.434Z" fill="#9D8DFF"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M86.885 21.214c-2.262-1.284-4.427-2.611-6.39-4.195a1.112 1.112 0 0 0-1.57.174 1.128 1.128 0 0 0 .173 1.579c2.106 1.699 4.396 3.097 6.69 4.4.78.443 1.555.872 2.324 1.297 1.519.842 3.015 1.67 4.488 2.57a1.113 1.113 0 0 0 1.534-.376c.32-.53.153-1.221-.374-1.544-1.513-.924-3.084-1.794-4.629-2.65-.758-.42-1.51-.837-2.246-1.255ZM65.758 68.348c-.3.542-.98.737-1.518.435-2.071-1.16-4.11-2.4-6.13-3.626l-1.32-.802c-2.462-1.49-4.907-2.938-7.416-4.22a1.127 1.127 0 0 1-.49-1.51c.279-.554.951-.775 1.501-.494 2.585 1.321 5.09 2.805 7.556 4.298l1.336.811c2.018 1.227 4.016 2.441 6.049 3.58.539.301.732.986.433 1.528Z" fill="#000"></path></svg>
                <p class="mt-[24px] font_headline_bold_sm content_primary">포스트가 없습니다.</p>
                <p class="mt-[4px] font_body_regular_lg content_quaternary">지금 첫 포스트를 작성해보세요.</p>
                <div class="mt-[24px]">
                    <button type="button" class="relative flex justify-center items-center font_button_bold_md h-[32px] rounded-[16px] content_primary_inverse surface_accent hover:surface_accent_active active:surface_accent_active disabled:surface_disabled px-[16px]  false disabled:content_disabled">포스트 작성하기</button>
                </div>
            </div>
        `
    } else {
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
                    <button type="button" id="post-modify" class="w-[40px] h-[40px] border border_primary rounded-full flex justify-center items-center">
                        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" class="w-[20px] h-[20px] content_secondary">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="m15.687 8.163.545-.506c1.024-.951 1.024-2.493 0-3.444-1.024-.95-2.684-.95-3.709 0l-8.362 7.765-1.127 3.547c-.183.577.395 1.113 1.016.943l3.82-1.046 6.661-6.186.005.004 1.155-1.073-.004-.004Zm-2.312 0-6.367 5.912-1.981.543.584-1.84 6.367-5.912 1.397 1.297Zm1.156-1.073-1.397-1.298.545-.506a1.042 1.042 0 0 1 1.397 0 .872.872 0 0 1 0 1.298l-.545.506Z"></path>
                        </svg>
                    </button>
                    <button type="button" id="post-remove" class="delete w-[40px] h-[40px] border border_primary rounded-full flex justify-center items-center">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-[20px] h-[20px] content_secondary">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10 15.6a.7.7 0 0 1-.7-.7v-3.6a.7.7 0 0 1 1.4 0v3.6a.7.7 0 0 1-.7.7ZM14 15.6a.7.7 0 0 1-.7-.7v-3.6a.7.7 0 1 1 1.4 0v3.6a.7.7 0 0 1-.7.7Z"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.6 3.8h4.6c.22 0 .4.178.4.4v1.4H9.2V4.2c0-.222.179-.4.4-.4Zm-2 .4a2 2 0 0 1 2-2h4.6a2 2 0 0 1 2 2v1.4h3.5a.8.8 0 0 1 0 1.6H19v10.4a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V7.2h-.7a.8.8 0 1 1 0-1.6h3.3V4.2Zm-1 3h10.8v10.4A2.4 2.4 0 0 1 15 20H9a2.4 2.4 0 0 1-2.4-2.4V7.2Z"></path>
                        </svg>
                    </button>
                </div>
            </li>
        `
        });
    }

    $ul.append(text);
};

$("#post-remove").on("click", function () {
    location.href = `remove?id=${postId}`;
})

$("#post-modify").on("click", function () {
    location.href = `modify?id=${postId}`;
})


/*order 값 주소에 전달하기 */
$(".new").click(function () {
    let type = searchParam('type');
    if (type == null) {
        location.href = `/member/member-mypost?&type=writing&order=new`;
    } else {
        location.href = `/member/member-mypost?&type=${type}&order=new`;
    }
});

$(".trand").click(function () {
    let type = searchParam('type');
    if (type == null) {
        location.href = `/member/member-mypost?&type=writing&order=trand`;
    } else {
        location.href = `/member/member-mypost?&type=${type}&order=trand`;
    }
});


