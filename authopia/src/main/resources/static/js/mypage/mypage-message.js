/* 모듈 */
// let messageService = (function(){
//
//     // function getList(callback){
//     //     $.ajax({
//     //         url: `/message/list/${searchParam('type')}`,
//     //         success: function(messages){
//     //             if(callback){
//     //                 callback(messages);
//     //             }
//     //         }
//     //     });
//     // }
//
//     function remove(messageId, callback){
//         $.ajax({
//             url: `/message/${messageId}`,
//             type: `DELETE`,
//             success: function(){
//                 if(callback){
//                     callback();
//                 }
//             }
//         });
//     }
//     return {remove: remove};
// })();

/* 삭제 */
const $ul = $(".content-wrap");
$(".delete-modal").hide();
const deletes = $(".delete");
$ul.on("click", ".delete",  function(){
    let messageId = $(this).data("message-id")
    $(".delete-modal").show();
    $(".deleteOk").on("mousedown", function(){
        $(".delete-modal").hide();
        location.href=`/message/remove?id=${messageId}&type=${searchParam('type')}`;
        // messageService.remove(messageId, function(){
        //     // messageService.getList(showMessage);
        //     showMessage(messages);
        // });
    });
    $(".cancel").on("click", function(){
        $(".delete-modal").hide();
    });
});

// deletes.on("focusout", function(){
//     $(".delete-modal").hide();
// });

/* tab 동작 */
const $buttonTabs = $(".button-tab");
const $lines = $(".button-line");

if(searchParam('type')=="receive" || searchParam('type')==null){
    $buttonTabs.eq(1).removeClass("content_primary");
    $buttonTabs.eq(1).addClass("content_disabled");
    $buttonTabs.eq(0).addClass("content_primary");
    $buttonTabs.eq(0).removeClass("content_disabled");
    $lines.eq(1).hide();
    $lines.eq(0).show();
} else {
    $buttonTabs.eq(0).removeClass("content_primary");
    $buttonTabs.eq(0).addClass("content_disabled");
    $buttonTabs.eq(1).addClass("content_primary");
    $buttonTabs.eq(1).removeClass("content_disabled");
    $lines.eq(0).hide();
    $lines.eq(1).show();
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
    if(searchParam('type') == null){
        location.href=`/message/list?page=${page}`;
    } else {
        location.href = `/message/list?type=${searchParam('type')}&page=${page}`;
    }
});

function searchParam(key) {
    return new URLSearchParams(location.search).get(key);
};

$(document).ready(showMessage(messages));
// messageService.getList(showMessage)

