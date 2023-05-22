$(document).ready(function(){
    const $div = $("div.new-track");

    let text = "";
    newMembers.forEach(member => {
        text += `
            <div class="swiper-slide swiper-slide-active first:ml-[16px] mobile:first:ml-0" style="width: 128px; margin-right: 12px">
                <div>
                    <button type="button" class="block text-left w-full">
                        <div class="relative">
                            <span style="box-sizing: border-box; display: block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: relative;">
                                <span style="box-sizing: border-box; display: block; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 100% 0px 0px;"></span>
                                <img alt="사진" src="/image/img.png" class="rounded-[16px]" sizes="100vw" style="position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%; object-fit: cover; object-position: center center;"/>
                            </span>
                            <div class="absolute top-0 left-0 w-full h-full border border_black_opacity rounded-[16px]"></div>
                        </div>
                        <h2 class="mt-[12px] font_label_bold_xl content_secondary break-all line-clamp-1">
                            ${member.memberName}, ${member.id}
                        </h2>
                        <p class="mt-[2px] font_label_regular_sm content_tertiary">${member.memberCategory}</p>
                        <p class="mt-[4px] font_label_regular_md content_quaternary break-all line-clamp-2">
                            ${member.memberBriefIntroduce}
                        </p>
                    </button>
                </div>
            </div>
        `
    });

    $div.html(text);
});