var opacityRange = (function () {

    // Change opacity with range slider
    function init() {
        $(_var.opacity.rangeElement).slider({
            min: 0,
            max: 100,
            value: 100,
            slide: function (event, ui) {
                $(_var.opacity.input).val(ui.value);
                $(_var.watermark.wrap).css('opacity', ui.value / 100);
                $(_var.watermark.tiling).css('opacity', ui.value / 100);
            }
        });
    }

    return {
        init: init
    }
})();