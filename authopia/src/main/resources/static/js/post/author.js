const $writing = $(".writing");
const $drawing = $(".drawing");

$writing.on('click', function () {
    $writing.addClass("content_primary");
    $writing.removeClass("content_disabled");
    $drawing.removeClass("content_primary");
    $drawing.addClass("content_disabled");
})

$drawing.on('click', function () {
    $drawing.addClass("content_primary");
    $drawing.removeClass("content_disabled");
    $writing.removeClass("content_primary");
    $writing.addClass("content_disabled");
})