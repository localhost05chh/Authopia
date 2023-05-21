/* 메인 배너 */
let main_count = 1;
let check = true;
const $main_banner = $(".main-banner");
const $main_track = $(".main-banner .swiper-wrapper");
const $main_prev = $(".main-banner .prev-button");
const $main_next = $(".main-banner .next-button");
const $main_buttons = $(".main-banner .button-wrapper");
const $indicator = $(".main-banner .indicator");


/* 오토슬라이드 */
let slide = setInterval(() => autoSlide(), 2000);
function autoSlide(){
    check = false;
    $(".main-banner-wrapper").find("button").addClass("opacity-[0.3]");
    $(".main-banner-wrapper").find("p").removeClass("animate-mainBannerText");
    $(".main-banner-wrapper").find("h2").removeClass("animate-mainBannerText");
    $(`.${main_count}`).children("button").removeClass("opacity-[0.3]");
    $(`.${main_count}`).find("p").addClass("animate-mainBannerText");
    $(`.${main_count}`).find("h2").addClass("animate-mainBannerText");
    $main_track.css("transform", `translate(${-559.333 * ++main_count}px)`);
    $main_track.css("transition", "transform 0.7s");
    if(main_count == 5) {
        main_count = 1;
        setTimeout(() => {
            $main_track.css("transform", `translate(-559.333px)`);
            $main_track.css("transition", "transform 0s");
        }, 700);
    }
    $indicator.text(main_count);
    setTimeout(() => {check = true;}, 700);
}

/* 메인베너 앞뒤 버튼 클릭 이벤트 */
$main_prev.on("click",function(){
    if(!check){return;}
    clearInterval(slide);
    autoSlideReverse();
    slide = setInterval(() => autoSlide(), 2000);
});

$main_next.on("click",function(){
    if(!check){return;}
    clearInterval(slide);
    autoSlide();
    slide = setInterval(() => autoSlide(), 2000);
});

function autoSlideReverse(){
    check = false;
    $main_track.css("transform", `translate(${-559.333 * --main_count}px)`);
    $main_track.css("transition", "transform 0.7s");
    if(main_count == 0) {
        main_count = 4;
        setTimeout(() => {
            $main_track.css("transform", `translate(-2237.332px)`);
            $main_track.css("transition", "transform 0s");
        }, 700);
    }
    $(".main-banner-wrapper").find("button").addClass("opacity-[0.3]");
    $(".main-banner-wrapper").find("p").removeClass("animate-mainBannerText");
    $(".main-banner-wrapper").find("h2").removeClass("animate-mainBannerText");
    $(`.${main_count}`).prev().children("button").removeClass("opacity-[0.3]");
    $(`.${main_count}`).prev().find("p").addClass("animate-mainBannerText");
    $(`.${main_count}`).prev().find("h2").addClass("animate-mainBannerText");
    $indicator.text(main_count);
    setTimeout(() => {check = true;}, 700);
}

/* 인기 크리에이터 */
let popular_count = 0;
const $popular_prev = $(".popular-prev");      //앞으로가기
const $popular_next = $(".popular-next");      //뒤로가기
const $popular_track = $(".popular-track");   //베너 트렉
$popular_prev.css("display", "none");

$popular_prev.on("click", function() {
    popular_count -= 1;
    $popular_track.css("transform", `translate3d(${-458.66*popular_count}px, 0px, 0px)`);
    $popular_track.css("transition", "0.7s");
    if(popular_count<2){
        $popular_next.css("display", "flex");   //앞으로가기 버튼 보이게하고
    }
    if(popular_count==0){
        $popular_prev.css("display", "none");   //뒤로가기 버튼 안보이게하고
    }
});

$popular_next.on("click", function() {
    popular_count += 1;
    $popular_prev.css("display", "flex");
    $popular_track.css("transform", `translate3d(${-458.66*popular_count}px, 0px, 0px)`);
    $popular_track.css("transition", "0.7s");
    if(popular_count==2){
        $popular_next.css("display", "none");   //앞으로가기 버튼 안보이게하고
    }
});

/* 새로운 크리에이터 */
let new_count = 0;
const $new_prev = $(".new-prev");      //앞으로가기
const $new_next = $(".new-next");      //뒤로가기
const $new_track = $(".new-track");   //베너 트렉
$new_prev.css("display", "none");

$new_prev.on("click", function() {
    new_count -= 1;
    $new_track.css("transform", `translate3d(${-560*new_count}px, 0px, 0px)`);
    $new_track.css("transition", "0.7s");
    if(new_count<2){
        $new_next.css("display", "flex");   //앞으로가기 버튼 보이게하고
    }
    if(new_count==0){
        $new_prev.css("display", "none");   //뒤로가기 버튼 안보이게하고
    }
});

$new_next.on("click", function() {
    new_count += 1;
    $new_prev.css("display", "flex");
    $new_track.css("transform", `translate3d(${-560*new_count}px, 0px, 0px)`);
    $new_track.css("transition", "0.7s");
    if(new_count==2){
        $new_next.css("display", "none");   //앞으로가기 버튼 안보이게하고
    }
});

/* 카테고리별 크리에이터 */
let category_count = 0;
const $category_prev = $(".category-prev");      //앞으로가기
const $category_next = $(".category-next");      //뒤로가기
const $category_track = $(".category-track");   //베너 트렉
$category_prev.css("display", "none");

$category_prev.on("click", function() {
    category_count -= 1;
    $category_track.css("transform", `translate3d(${-560*category_count}px, 0px, 0px)`);
    $category_track.css("transition", "0.7s");
    if(category_count<2){
        $category_next.css("display", "flex");   //앞으로가기 버튼 보이게하고
    }
    if(category_count==0){
        $category_prev.css("display", "none");   //뒤로가기 버튼 안보이게하고
    }
});

$category_next.on("click", function() {
    category_count += 1;
    $category_prev.css("display", "flex");
    $category_track.css("transform", `translate3d(${-560*category_count}px, 0px, 0px)`);
    $category_track.css("transition", "0.7s");
    if(category_count==2){
        $category_next.css("display", "none");   //앞으로가기 버튼 안보이게하고
    }
});

/* 카테고리 탭 클릭 이벤트 */
const $category_buttons = $(".category-button");

$category_buttons.each((i, category_button) => {
    let $category_button = $(category_button);

    $category_button.on("click", () => {
        $category_buttons.removeClass("category-active");
        $category_buttons.addClass("category");
        $category_button.addClass("category-active");
        $category_button.removeClass("category");
    })
});