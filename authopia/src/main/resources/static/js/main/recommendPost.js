$(document).ready(showRecommendPost(recommendPost1, $(".recommend-post1")));
$(document).ready(showRecommendPost(recommendPost2, $(".recommend-post2")));

/* 글 화면에 보이기 */
function showRecommendPost(post, section){
    if(recommendPost1 != null) {
        let text = "";
        text += `
                <div>
                    <div class="lg:pt-[28px] lg:border-t lg:border_primary"></div>
                    <h1 class="hidden">추천포스트 </h1>
                    <button type="button" class="text-left w-full lg:flex lg:flex-row" onclick="location.href='/post/detail?id=${post.id}'">
                        <div class="relative rounded-[16px] lg:w-1/2 lg:mt-[24px]">
                            <span style="box-sizing: border-box; display: block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: relative;">
                                <span style="box-sizing: border-box; display: block; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 63.75% 0px 0px;"></span>
                `
        post.postFiles.forEach(file => {
            if (file.fileType == "REPRESENTATIVE") {
                text += `<img alt="사진" src="/files/display?fileName=${file.filePath}/${file.fileUuid}_${file.fileName}" class="rounded-[16px]" sizes="100vw" style="height: 100%; position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%; object-fit: cover; object-position: center center;">`;
            }
        })
        text += `
                            </span>
                            <div class="absolute top-0 left-0 w-full h-full border border_disabled rounded-[16px]"></div>
                        </div>
    
                        <!--추천 포스트-->
                        <section class="mt-[24px] flex flex-col gap-y-[16px] lg:w-1/2 order-first mr-[36px]">
                            <div>
                                <strong class="font_label_bold_lg" style="color: rgb(126, 105, 254)">추천 포스트</strong>
                                <!--제목-->
                                <h2 class="mt-[8px] font_headline_bold_md content_secondary keep-all">${post.postName},  ${post.id}</h2>
                            </div>
                            <div class="w-[40px] h-[2px] surface_secondary_inverse"></div>
                            <!--내용-->
                            <p class="font_body_regular_lg content_tertiary">${post.postContent}</p>
                        </section>
                    </button>
                </div>
        `;

        section.html(text);
    }
}
