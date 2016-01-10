// Watermark Position Module
var wPosition = (function () {

    // Module init
    function init() {
        console.log('[ wPosition works ... ]');

        // Set Up Listeners
        _setUpListners();

    }

    // Event Listeners
    function _setUpListners() {

        // Position watermark on click by grid
        $('.input-group__input').on('change', function(){
            _changePositionByClick(this);
        });
    }

    function _changePositionByClick(element){
        var label = $(element),
            currentId = label.attr('id'),
            grid = $('.generator__bg-grid'),
            gridPositionItem = grid.find("[data-position='" + currentId + "']"),
            watermark = $('.generator__watermark-wrap');

        watermark.stop(true, true).fadeOut(200).appendTo(gridPositionItem).stop(true, true).fadeIn(200);
    }

    // Public Methods
    return {
        init: init
    };
})();