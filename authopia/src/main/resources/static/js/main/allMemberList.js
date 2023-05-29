$(document).ready(showMember(allMembers));

function showMember(memberList){
    const $div = $(".all-track");

    let text = "";
    memberList.forEach(member => {
        text += `
            <div class="swiper-slide swiper-slide-active first:ml-[16px] mobile:first:ml-0" style="width: 128px; margin-right: 12px">
                <div>
                    <button type="button" class="block text-left w-full" onclick="location.href='/post/author-profile?&memberId=${member.id}'">
                        <div class="relative">
                            <span style="box-sizing: border-box; display: block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: relative;">
                                <span style="box-sizing: border-box; display: block; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 100% 0px 0px;"></span>
            `
        if(member.memberProfileImage != null){
            text += `<img alt="사진" src="/files/display?fileName=${member.memberProfileImage.filePath}/${member.memberProfileImage.fileUuid}_${member.memberProfileImage.fileName}" class="rounded-[16px]" sizes="100vw" style="position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%; object-fit: cover; object-position: center center;">`;
        } else {
            text += `<img alt="사진" src="/image/profile_icon.png" class="rounded-[16px]" sizes="100vw" style="position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%; object-fit: cover; object-position: center center;">`;
        }

        text += `
                            </span>
                            <div class="absolute top-0 left-0 w-full h-full border border_black_opacity rounded-[16px]"></div>
                        </div>
                        <h2 class="mt-[12px] font_label_bold_xl content_secondary break-all line-clamp-1">
                            ${member.memberName}
                        </h2>
                `
        if(member.memberCategory == null){
            text += `<p class="mt-[2px] font_label_regular_sm content_tertiary"></p>`
        } else if (member.memberCategory == "소설"){
            text += `<p class="mt-[2px] font_label_regular_sm content_tertiary">소설</p>`
        } else {
            text += `<p class="mt-[2px] font_label_regular_sm content_tertiary">일러스트</p>`
        }
        if(member.memberBriefIntroduce != null){
            text += `<p class="mt-[4px] font_label_regular_md content_quaternary break-all line-clamp-2">${member.memberBriefIntroduce}</p>`
        }
        text += `
                    </button>
                </div>
            </div>
        `
    });

    $div.html(text);
}

/* 카테고리 버튼 */
$("button.category").on("click", function(){
    $category_track.css("transform", "translate3d(0px, 0px, 0px)");
    $category_track.css("transition", "0s");
    $category_next.css("display", "flex");
    $category_prev.css("display", "none");
    category_count = 0;
    let category = $(this).attr("name");
    $.ajax({
        url: `/main/category/${category}`,
        success: function(result){
            showMember(result);
        }
    });
});

/* 전체 버튼 */
$("button.all-button").on("click", function(){
    $category_track.css("transform", "translate3d(0px, 0px, 0px)");
    $category_track.css("transition", "0s");
    $category_next.css("display", "flex");
    $category_prev.css("display", "none");
    category_count = 0
    $.ajax({
        url: `/main/all`,
        success: function(result){
            showMember(result);
        }
    });
});