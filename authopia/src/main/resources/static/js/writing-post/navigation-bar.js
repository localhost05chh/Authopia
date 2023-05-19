// 상단바 고정 js
window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
        $(".style__HeaderContentLayout-zxsodr-12").removeClass("elXgTt").addClass("iziaon");
    } else {
        $(".style__HeaderContentLayout-zxsodr-12").removeClass("iziaon").addClass("elXgTt");
    }
});

$(".style__CategoryWrapper-zxsodr-18").on("click", function() {
    var $this = $(this);
    $(".style__CategoryWrapper-zxsodr-18").removeClass("eWDpEZ").addClass("ehJwom");
    if ($(".eWDpEZ").is($this)) {
        return
    }
    else {
        $this.removeClass("ehJwom").addClass("eWDpEZ");
    }
});
