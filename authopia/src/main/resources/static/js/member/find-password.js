const $email = $('input[name=memberEmail]');
let emailCheck = false;

$email.on('blur change keyup paste', function () {
    if ($(this).val().length == 0) {
        $(this).parent().removeClass('border_black_opacity');
        $(this).parent().addClass('border_negative_active');
        $(this).parent().parent().next().removeClass('none');
        $(this).parent().parent().next().addClass('flex');
        $("#warn-email").text("필수 항목입니다.");
        emailCheck = false;
    } else {
        $.ajax({
            url: `/member/check-email/${$(this).val()}`,
            success: function(result){
                if(!result){
                    $email.parent().removeClass('border_black_opacity');
                    $email.parent().addClass('border_negative_active');
                    $email.parent().parent().next().removeClass('none');
                    $email.parent().parent().next().addClass('flex');
                    $("#warn-email").text("존재하지 않는 이메일입니다.");
                    emailCheck = false;
                }else{
                    $email.parent().removeClass('border_negative_active');
                    $email.parent().addClass('border_black_opacity');
                    $email.parent().parent().next().removeClass('flex');
                    $email.parent().parent().next().addClass('none');
                    emailCheck = true;
                }
            }
        });
    }
});

function send() {
    // $div.eq(0).addClass('none');
    // $div.eq(1).removeClass('none');
    $email.trigger("blur");

    if(!emailCheck){
        let modalMessage = "<span>이메일(아이디)을 확인해주세요.</span>";
        showWarnModal(modalMessage);
        return;
    }
    document.findPassword.submit();
}
