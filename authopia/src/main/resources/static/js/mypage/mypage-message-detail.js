$(document).ready(function(){
    let text = ""
    text += `
        <div class="pt-[41px] pb-[16px] border-b-[1px] border_black_opacity col-span-full">
            <div class="flex pb-[26px] justify-between">
                <h3 class="font_headline_bold_lg content_primary">${message.messageName}</h3>
                <div class="flex">
                    <div class="w-[88px]">
                        <button onclick="location.href='/message/list'" type="button" class="relative flex justify-center items-center font_button_bold_md h-[40px] rounded-[20px] content_secondary surface_primary border border-solid border_black_opacity hover:surface_tertiary hover:border_secondary active:surface_tertiary active:border_secondary disabled:surface_primary disabled:border_black_opacity disabled:border disabled:border-solid px-[16px] w-full false disabled:content_disabled">목록 보기</button>
                    </div>
                    <div class="w-[88px] ml-[12px]">
                        <button onclick="location.href='/message/write'" type="button" class="relative flex justify-center items-center font_button_bold_md h-[40px] rounded-[20px] content_primary_inverse surface_primary_inverse hover:surface_primary_inverse_active active:surface_primary_inverse_active disabled:surface_disabled px-[16px] w-full false disabled:content_disabled">답장</button>
                    </div>
                </div>
            </div>
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-x-[10px] whitespace-nowrap">
                    <div>
                        <a href="">
                            <div class="relative shrink-0 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]" style="width: 34px; height: 34px; background : rgb(255, 255, 255);">
            `
        if(message.memberProfileImage != null){
            text += `<img class="rounded-full" src="/files/display?fileName=${message.memberProfileImage.filePath}/t_${message.memberProfileImage.fileUuid}_${message.memberProfileImage.fileName}" alt="">`;
        } else {
            text += `<img class="rounded-full" src="/image/profile_icon.png" alt="">`;
        }

        text += `
                            </div>
                        </a>
                    </div>
                    <div>
                        <div>
                            <a class="font_label_bold_md content_secondary" href="">${message.memberName}</a>
                        </div>
                        <div class="mt-[2px] flex items-center">
                            <div class="font_label_regular_sm content_quaternary flex items-center">
                                    <span>
                                        ${getDate(message.messageRegisterDate)}
                                    </span>
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="mx-[2px] w-[8px] h-[8px] content_disabled">
                                    <circle cx="12" cy="12" r="4"></circle>
                                </svg>
                                <span>
                                        ${getTime(message.messageRegisterDate)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="border-b">
            <div class="mt-[24px] mb-[24px] pt-[32px] pb-[32px]">
                <div class="steadio-post steadio-post-detail">
                    <p class="mb-[15px]">${message.messageContent}</p>
                    <div class="image-wrapper">
        `
    message.messageFiles.forEach(file => {
        text += `<img src="/files/display?fileName=${file.filePath}/t_${file.fileUuid}_${file.fileName}" alt="">`;
    });
    text += `    
                    </div>
                </div>
            </div>
        </div>
    `
    $(".content-wrapper").html(text);
});


function getTime(date){
    return new Date(date).toTimeString().split(' ')[0].slice(0,5);
}
function getDate(date){
    return new Date(date).toLocaleDateString().replace(/\./g, '').replace(/\s/g, '/');
}