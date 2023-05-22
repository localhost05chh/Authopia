const $password = $('input[name=memberPassword]');
const $passwordCheck = $('input[name=password-check]');
let passwordCheck = false;
let newpasswordCheck = false;

/* 비밀번호 */
$password.on('blur change keyup paste', function () {
    if ($(this).val().length == 0) {
        $(this).parent().removeClass('border_black_opacity');
        $(this).parent().addClass('border_negative_active');
        $(this).parent().parent().next().removeClass('none');
        $(this).parent().parent().next().addClass('flex');
        passwordCheck = false;
    } else {
        $(this).parent().removeClass('border_negative_active');
        $(this).parent().addClass('border_black_opacity');
        $(this).parent().parent().next().removeClass('flex');
        $(this).parent().parent().next().addClass('none');
        passwordCheck = true;
    }
});

/* 비밀번호 동일 확인 */
$passwordCheck.on('blur change keyup paste', function () {
    if ($(this).val().length == 0) {
        $(this).parent().removeClass('border_black_opacity');
        $(this).parent().addClass('border_negative_active');
        $(this).parent().parent().next().removeClass('none');
        $(this).parent().parent().next().addClass('flex');
        $("#warn-password").text("필수 항목입니다.");
        newpasswordCheck = false;
    } else if ($(this).val() != $password.val()) {
        $(this).parent().removeClass('border_black_opacity');
        $(this).parent().addClass('border_negative_active');
        $(this).parent().parent().next().removeClass('none');
        $(this).parent().parent().next().addClass('flex');
        $("#warn-password").text("비밀번호가 일치하지 않습니다.");
        newpasswordCheck = false;
    } else {
        $(this).parent().removeClass('border_negative_active');
        $(this).parent().addClass('border_black_opacity');
        $(this).parent().parent().next().removeClass('flex');
        $(this).parent().parent().next().addClass('none');
        newpasswordCheck = true;
    }
});

function send(){
    $password.trigger("blur");
    $passwordCheck.trigger("blur");

    if(!newpasswordCheck || !passwordCheck){
        let modalMessage = "<span>비밀번호를 확인해주세요.</span>";
        showWarnModal(modalMessage);
        return;
    }

    document.passwordSetting.submit();
}