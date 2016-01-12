// Watermark Position Module
var wPosition = (function () {

    // Module init
    function init() {
        console.log('[ wPosition works ... ]');

        // Set Up Listeners
        //_setUpListners();

        //_initCoordinateValues();

        $('.generator__box-watermark').draggable({
            drag: function (event, ui) {
                _setCoordinateValues(ui.position.left, ui.position.top);
            },
            containment: '.generator__box-source',
            scroll: false
        });

    }

    // Event Listeners
    function _setUpListners() {

        // Position watermark on click by grid
        $('.input-group__input').on('change', function () {
            _changePositionByClick(this);
        });
    }

    function _initCoordinateValues() {
        var positionXInput = $('#coordX'),
            positionYInput = $('#coordY'),
            watermark = $('.generator__watermark-wrap'),
            watermarkParent = watermark.closest('.generator__bg-grid-item'),
            watermarkCoordinates = watermarkParent.offset();

        positionXInput.val(watermarkCoordinates.left);
        positionYInput.val(watermarkCoordinates.top);
    }

    function _setCoordinateValues(x, y) {
        var positionXInput = $('#coordX'),
            positionYInput = $('#coordY');

        positionXInput.val(x);
        positionYInput.val(y);
    }

    function _changePositionByClick(element) {
        var label = $(element),
            currentId = label.attr('id'),
            grid = $('.generator__bg-grid'),
            gridPositionItem = grid.find("[data-position='" + currentId + "']"),
            watermark = $('.generator__watermark-wrap'),
            watermarkParent = watermark.closest('.generator__bg-grid-item'),
            watermarkCoordinates = watermarkParent.offset();

        console.log(watermarkCoordinates);

        watermark
            .attr('style', '')
            .stop(true, true)
            .fadeOut(200)
            .appendTo(gridPositionItem)
            .stop(true, true)
            .fadeIn(200);
    }

    // Public Methods
    return {
        init: init
    };
})();