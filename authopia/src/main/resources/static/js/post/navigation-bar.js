// 상단바 고정 js
window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
        $(".style__HeaderContentLayout-zxsodr-12").removeClass("elXgTt").addClass("iziaon");
    } else {
        $(".style__HeaderContentLayout-zxsodr-12").removeClass("iziaon").addClass("elXgTt");
    }
});

$(document).ready(function () {
    let type = searchParam('type');
    let href = window.location.href
    $(".fAzCXd a").removeClass("eWDpEZ").addClass("ehJwom");
    if(href.split('/')[3]=='main'){
        $(".main").removeClass("ehJwom").addClass("eWDpEZ");
    }else if(href.split('/')[3]=='post'){
        if (type == null) {
            $(".writing").removeClass("ehJwom").addClass("eWDpEZ");
        } else {
            $("." + type).removeClass("ehJwom").addClass("eWDpEZ");
        }
    }

    //진혁이가 만든거
    function searchParam(key) {
        return new URLSearchParams(location.search).get(key);
    };

    $(".fAzCXd a").on("click", function (e) {
        e.preventDefault();
        let type = this.classList[0];
        if (type == "main") {
            location.href = `/main`;
        } else {
            location.href = `/post/list?type=${type}`;
        }
    });
})
