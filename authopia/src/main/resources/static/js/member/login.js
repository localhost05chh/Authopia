const $email = $("input[name=email]");
const $password = $("input[name=password]");

/* 이메일 오류 */
$email.on("blur", function(){
    if ($(this).val().length == 0) {
        $(this).parent().removeClass('border_black_opacity');
        $(this).parent().addClass('border_negative_active');
        $(this).parent().parent().next().removeClass("none");
        $(this).parent().parent().next().addClass("flex");

    }
    else{
        $(this).parent().removeClass('border_negative_active');
        $(this).parent().addClass('border_black_opacity');
        $(this).parent().parent().next().removeClass("flex");
        $(this).parent().parent().next().addClass("none");
    }
})

/* 비밀번호 오류 */
$password.on("blur", function(){
    if ($(this).val().length == 0) {
        $(this).parent().removeClass('border_black_opacity');
        $(this).parent().addClass('border_negative_active');
        $(this).parent().parent().next().removeClass("none");
        $(this).parent().parent().next().addClass("flex");

    }
    else{
        $(this).parent().removeClass('border_negative_active');
        $(this).parent().addClass('border_black_opacity');
        $(this).parent().parent().next().removeClass("flex");
        $(this).parent().parent().next().addClass("none");
    }
})
