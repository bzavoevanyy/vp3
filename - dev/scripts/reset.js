var reset = (function () {
    var init = function () {

        $('#resetForm').on('click', function(e) {
            e.preventDefault();
            $(_var.position.inputs+'#top-left').prop('checked', true);
            wPosition.moveWatermark(0,0);
            $(_var.opacity.rangeElement).slider("value", 100);
            $(_var.watermark.wrap).css('opacity', 100);
        });
    };

    return {
        init: init
    }
})();
