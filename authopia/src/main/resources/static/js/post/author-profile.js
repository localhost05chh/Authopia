let page = 1;

//작성시간 함수
function elapsedTime(date) {
    const start = new Date(date);
    const end = new Date();

    const diff = (end - start) / 1000;

    const times = [
        {name: '년', milliSeconds: 60 * 60 * 24 * 365},
        {name: '개월', milliSeconds: 60 * 60 * 24 * 30},
        {name: '일', milliSeconds: 60 * 60 * 24},
        {name: '시간', milliSeconds: 60 * 60},
        {name: '분', milliSeconds: 60},
    ];

    for (const value of times) {
        const betweenTime = Math.floor(diff / value.milliSeconds);

        if (betweenTime > 0) {
            return `${betweenTime}${value.name} 전`;
        }
    }
    return '방금 전';
}


//ajax로 가져오기
let postService =  (function () {
    function getList(callback) {
        $.ajax({
            url: `/post/list/${page}`,
            type: 'post',
            success: function (posts) {
                if(callback){
                    callback(posts);
                }
            }
        })
    }

    return {getList: getList};
})();

/*처음한번 뿌리기*/
postService.getList(showList);

/*무한슬라이드*/
$(window).scroll(function(){
    if (Math.ceil(window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        page++;
        postService.getList(showList)
    }
});


//게시판 li태그 뿌리기
function showList(posts) {
    const $ul = $("#content-wrap");
    let text = "";
    posts.forEach(post => {
        text += `
                <a href="/post/detail?id=${post.id}">
                    <ul class="flex flex-col col-span-full mt-[8px]">
                        <li class="py-[20px] first:pt-[8px] first:border-0 border_secondary">
                            <div>
                                <button type="button" class="block text-left w-full">
                                    <div class="flex gap-x-[16px]">
                                        <div class="w-full h-[73px] xl:h-auto break-all">
                                            <h2
                                                    class="overflow-hidden font_title_bold_md xl:font_title_bold_lg content_secondary text-ellipsis-1">
                                                ${post.postName}
                                            </h2>
                                            <p class="mt-[4px] mb-[18px] xl:mt-[6px] overflow-hidden font_label_regular_lg content_quaternary text-ellipsis-1 xl:text-ellipsis-2">
                                                ${post.postContent}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="flex items-center mt-[12px]">
                                        <div class="relative shrink-0 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)] profile-image-style"></div>
                                        <div class="ml-[6px] font_label_regular_md flex items-center gap-x-[2px]">
                                            <span class="content_secondary break-all line-clamp-1 lg:max-w-full max-w-[115px]">${post.memberName}</span>
                                            <span class="shrink-0 content_quaternary">｜ ` + elapsedTime(post.postRegisterDate) + ` ｜ 조회수 ${post.viewCount}</span>
    
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </li>
                    </ul>
                </a>
        `
    });

    $ul.append(text);
}

function searchParam(key) {
    return new URLSearchParams(location.search).get(key);
}



$(".writing").click(function () {
    location.href = `/post/author-profile?type=writing&memberId=${memberId}`;
    // let type = searchParam('type');
    // if (type == null) {
    //     location.href = `/post/author-profile?type=writing&memberId=${memberId}`;
    // } else {
    //     location.href = `/post/author-profile?type=${type}&memberId=${memberId}`;
    // }
});

$(".drawing").click(function () {
    location.href = `/post/author-profile?type=drawing&memberId=${memberId}`;
    // let type = searchParam('type');
    // if (type == null) {
    //     location.href = `/post/author-profile?type=writing&memberId=${memberId}`;
    // } else {
    //     location.href = `/post/author-profile?type=${type}&memberId=${memberId}`;
    // }
});

