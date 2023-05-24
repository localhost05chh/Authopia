const $change = $(".change-button");
const $ablebutton = $("#ablebutton");
const $button = $(".button");

$change.on('keyup',function(){
    let $input = $("#input").val();
    let $textarea = $("#textarea").val();

    if($input.length > 0 && $textarea.length > 0){
        $ablebutton.attr('disabled', false);
    }
    if($input.length == 0 || $textarea.length == 0){
        $ablebutton.attr('disabled', true);
    }
})

$button.on('mouseover', function(event){
    $(event.target).css({
        'background-color' : '#f3f3f4'
    })
})

$button.on('mouseout', function(event){
    $(event.target).css({
        'background-color': '#ffffff'
    })
})

let type = "writing";

//임시 체크박스 입니다!!
$(".type").on('click', function () {
    type = this.classList[0];
    $(".type").children('div').children().children().css('display', 'none');
    $(this).children('div').children().children().css('display', 'block');
})

//게시 버튼 클릭 이벤트
$ablebutton.on("click", function(){
    $('.postType').attr('value', type);
    const imgs = $("img.thumbnail").filter((i, img) => $(img).attr("src"));
    let text = ``;
    imgs.each((i, img) => {
        let fullPath = $(img).attr("src");
        let datas = fullPath.split("_");
        let filePath = datas[0].split("=")[1].replace("/t", "");
        let fileUuid = datas[1];
        let fileName = datas[2];
        let fileSize = sizes[i];

        text += `
            <input type="hidden" name="postFiles[${i}].filePath" value="${filePath}">
            <input type="hidden" name="postFiles[${i}].fileUuid" value="${fileUuid}">
            <input type="hidden" name="postFiles[${i}].fileName" value="${fileName}">
            <input type="hidden" name="postFiles[${i}].fileSize" value="${fileSize}">
        `
    });
    $("#writeForm").append(text);
    $("#writeForm").submit();
});

/*파일 업로드 */
const $upload = $("input.upload");

let sizes = new Array();
$upload.on("change", function (e) {
    let i = $upload.index($(this));
    let files = $(this)[0].files;
    let name = files[0].name;
    let formData = new FormData();

    sizes.push(files[0].size);

    $(files).each((i, file) => {
        formData.append("uploadFile", file);
    });

    $.ajax({
        url: "/files/upload",
        type: "post",
        data: formData,
        contentType: false,
        processData: false,
        success: function (uuids) {
            let now = new Date();
            let year = now.getFullYear();
            let month = now.getMonth() + 1;
            let date = now.getDate();

            month = month < 10 ? "0" + month : month;
            date = date < 10 ? "0" + date : date;

            let fileName = year + "/" + month + "/" + date + "/t_" + uuids[0] + "_" + name;
            $("img.thumbnail").eq(i).attr("src", `/files/display?fileName=${fileName}`);
        }
    });
});
