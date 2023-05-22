$(document).ready(showPost(popularPosts));

/* 글 화면에 보이기 */
function showPost(postList){
    const $ul = $(".post-track");

    let text = "";
    postList.forEach(post => {
        text += `
            <li class="py-[20px] pb-[0px] w-full border-t first:pt-[8px] first:border-0 border_secondary">
                <div>
                    <button type="button" class="block text-left w-full">
                        <div class="flex gap-x-[16px]">
                            <div class="w-full h-[73px] xl:h-auto break-all">
                                <h2 class="overflow-hidden font_title_bold_md xl:font_title_bold_lg content_secondary text-ellipsis-1">
                                    ${post.postName}, ${post.id}
                                </h2>
                                <p class="mt-[4px] mb-[18px] xl:mt-[6px] overflow-hidden font_label_regular_lg content_quaternary text-ellipsis-1 xl:text-ellipsis-2">
                                    ${post.postContent}
                                </p>
                            </div>
                            <div class="shrink-0 relative w-[72px] md:w-[102px] h-[72px] md:h-[102px] rounded-[8px]">
                                <span style="box-sizing: border-box; display: block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: absolute; inset: 0px;">
                                    <img alt="" src="/image/img.png" class="rounded-[8px]" style="position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%; object-fit: cover; object-position: center center;"/>
                                </span>
                            </div>
                        </div>
                        <div class="flex items-center mt-[12px]">
                            <div class="relative shrink-0 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]" style="width: 18px;height: 18px;">
                                <img class="rounded-full" src="/image/img.png" alt="">
                            </div>
                            <div class="ml-[6px] font_label_regular_md flex items-center gap-x-[2px]">
                                <span class="content_secondary break-all line-clamp-1 lg:max-w-full max-w-[115px]">
                                    ${post.memberName}
                                </span>
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-[8px] h-[8px] content_disabled">
                                    <circle cx="12" cy="12" r="4"></circle>
                                </svg>
                                <span class="shrink-0 content_quaternary">${elapsedTime(post.postRegisterDate)}</span>
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-[8px] h-[8px] content_disabled">
                                    <circle cx="12" cy="12" r="4"></circle>
                                </svg>
                                <span class="shrink-0 content_quaternary">조회수 ${post.postViewCount}</span>
                            </div>
                        </div>
                    </button>
                </div>
            </li>
        `
    });

    $ul.html(text);
}

/* 게시글 더보기 버튼 */
$("button.paging").on("click", function(){
    let pageNow = parseInt($("span.page").text());
    let page = pageNow == 5 ? 1 : pageNow + 1;
    $("span.page").text(page);

    $.ajax({
        url: `/main/${page}`,
        success: function(result){
            showPost(result);
        }
    });
});

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