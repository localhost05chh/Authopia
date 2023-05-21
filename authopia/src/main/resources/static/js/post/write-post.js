const $change = $(".change-button");
const $ablebutton = $("#ablebutton");
const $button = $(".button");

$change.on('keyup',function(){
    let $input = $("#input").val();
    let $textarea = $("#textarea").val();

    if($input.length > 0 && $textarea.length > 0){
        $ablebutton.attr('disabled', false);
    }
    if($input.length == 0 || $textarea.length == 0){
        $ablebutton.attr('disabled', true);
    }
})

$button.on('mouseover', function(event){
    $(event.target).css({
        'background-color' : '#f3f3f4'
    })
})

$button.on('mouseout', function(event){
    $(event.target).css({
        'background-color': '#ffffff'
    })
})