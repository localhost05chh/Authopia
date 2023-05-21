const $email = $("input[name=memberEmail]");
const $password = $("input[name=memberPassword]");
let loginCheck = ['false', 'false'];

/* 이메일 오류 */
$email.on("blur change keyup paste", function(){
    if ($(this).val().length == 0) {
        $(this).parent().removeClass('border_black_opacity');
        $(this).parent().addClass('border_negative_active');
        $(this).parent().parent().next().removeClass("none");
        $(this).parent().parent().next().addClass("flex");
        loginCheck[0] = false;

    }
    else{
        $(this).parent().removeClass('border_negative_active');
        $(this).parent().addClass('border_black_opacity');
        $(this).parent().parent().next().removeClass("flex");
        $(this).parent().parent().next().addClass("none");
        loginCheck[0] = true;
    }
})

function send(){
    $email.trigger("blur");
    $password.trigger("blur");

    if(loginCheck.filter(check => check).length != 2){
        alert("모두 기입하세요.")
        return;
    }

    document.login.submit();

}

/* 비밀번호 오류 */
$password.on("blur change keyup paste", function(){
    if ($(this).val().length == 0) {
        $(this).parent().removeClass('border_black_opacity');
        $(this).parent().addClass('border_negative_active');
        $(this).parent().parent().next().removeClass("none");
        $(this).parent().parent().next().addClass("flex");
        loginCheck[1] = false;
    }
    else{
        $(this).parent().removeClass('border_negative_active');
        $(this).parent().addClass('border_black_opacity');
        $(this).parent().parent().next().removeClass("flex");
        $(this).parent().parent().next().addClass("none");
        loginCheck[1] = true;
    }
})
