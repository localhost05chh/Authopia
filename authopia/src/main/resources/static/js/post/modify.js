const $ablebutton = $("#ablebutton");
const $button = $(".button");
const fileIdsForDelete = new Array();


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

let type = '';

$(document).ready(function (){
    $ablebutton.attr('disabled', false);
    type = $('.postType').val();
    $(".type").children('div').children().children().css('display', 'none');
    $("."+type).children('div').children().children().css('display', 'block');
})

//임시 체크박스 입니다!!
$(".type").on('click', function () {
    type = this.classList[0];
    $(".type").children('div').children().children().css('display', 'none');
    $(this).children('div').children().children().css('display', 'block');
})

const $thumbnail = $("label.attach img.thumbnail");
const $upload = $("input.upload");
let sizes = new Array();

//대표 이미지 검사
let representativeFile = files.filter(file => file.fileType == "REPRESENTATIVE");
if(representativeFile.length != 0){
    let file = representativeFile[0];

    let fileName = file.filePath + "/t_" + file.fileUuid + "_" + file.fileName;
    $thumbnail.eq(0).attr("src", `/files/display?fileName=${fileName}`);
    $thumbnail.eq(0).addClass("original")
    $thumbnail.eq(0).attr("data-id", file.id);
    sizes[0] = file.fileSize;
}

//일반 이미지 검사
files.filter(file => file.fileType != "REPRESENTATIVE").forEach((file, i) => {
    let fileType = file.fileType;

    let fileName = file.filePath + "/t_" + file.fileUuid + "_" + file.fileName;
    $thumbnail.eq(i + 1).attr("src", `/files/display?fileName=${fileName}`);
    $thumbnail.eq(i + 1).addClass("original")
    $thumbnail.eq(i + 1).attr("data-id", file.id);
    sizes[i + 1] = file.fileSize;
});

//게시 버튼 클릭 이벤트
$ablebutton.on("click", function(){
    $('.postType').attr('value', type);
    const imgs = $("img.thumbnail").filter((i, img) => $(img).attr("src"));
    let text = ``;
    let count = 0;
    imgs.each((i, img) => {
        if($(img).hasClass("original")){return;}
        if(!$(img).attr("src")){return;}
        let fullPath = $(img).attr("src");
        if(!fullPath) {return;}

        let datas = fullPath.split("_");
        let filePath = datas[0].split("=")[1].replace("/t", "");
        let fileUuid = datas[1];
        let fileName = datas[2];
        let fileType = $(img).hasClass("representative");
        let fileSize = sizes[i];

        text += `
            <input type="hidden" name="postFiles[${count}].filePath" value="${filePath}">
            <input type="hidden" name="postFiles[${count}].fileUuid" value="${fileUuid}">
            <input type="hidden" name="postFiles[${count}].fileName" value="${fileName}">
            <input type="hidden" name="postFiles[${count}].fileSize" value="${fileSize}">
        `
        if(fileType){
            text += `<input type="hidden" name="postFiles[${count}].fileType" value="REPRESENTATIVE">`;
        }
        count++;
    });
    fileIdsForDelete.forEach((id, i) => {
        text += `<input type="hidden" name="fileIdsForDelete[${i}]" value="${id}">`;
    })

    $("#writeForm").append(text);
    $("#writeForm").submit();
});

/*파일 업로드 */
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

/*이미지 삭제*/
$("img.thumbnail").on("click", function(e){
    e.preventDefault();
    let i = $("img.thumbnail").index($(this));
    $upload.eq(i).val("");
    $thumbnail.eq(i).attr('src', "");

    if($thumbnail.eq(i).hasClass("original")){
        fileIdsForDelete.push($thumbnail.eq(i).data("id"));
    }
    $thumbnail.eq(i).removeClass("original");
});


