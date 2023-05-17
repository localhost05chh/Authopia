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
    $main_track.css("transform", `translate(${-559.333 * ++main_count}px)`);
    $main_track.css("transition", "transform 0.7s");
    if(main_count == 5) {
        main_count = 1;
        setTimeout(() => {
            $main_track.css("transform", `translate(-559.333px)`);
            $main_track.css("transition", "transform 0s");
        }, 700);
    }
    $indicator.text(`${main_count}/6`);
    setTimeout(() => {check = true;}, 700);
}


