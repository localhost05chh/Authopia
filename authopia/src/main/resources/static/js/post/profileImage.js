/* 프로필 사진 */
if(memberProfileImage != null){
    $("img.profile-image").attr("src", `/files/display?fileName=${memberProfileImage.filePath}/t_${memberProfileImage.fileUuid}_${memberProfileImage.fileName}`);
} else {
    $("img.profile-image").attr("src", "/image/profile_icon.png");
}