function showMessage(messageList){
    let text = "";
    if(messageList.length == 0){
        text += `
            <div class="no-post col-span-full mt-[88px] flex flex-col items-center justify-center">
                <svg width="101" height="97" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M21.617 63.243c.462-.167 1.355-.362 2.03.311.933.93 1.125 2.136 1.092 3.153-.03.917-.252 1.848-.416 2.534l-.043.184c-.313 1.33-.79 2.55-1.57 3.582a6.838 6.838 0 0 1-.73.819c.88.089 1.763.138 2.636.136.238-.73.731-1.365 1.221-1.865a10.708 10.708 0 0 1 1.916-1.517c.624-.391 1.268-.714 1.76-.861.607-.18 1.732-.417 2.727-.315.489.05 1.127.198 1.62.657.566.529.733 1.265.6 2.022-.128.724-.537 1.266-.95 1.648-.41.38-.884.66-1.275.858-1.21.615-2.512 1.028-3.857 1.283.576.145 1.25.222 1.998.238 1.47.032 3.005-.172 4.201-.35.177-.026.36-.055.547-.084.904-.144 1.904-.303 2.807-.23 1.225.101 2.351.619 3.241 1.901.354.509.23 1.21-.275 1.565a1.112 1.112 0 0 1-1.555-.278c-.477-.686-.97-.896-1.593-.947-.612-.05-1.281.054-2.172.193l-.674.104c-1.202.178-2.901.41-4.575.373-1.631-.035-3.476-.326-4.791-1.402a3.126 3.126 0 0 1-.673-.748c-2.071.026-4.146-.216-6.059-.577-1.963.712-3.965 1.247-5.914 1.77-.087.022-.173.045-.26.069-2.273.609-4.477 1.21-6.598 2.067a1.114 1.114 0 0 1-1.452-.624c-.23-.576.048-1.23.62-1.461 2.265-.915 4.595-1.548 6.856-2.154l.22-.058c1.02-.274 2.026-.543 3.017-.833a2.453 2.453 0 0 1-.433-.603c-.354-.694-.344-1.463-.209-2.137.268-1.331 1.13-2.815 2.091-4.096.98-1.305 2.171-2.54 3.247-3.368.529-.408 1.09-.765 1.627-.959Zm-2.999 10.06.061-.023c1.024-.395 1.733-.947 2.253-1.634.53-.701.906-1.598 1.175-2.74l.037-.154c.17-.725.34-1.441.363-2.12.017-.54-.064-.938-.238-1.232-.221.098-.534.287-.922.586-.888.684-1.94 1.765-2.822 2.939-.9 1.198-1.517 2.355-1.683 3.186-.082.407-.028.599.006.666.014.028.072.14.408.222.446.108.901.21 1.362.305Zm3.878-7.98s-.01.004-.026.005c.018-.005.026-.004.026-.004Zm4.84 8.446c1.387-.204 2.705-.582 3.892-1.185.306-.156.575-.325.77-.505.192-.179.248-.309.262-.389l.001-.006a1.401 1.401 0 0 0-.247-.045c-.578-.059-1.382.09-1.866.234-.217.065-.667.271-1.213.614-.531.333-1.08.75-1.508 1.187a4.88 4.88 0 0 0-.09.095Z" fill="#020202"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M50.13 70.441a2.817 2.817 0 0 1 1.25 3.768 25.557 25.557 0 0 1-1.167 2.083l-.078.128a21.613 21.613 0 0 0-1.1 2 2.784 2.784 0 0 1-3.731 1.296 2.817 2.817 0 0 1-1.288-3.755 27.19 27.19 0 0 1 1.356-2.471c.023-.039.046-.077.07-.114.337-.556.61-1.005.944-1.677a2.784 2.784 0 0 1 3.744-1.258Z" fill="#000"></path><path d="M80.91 12.434a3.337 3.337 0 0 1 4.481-.943l10.498 6.42a3.383 3.383 0 0 1 1.002 4.818L65.06 68.332c-.342.49-.808.879-1.349 1.128l-11.67 5.367a3.332 3.332 0 0 1-3.132-.185l-.66-.403a3.378 3.378 0 0 1-1.577-3.347l1.517-10.936c.074-.53.271-1.034.577-1.471L80.91 12.434Z" fill="#9D8DFF"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M86.885 21.214c-2.262-1.284-4.427-2.611-6.39-4.195a1.112 1.112 0 0 0-1.57.174 1.128 1.128 0 0 0 .173 1.579c2.106 1.699 4.396 3.097 6.69 4.4.78.443 1.555.872 2.324 1.297 1.519.842 3.015 1.67 4.488 2.57a1.113 1.113 0 0 0 1.534-.376c.32-.53.153-1.221-.374-1.544-1.513-.924-3.084-1.794-4.629-2.65-.758-.42-1.51-.837-2.246-1.255ZM65.758 68.348c-.3.542-.98.737-1.518.435-2.071-1.16-4.11-2.4-6.13-3.626l-1.32-.802c-2.462-1.49-4.907-2.938-7.416-4.22a1.127 1.127 0 0 1-.49-1.51c.279-.554.951-.775 1.501-.494 2.585 1.321 5.09 2.805 7.556 4.298l1.336.811c2.018 1.227 4.016 2.441 6.049 3.58.539.301.732.986.433 1.528Z" fill="#000"></path></svg>
                <p class="mt-[24px] font_headline_bold_sm content_primary">쪽지가 없습니다.</p>
                <p class="mt-[4px] font_body_regular_lg content_quaternary">지금 첫 쪽지를 보내보세요.</p>
                <div class="mt-[24px]">
                    <button type="button" class="relative flex justify-center items-center font_button_bold_md h-[32px] rounded-[16px] content_primary_inverse surface_accent hover:surface_accent_active active:surface_accent_active disabled:surface_disabled px-[16px]  false disabled:content_disabled">쪽지 보내기</button>
                </div>
            </div>
        `
    } else {
        messageList.forEach(message =>{
            text += `
                <li class="px-[8px] py-[16px] flex items-center border-b border_secondary hover:surface_secondary">
                    <button class="text-left w-[280px] block" onclick="location.href='/message/read?type=${searchParam('type') == null ? "receive" : searchParam('type')}&id=${message.id}'">
                        <div class="content_secondary flex flex-col gap-y-[2px]">
                            <div class="flex flex-row gap-[2px]">
                                <p class="font_label_medium_xl text-ellipsis overflow-hidden whitespace-nowrap">${message.messageName}</p>
                            </div>
                            <p class="mt-[2px] font_body_regular_md content_quaternary text-ellipsis overflow-hidden whitespace-nowrap">${message.messageContent}</p>
                        </div>
                    </button>
                    <div class="relative h-[36px] w-[36px] ml-[40px]">
                            <span style="box-sizing: border-box; display: block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: absolute; inset: 0px;">
                    `
            message.messageFiles.forEach(file => {
                if (file.fileType == "REPRESENTATIVE") {
                    text += `<img src="/files/display?fileName=${file.filePath}/t_${file.fileUuid}_${file.fileName}" alt="">`;
                }
            })
            text += `
                            </span>
                    </div>
                    <div class="ml-[100px] flex items-center gap-x-[40px]">
                    `
            if(searchParam('type')=="receive" || searchParam('type') == null){
                text += `
                    <div class="w-[56px] flex flex-col gap-y-[4px] items-end">
                            <p class="font_label_medium_lg">${message.memberName}</p>
                            <p class="font_label_regular_md content_quaternary">발신인</p>
                        </div>
                        <div class="w-[56px] flex flex-col gap-y-[4px] items-end">
                            <p class="font_label_medium_lg">${getCheck(message.messageView)}</p>
                            <p class="font_label_regular_md content_quaternary">조회</p>
                        </div>
                        <div class="w-[56px] flex flex-col gap-y-[4px] items-end">
                            <p class="font_label_medium_lg">${getTime(message.messageRegisterDate)}</p>
                            <p class="font_label_regular_md content_quaternary">발신시간</p>
                        </div>
                        <div class="w-[88px] flex flex-col gap-y-[4px] items-end">
                            <p class="font_label_medium_lg">${getDate(message.messageRegisterDate)}</p>
                            <p class="font_label_regular_md content_quaternary">발신일</p>
                        </div>
                    </div>
                    <div class="ml-auto flex items-center gap-x-[12px]">
                        <button type="button" data-message-id="${message.id}" class="delete w-[40px] h-[40px] border border_primary rounded-full flex justify-center items-center">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-[20px] h-[20px] content_secondary">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10 15.6a.7.7 0 0 1-.7-.7v-3.6a.7.7 0 0 1 1.4 0v3.6a.7.7 0 0 1-.7.7ZM14 15.6a.7.7 0 0 1-.7-.7v-3.6a.7.7 0 1 1 1.4 0v3.6a.7.7 0 0 1-.7.7Z"></path>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.6 3.8h4.6c.22 0 .4.178.4.4v1.4H9.2V4.2c0-.222.179-.4.4-.4Zm-2 .4a2 2 0 0 1 2-2h4.6a2 2 0 0 1 2 2v1.4h3.5a.8.8 0 0 1 0 1.6H19v10.4a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V7.2h-.7a.8.8 0 1 1 0-1.6h3.3V4.2Zm-1 3h10.8v10.4A2.4 2.4 0 0 1 15 20H9a2.4 2.4 0 0 1-2.4-2.4V7.2Z"></path>
                            </svg>
                        </button>
                    </div>
                </li>
                `
            } else {
                text += `
                        <div class="w-[56px] flex flex-col gap-y-[4px] items-end">
                            <p class="font_label_medium_lg">${message.memberName}</p>
                            <p class="font_label_regular_md content_quaternary">수신인</p>
                        </div>
                        <div class="w-[56px] flex flex-col gap-y-[4px] items-end">
                            <p class="font_label_medium_lg">${getCheck(message.messageView)}</p>
                            <p class="font_label_regular_md content_quaternary">조회</p>
                        </div>
                        <div class="w-[56px] flex flex-col gap-y-[4px] items-end">
                            <p class="font_label_medium_lg">${getTime(message.messageRegisterDate)}</p>
                            <p class="font_label_regular_md content_quaternary">수신시간</p>
                        </div>
                        <div class="w-[88px] flex flex-col gap-y-[4px] items-end">
                            <p class="font_label_medium_lg">${getDate(message.messageRegisterDate)}</p>
                            <p class="font_label_regular_md content_quaternary">수신일</p>
                        </div>
                    </div>
                    <div class="ml-auto flex items-center gap-x-[12px]">
                        <button type="button" data-message-id="${message.id}" class="delete w-[40px] h-[40px] border border_primary rounded-full flex justify-center items-center">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-[20px] h-[20px] content_secondary">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M10 15.6a.7.7 0 0 1-.7-.7v-3.6a.7.7 0 0 1 1.4 0v3.6a.7.7 0 0 1-.7.7ZM14 15.6a.7.7 0 0 1-.7-.7v-3.6a.7.7 0 1 1 1.4 0v3.6a.7.7 0 0 1-.7.7Z"></path>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.6 3.8h4.6c.22 0 .4.178.4.4v1.4H9.2V4.2c0-.222.179-.4.4-.4Zm-2 .4a2 2 0 0 1 2-2h4.6a2 2 0 0 1 2 2v1.4h3.5a.8.8 0 0 1 0 1.6H19v10.4a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V7.2h-.7a.8.8 0 1 1 0-1.6h3.3V4.2Zm-1 3h10.8v10.4A2.4 2.4 0 0 1 15 20H9a2.4 2.4 0 0 1-2.4-2.4V7.2Z"></path>
                            </svg>
                        </button>
                    </div>
                </li>
            `
            }
        });
    }
    $ul.html(text);
}

function getTime(date){
    return new Date(date).toTimeString().split(' ')[0].slice(0,5);
}

function getDate(date){
    return new Date(date).toLocaleDateString().replace(/\./g, '').replace(/\s/g, '/');
}

function getCheck(boolean){
    return boolean ? "읽음" : "읽지않음";
}
