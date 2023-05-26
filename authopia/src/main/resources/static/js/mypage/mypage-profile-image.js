$spanProfile = $("span.input-profile-image");
$buttonProfile = $("button.input-profile-image");
let text1 = "";
let text2 = "";
if(memberProfileImage != null){
    text1 += `<img alt="프로필 이미지" sizes="100vw" src="/files/display?fileName=${memberProfileImage.filePath}/t_${memberProfileImage.fileUuid}_${memberProfileImage.fileName}" class="profile-image rounded-full" style="position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%; object-fit: cover; object-position: center center;">`;
    text2 += `<img alt="프로필 이미지" sizes="100vw" src="/files/display?fileName=${memberProfileImage.filePath}/${memberProfileImage.fileUuid}_${memberProfileImage.fileName}" class="profile-image rounded-full" style="position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%; object-fit: cover; object-position: center center;">`;
} else {
    text1 += `<img alt="프로필 이미지" sizes="100vw" src="/image/profile_icon.png" class="rounded-full" style="position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%; object-fit: cover; object-position: center center;">`;
    text2 += `<img alt="프로필 이미지" sizes="100vw" src="/image/profile_icon.png" class="profile-image rounded-full" style="position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%; object-fit: cover; object-position: center center;">`;
}

$spanProfile.html(text1);
$buttonProfile.html(text2);
