// 상단바 고정 js
window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
        $(".style__HeaderContentLayout-zxsodr-12").removeClass("elXgTt").addClass("iziaon");
    } else {
        $(".style__HeaderContentLayout-zxsodr-12").removeClass("iziaon").addClass("elXgTt");
    }
});

//원본
// $(".fAzCXd a").on("click", function() {
//
//     $(".fAzCXd a").removeClass("eWDpEZ").addClass("ehJwom");
//     if ($(".eWDpEZ").is($(this))) {
//         return
//     }
//     else {
//         $(this).removeClass("ehJwom").addClass("eWDpEZ");
//     }
// });

//진혁이가 만든거
function searchParam(key) {
    return new URLSearchParams(location.search).get(key);
};

$(document).ready(function () {
    let type = searchParam('type');
    $(".fAzCXd a").removeClass("eWDpEZ").addClass("ehJwom");
    if (type == null) {
        $(".writing").removeClass("ehJwom").addClass("eWDpEZ");
    } else {
        $("." + type).removeClass("ehJwom").addClass("eWDpEZ");
    }
})

$(".fAzCXd a").on("click", function (e) {
    e.preventDefault();
    let type = this.classList[0];
    if (type == "main") {
        location.href = `/main/main`;
    } else {
        location.href = `/post/list?type=${type}`;
    }
});
