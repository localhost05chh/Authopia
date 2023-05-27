const $naver = document.getElementById('naverpay');
const $credit = document.getElementById('creditcard');
const $naverbutton = document.getElementById('naver');
const $creditbutton = document.getElementById('credit');
// const $card = $("#card");
const $top = document.getElementById('top-button');
const $topshape = document.getElementById('top-button-shape');
const $bottom = document.getElementById('bottom-button');
const $bottomshape = document.getElementById('buttom-button-shape');
const $able = $(".able");
let count = 0;
let counttop = 0;
let countbottom = 0;

// $card.hide();
//
// $naver.addEventListener('click', function(){
//     $naver.classList.replace('border_active', 'border_accent_active');
//     $credit.classList.replace('border_accent_active', 'border_active');
//     $naverbutton.classList.replace('hidden', 'content_accent_active');
//     $creditbutton.classList.replace('content_accent_active', 'hidden');
//     $card.hide();
//     if(count == 0){
//         count++;
//     }else if(count != 0){
//         count = count;
//     }
//     change();
// })
//
// $credit.addEventListener('click', function(){
//     $credit.classList.replace('border_active', 'border_accent_active');
//     $naver.classList.replace('border_accent_active', 'border_active');
//     $creditbutton.classList.replace('hidden', 'content_accent_active');
//     $naverbutton.classList.replace('content_accent_active', 'hidden');
//     $card.show();
//     if(count == 0){
//         count++;
//     }else if(count != 0){
//         count = count;
//     }
//     change();
// })

$top.addEventListener('click', function(){
    counttop++;
    if(counttop % 2 == 1){
        $top.classList.remove('border' ,'border_active' ,'surface_primary');
        $top.classList.add('surface_accent');
        $topshape.classList.replace('content_quaternary_inverse', 'content_primary_inverse');
        count++;
        change();
    }else if(counttop % 2 == 0){
        $top.classList.remove('surface_accent');
        $top.classList.add('border' ,'border_active' ,'surface_primary');
        $topshape.classList.replace('content_primary_inverse', 'content_quaternary_inverse');
        count--;
        change();
    }
})

$bottom.addEventListener('click', function(){
    countbottom++;
    if(countbottom % 2 == 1){
        $bottom.classList.remove('border' ,'border_active' ,'surface_primary');
        $bottom.classList.add('surface_accent');
        $bottomshape.classList.replace('content_quaternary_inverse', 'content_primary_inverse');
        count++;
        change();
    }else if(countbottom % 2 == 0){
        $bottom.classList.remove('surface_accent');
        $bottom.classList.add('border' ,'border_active' ,'surface_primary');
        $bottomshape.classList.replace('content_primary_inverse', 'content_quaternary_inverse');
        count--;
        change();
    }
})

function change(){
    if(count >= 2){
        $able.attr('disabled',false);
        $able.text("맴버십 가입하기");
    }else{
        $able.attr('disabled',true);
        $able.text("모든 정보를 확인해주세요.");
    }

}