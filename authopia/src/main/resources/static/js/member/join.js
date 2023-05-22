const $email = $('input[name=memberEmail]');
const $name = $('input[name=memberName]');
const $password = $('input[name=memberPassword]');
const $findPassword = $('input[name=findPassword]');
const $checkboxes = $('.term');
const $all = $('.all');
let joinCheck = ['false', 'false', 'false', 'false'];

/* 이메일 오류 */
$email.on('blur change keyup paste', function () {
    if ($(this).val().length == 0) {
        $(this).parent().removeClass('border_black_opacity');
        $(this).parent().addClass('border_negative_active');
        $(this).parent().next().removeClass('none');
        $(this).parent().next().addClass('flex');
        $("#warn-email").text("필수 항목입니다.");
        joinCheck[0] = false;
    } else {
        // 이메일 중복 검사
        $.ajax({
            url: `/member/check-email/${$(this).val()}`,
            success: function(result){
                if(result){
                    $email.parent().removeClass('border_black_opacity');
                    $email.parent().addClass('border_negative_active');
                    $email.parent().next().removeClass('none');
                    $email.parent().next().addClass('flex');
                    $("#warn-email").text("사용 중인 이메일입니다.");
                    joinCheck[0] = false;
                }else{
                    $email.parent().removeClass('border_negative_active');
                    $email.parent().addClass('border_black_opacity');
                    $email.parent().next().removeClass('flex');
                    $email.parent().next().addClass('none');
                    joinCheck[0] = true;
                }
            }
        });
    }
});

/* 이름오류 */
$name.on('blur change keyup paste', function () {
    if ($(this).val().length == 0) {
        $(this).parent().removeClass('border_black_opacity');
        $(this).parent().addClass('border_negative_active');
        $(this).parent().next().removeClass('none');
        $(this).parent().next().addClass('flex');
        joinCheck[1] = false;
    } else {
        $(this).parent().removeClass('border_negative_active');
        $(this).parent().addClass('border_black_opacity');
        $(this).parent().next().removeClass('flex');
        $(this).parent().next().addClass('none');
        joinCheck[1] = true;
    }
});

/* 비밀번호 오류 */
$password.on('blur change keyup paste', function () {
    if ($(this).val().length == 0) {
        $(this).parent().removeClass('border_black_opacity');
        $(this).parent().addClass('border_negative_active');
        $(this).parent().next().removeClass('none');
        $(this).parent().next().addClass('flex');
        joinCheck[2] = false;
    } else {
        $(this).parent().removeClass('border_negative_active');
        $(this).parent().addClass('border_black_opacity');
        $(this).parent().next().removeClass('flex');
        $(this).parent().next().addClass('none');
        joinCheck[2] = true;
    }
});

/* 비밀번호 동일 확인 */
$findPassword.on('blur change keyup paste', function () {
    if ($(this).val().length == 0) {
        $(this).parent().removeClass('border_black_opacity');
        $(this).parent().addClass('border_negative_active');
        $(this).parent().next().removeClass('none');
        $(this).parent().next().addClass('flex');
        $("#warn-password").text("필수 항목입니다.");
        joinCheck[3] = false;
    } else if ($(this).val() != $password.val()) {
        $(this).parent().removeClass('border_black_opacity');
        $(this).parent().addClass('border_negative_active');
        $(this).parent().next().removeClass('none');
        $(this).parent().next().addClass('flex');
        $("#warn-password").text("비밀번호가 일치하지 않습니다.");
        joinCheck[3] = false;
    } else {
        $(this).parent().removeClass('border_negative_active');
        $(this).parent().addClass('border_black_opacity');
        $(this).parent().next().removeClass('flex');
        $(this).parent().next().addClass('none');
        joinCheck[3] = true;
    }
});

/* 약관동의 */
$checkboxes.on('click', function () {
    if ($(this).is(':checked')) {
        $(this).next().removeClass('surface_primary');
        $(this).next().addClass('surface_accent');
    } else {
        $(this).next().removeClass('surface_accent');
        $(this).next().addClass('surface_primary');
    }
});

$all.click(function () {
    if ($(this).is(':checked')) {
        $(this).next().removeClass('surface_primary');
        $(this).next().addClass('surface_accent');
    } else {
        $(this).next().removeClass('surface_accent');
        $(this).next().addClass('surface_primary');
    }
    $checkboxes.each((i, checkbox) => {
        $(checkbox).prop('checked', $all.is(':checked'));
        if ($(checkbox).is(':checked')) {
            $(checkbox).next().removeClass('surface_primary');
            $(checkbox).next().addClass('surface_accent');
        } else {
            $(checkbox).next().removeClass('surface_accent');
            $(checkbox).next().addClass('surface_primary');
        }
    });
});

// 체크박스 중 한개라도 false일경우 전체동의 해제
$checkboxes.on('click', function () {
    $all.prop('checked', $checkboxes.filter(':checked').length == 5);
    if ($all.is(':checked')) {
        $all.next().removeClass('surface_primary');
        $all.next().addClass('surface_accent');
    } else {
        $all.next().removeClass('surface_accent');
        $all.next().addClass('surface_primary');
    }
});



function send(){
    $email.trigger("blur");
    $name.trigger("blur");
    $password.trigger("blur");
    $findPassword.trigger("blur");

    if(joinCheck.filter(check => check).length != 4){
        let modalMessage = "<span>모든 항목을 기입하셔야</span><span>회원가입이 완료됩니다!</span>";
        showWarnModal(modalMessage);
        return;
    }

    document.join.submit();
}