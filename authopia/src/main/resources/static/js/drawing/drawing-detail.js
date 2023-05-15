const $inputtext = $(".inputtext");
const $input = $(".input");
const $cancle = $(".cancle")
const $changecolor = $(".changcolor");
const $textinput = $("#text-count");
const $target = $("#target-button");

$inputtext.show();
$input.hide();

$inputtext.on('click', function(){
    $inputtext.hide();
    $input.show();
})

$cancle.on('click', function(){
    $input.hide();
    $inputtext.show();
    $textinput.val("");
})

$changecolor.on('focus', function(){
    $changecolor.css({
        'border' : '2px solid blue'
    });
})

$changecolor.on('blur', function(){
    $changecolor.css({
        'border' : '2px solid #e6e6e7',
    });
})

$textinput.keyup(function(e){
    var content = $(this).val();
    if(content.length > 0){
        $target.attr('disabled', false);
    }
    if(content.length == 0){
        $target.attr('disabled', true);
    }
})

$cancle.on('mouseover', function(event){
    $(event.target).css({
        'background-color' : '#f3f3f4'
    })
})

$cancle.on('mouseout', function(event){
    $(event.target).css({
        'background-color': '#ffffff'
    })
})
