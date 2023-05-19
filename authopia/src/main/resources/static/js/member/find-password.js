const $email = $('input[name=memberEmail]');
const $div = $('div.page');

$email.on('blur', function () {
    if ($(this).val().length == 0) {
        $(this).parent().removeClass('border_black_opacity');
        $(this).parent().addClass('border_negative_active');
        $(this).parent().parent().next().removeClass('none');
        $(this).parent().parent().next().addClass('flex');
    } else {
        $(this).parent().removeClass('border_negative_active');
        $(this).parent().addClass('border_black_opacity');
        $(this).parent().parent().next().removeClass('flex');
        $(this).parent().parent().next().addClass('none');
    }
});

function send() {
    // $div.eq(0).addClass('none');
    // $div.eq(1).removeClass('none');
    document.findPassword.submit();
}
