
$(document).ready(function(){
    $('.watermark').draggable({drag:function(event,ui){
        $('.top').val(ui.position.top);
        $('.left').val(ui.position.left);

    }});
});