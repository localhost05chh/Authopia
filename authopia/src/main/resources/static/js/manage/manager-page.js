var allposts = 2;

$(document).ready(function(){
    const $li = $("ul.allPost");

    let text = "";
    posts.forEach(post => {
        text += `
            <li class="post-li px-8 py-16 flex items-center border-b border-secondary hover:surface-secondary">
                            <label class="selected-label block"><input type="checkbox" name="selected" value="0" class="select-box"></label>
                            <button class="text-left w-280 block">
                                <div class="content-secondary flex flex-col gap-y-2">
                                    <div class="flex flex-row gap-2">
                                        <p class="font-label-medium-xl text-ellipsis overflow-hidden whitespace-nowrap">${post.postName}</p>
                                    </div>
                                    <p class="mt-2 font-body-regular-md content-quaternary text-ellipsis overflow-hidden whitespace-nowrap">${post.postContent}</p>
                                </div>
                            </button>
                            <div class="relative h-36 w-36 ml-40"></div>
                            <div class="min-h-40 flex items-start ml-40">
                                <div class="px-7 py-4 rounded-4 flex item-center justify-center surface-tertiary">
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 mr-4 content-secondary">
                                        <mask id="UnlockedSolid_svg__a">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.708 6.777c-.437.194-.94-.04-1.163-.463C14.04 5.35 13.18 4.5 12 4.5a2.9 2.9 0 0 0-2.9 2.9v1.9h7.3a3.6 3.6 0 0 1 3.6 3.6v4.8a3.6 3.6 0 0 1-3.6 3.6H7.6A3.6 3.6 0 0 1 4 17.7v-4.8a3.6 3.6 0 0 1 3.3-3.588V7.4a4.7 4.7 0 0 1 9.046-1.792c.181.44-.068.917-.502 1.11l-.136.06ZM12.8 14.4a.8.8 0 0 0-1.6 0v1.4a.8.8 0 0 0 1.6 0v-1.4Z"></path>
                                        </mask>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.708 6.777c-.437.194-.94-.04-1.163-.463C14.04 5.35 13.18 4.5 12 4.5a2.9 2.9 0 0 0-2.9 2.9v1.9h7.3a3.6 3.6 0 0 1 3.6 3.6v4.8a3.6 3.6 0 0 1-3.6 3.6H7.6A3.6 3.6 0 0 1 4 17.7v-4.8a3.6 3.6 0 0 1 3.3-3.588V7.4a4.7 4.7 0 0 1 9.046-1.792c.181.44-.068.917-.502 1.11l-.136.06ZM12.8 14.4a.8.8 0 0 0-1.6 0v1.4a.8.8 0 0 0 1.6 0v-1.4Z"></path>
                                        <path d="m14.545 6.314 1.417-.744-1.417.744Zm1.163.463.649 1.463-.649-1.463ZM9.1 9.3H7.5v1.6h1.6V9.3Zm-1.8.013.131 1.594 1.469-.121V9.312H7.3Zm9.046-3.704 1.48-.61-1.48.61Zm-.502 1.11-.649-1.463.649 1.462Zm-2.715.34c.527 1.004 1.862 1.787 3.228 1.182L15.06 5.315a.773.773 0 0 1 .604-.014.585.585 0 0 1 .298.269l-2.833 1.487Zm-1.13-.958c.317 0 .747.23 1.13.957l2.833-1.487C15.333 4.372 14.044 2.9 12 2.9v3.2Zm-1.3 1.3A1.3 1.3 0 0 1 12 6.1V2.9a4.5 4.5 0 0 0-4.5 4.5h3.2Zm0 1.9V7.4H7.5v1.9h3.2ZM16.4 7.7H9.1v3.2h7.3V7.7Zm5.2 5.2a5.2 5.2 0 0 0-5.2-5.2v3.2a2 2 0 0 1 2 2h3.2Zm0 4.8v-4.8h-3.2v4.8h3.2Zm-5.2 5.2a5.2 5.2 0 0 0 5.2-5.2h-3.2a2 2 0 0 1-2 2v3.2Zm-8.8 0h8.8v-3.2H7.6v3.2Zm-5.2-5.2a5.2 5.2 0 0 0 5.2 5.2v-3.2a2 2 0 0 1-2-2H2.4Zm0-4.8v4.8h3.2v-4.8H2.4Zm4.768-5.183A5.2 5.2 0 0 0 2.4 12.9h3.2a2 2 0 0 1 1.831-1.993l-.263-3.189ZM5.7 7.4v1.912h3.2V7.4H5.7ZM12 1.1a6.3 6.3 0 0 0-6.3 6.3h3.2A3.1 3.1 0 0 1 12 4.3V1.1Zm5.825 3.897A6.302 6.302 0 0 0 12 1.1v3.2c1.29 0 2.401.79 2.867 1.918l2.958-1.22ZM16.492 8.18c1.055-.467 1.913-1.777 1.333-3.183l-2.958 1.221a.811.811 0 0 1 .013-.648.636.636 0 0 1 .315-.315l1.297 2.925Zm-.136.06.136-.06-1.297-2.925-.135.06 1.296 2.925ZM12 15.2a.8.8 0 0 1-.8-.8h3.2A2.4 2.4 0 0 0 12 12v3.2Zm.8-.8a.8.8 0 0 1-.8.8V12a2.4 2.4 0 0 0-2.4 2.4h3.2Zm0 1.4v-1.4H9.6v1.4h3.2ZM12 15a.8.8 0 0 1 .8.8H9.6a2.4 2.4 0 0 0 2.4 2.4V15Zm-.8.8a.8.8 0 0 1 .8-.8v3.2a2.4 2.4 0 0 0 2.4-2.4h-3.2Zm0-1.4v1.4h3.2v-1.4h-3.2Z" mask="url(#UnlockedSolid_svg__a)"></path>
                                    </svg>
                                    <span class="font-label-medium-sm">전체 공개</span>
                                </div>
                            </div>
                            <div class="ml-40 flex items-center gap-x-40">
                                <div class="w-56 flex flex-col gap-y-4 items-end">
                                    <p class="font-label-medium-lg">${post.postViewCount}</p>
                                    <p class="font-label-regular-md content-quarternary">조회</p>
                                </div>
                                <div class="w-56 flex flex-col gap-y-4 items-end">
                                    <p class="font-label-medium-lg">10</p>
                                    <p class="font-label-regular-md content-quarternary">좋아요</p>
                                </div>
                                <div class="w-88 flex flex-col gap-y-4 items-end">
                                    <p class="font-label-medium-lg">${post.postRegisterDate}</p>
                                    <p class="font-label-regular-md content-quarternary">게시일</p>
                                </div>
                            </div>
                            <div class="ml-auto flex items-center gap-x-12">
                                <button type="button" class="delete w-40 h-40 border border-primary rounded-full flex justify-center items-center">
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-20 h-20 content-secondary">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10 15.6a.7.7 0 0 1-.7-.7v-3.6a.7.7 0 0 1 1.4 0v3.6a.7.7 0 0 1-.7.7ZM14 15.6a.7.7 0 0 1-.7-.7v-3.6a.7.7 0 1 1 1.4 0v3.6a.7.7 0 0 1-.7.7Z"></path>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.6 3.8h4.6c.22 0 .4.178.4.4v1.4H9.2V4.2c0-.222.179-.4.4-.4Zm-2 .4a2 2 0 0 1 2-2h4.6a2 2 0 0 1 2 2v1.4h3.5a.8.8 0 0 1 0 1.6H19v10.4a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V7.2h-.7a.8.8 0 1 1 0-1.6h3.3V4.2Zm-1 3h10.8v10.4A2.4 2.4 0 0 1 15 20H9a2.4 2.4 0 0 1-2.4-2.4V7.2Z"></path>
                                    </svg>
                                </button>
                            </div>
                        </li>
        `
    });

    $li.html(text);
});

$(".delete-selected").on("click", function() {
    var deleting = $(".selected-label input:checked").parent().parent("li");
    deleting.remove();
    allposts -= deleting.length;
    countingFunc();
});

$(".relative button").on("click", function() {
    var drop = $(this).next();
    if(drop.css("display") == "none") {
        drop.show();
    } else {
        drop.hide();
    }
});

var countingFunc = function() {
    $(".post-count").text(allposts);
};

$("button.delete").on("click", function() {
    $(this).parent().parent("li").remove();
    allposts -= 1;
    countingFunc();
});

document.addEventListener("DOMContentLoaded", countingFunc, false);
