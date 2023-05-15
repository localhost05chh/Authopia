const $email = $('input[name=email]');
const $name = $('input[name=name]');
const $password = $('input[name=password]');
const $findPassword = $('input[name=findPassword]');
const $checkboxes = $('.term');
const $all = $('.all');

/* 이메일 오류 */
$email.on('blur', function () {
    if ($(this).val().length == 0) {
        $(this).parent().removeClass('border_black_opacity');
        $(this).parent().addClass('border_negative_active');
        $(this).parent().next().removeClass('none');
        $(this).parent().next().addClass('flex');
    } else {
        $(this).parent().removeClass('border_negative_active');
        $(this).parent().addClass('border_black_opacity');
        $(this).parent().next().removeClass('flex');
        $(this).parent().next().addClass('none');
    }
});

/* 이름오류 */
$name.on('blur', function () {
    if ($(this).val().length == 0) {
        $(this).parent().removeClass('border_black_opacity');
        $(this).parent().addClass('border_negative_active');
        $(this).parent().next().removeClass('none');
        $(this).parent().next().addClass('flex');
    } else {
        $(this).parent().removeClass('border_negative_active');
        $(this).parent().addClass('border_black_opacity');
        $(this).parent().next().removeClass('flex');
        $(this).parent().next().addClass('none');
    }
});

/* 비밀번호 오류 */
$password.on('blur', function () {
    if ($(this).val().length == 0) {
        $(this).parent().removeClass('border_black_opacity');
        $(this).parent().addClass('border_negative_active');
        $(this).parent().next().removeClass('none');
        $(this).parent().next().addClass('flex');
    } else {
        $(this).parent().removeClass('border_negative_active');
        $(this).parent().addClass('border_black_opacity');
        $(this).parent().next().removeClass('flex');
        $(this).parent().next().addClass('none');
    }
});

/* 비밀번호 동일 확인 */
$findPassword.on('blur', function () {
    if ($(this).val() != $password.val()) {
        $(this).parent().removeClass('border_black_opacity');
        $(this).parent().addClass('border_negative_active');
        $(this).parent().next().removeClass('none');
        $(this).parent().next().addClass('flex');
    } else {
        $(this).parent().removeClass('border_negative_active');
        $(this).parent().addClass('border_black_opacity');
        $(this).parent().next().removeClass('flex');
        $(this).parent().next().addClass('none');
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
