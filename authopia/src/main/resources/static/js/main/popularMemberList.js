$(document).ready(function(){
    const $div = $(".popular-track");

    let text = "";
    popularMembers.forEach(member => {
        text += `
            <div class="swiper-slide swiper-slide-active first:ml-[16px] mobile:first:ml-0" style="width: 92px; margin-right: 22.66px">
                <div>
                    <button type="button" class="relative shrink-0 text-left w-[86px] h-[86px] rounded-full flex flex-col justify-end items-center" onclick="location.href='/post/author-profile?&memberId=${member.id}'">
                        <span style="box-sizing: border-box; display: block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: absolute; inset: 0px;">
            `
        if(member.memberProfileImage != null){
            text += `<img alt="사진" src="/files/display?fileName=${member.memberProfileImage.filePath}/${member.memberProfileImage.fileUuid}_${member.memberProfileImage.fileName}" class="rounded-full" style="position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%; object-fit: cover; object-position: center center;" sizes="100vw">`;
        } else {
            text += `<img alt="사진" src="/image/profile_icon.png" class="rounded-full" style="position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%; object-fit: cover; object-position: center center;" sizes="100vw">`;
        }
        text += `
                        </span>
                        <div class="absolute top-0 left-0 w-full h-full border border-gray-100 rounded-full"></div>
                    </button>
                    <div class="mt-[12px] mr-[4px] z-[1] flex flex-col items-center">
                        <h2 class="text-[14px] font_label_bold_xl content_secondary break-all line-clamp-1">
                            ${member.memberName}
                        </h2>
                `
        if(member.memberCategory == null){
            text += `<p class="mt-[2px] font_label_regular_sm content_tertiary"></p>`
        } else if(member.memberCategory == "소설"){
            text += `<p class="text-[12px] font_label_regular_sm content_tertiary">소설</p>`
        } else {
            text += `<p class="text-[12px] font_label_regular_sm content_tertiary">일러스트</p>`
        }
        text += `
                    </div>
                </div>
            </div>
        `
    });

    $div.html(text);
});