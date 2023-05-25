let sizes = new Array();
$("#upload").on("change", function(){
    $("#attach").hide();
    $("#info").show();
    $("img.thumbnail").attr("src", "");
    sizes = new Array();
    let names = new Array();
    let formData = new FormData();
    let files = $(this)[0].files;

    $(files).each((i, file) => {
        sizes.push(file.size);
        names.push(file.name);
        formData.append("uploadFile", file);
    });

    $.ajax({
        url: "/files/upload",
        type: "post",
        data: formData,
        contentType: false,
        processData: false,
        success: function(uuids){
            $("#attach").show();
            $("#info").hide();

            let now = new Date();
            let year = now.getFullYear();
            let month = now.getMonth() + 1;
            let date = now.getDate();

            month = month < 10 ? "0" + month : month;
            date = date < 10 ? "0" + date : date;

            $("img.thumbnail").each((i, thumbnail) => {
                if(names[i]!=null){
                    let fileName = year + "/" + month + "/" + date + "/t_" + uuids[i] + "_" + names[i];
                    $(thumbnail).attr("src", `/files/display?fileName=${fileName}`);
                }
            })
        }
    })
});

$("button.ok-button").on("click", function(){
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
            <input type="hidden" name="messageFiles[${i}].filePath" value="${filePath}">
            <input type="hidden" name="messageFiles[${i}].fileUuid" value="${fileUuid}">
            <input type="hidden" name="messageFiles[${i}].fileName" value="${fileName}">
            <input type="hidden" name="messageFiles[${i}].fileSize" value="${fileSize}">
        `
    });
    $(writeForm).append(text);
    $(writeForm).submit();
});