// Watermark Position Module
var wPosition = (function () {

    // Module init
    function init() {
        console.log('[ wPosition works ... ]');

        var watermark = $('.generator__box-watermark');

        // Set Up Listeners
        _setUpListners();

        // Move watermark by mouse
        watermark.draggable({
            drag: function (event, ui) {
                _setCoordinateValues(ui.position.left, ui.position.top);
            },
            containment: '.generator__box-source',
            scroll: false
        });
    }

    // Event Listeners
    function _setUpListners() {
        // Init coordinates
        $('#watermark-file').on('change', function () {
            showCoordinates();
        });

        // Position watermark on click by grid
        $('.input-group__input-radio').on('change', function () {
            _changePositionByClick(this);
        });

        // Arrow up and down clicks
        $('.coords-settings__top').on('click', function () {
        });
    }

    // Show current coordinates of watermark in inputs
    function showCoordinates (){
        var watermarkCoordinates = $(_var.watermark.wrap).position();

        $(_var.coordinates.left).val(Math.round(watermarkCoordinates.left));
        $(_var.coordinates.top).val(Math.round(watermarkCoordinates.top));
    }

    function _setCoordinateValues(x, y) {
        var positionXInput = $('#coordX'),
            positionYInput = $('#coordY');

        positionXInput.val(Math.round(x));
        positionYInput.val(Math.round(y));
    }

    function _changePositionByClick(element) {
        var sourceImage = $('.generator__box-source-image'),
            sourceImageWidth = sourceImage.width(),
            sourceImageHeight = sourceImage.height(),
            coordinates = {
                'top-left': {
                    'top': 0,
                    'left': 0
                },
                'top-center': {
                    'top': 0,
                    'left': sourceImageWidth / 3
                },
                'top-right': {
                    'top': 0,
                    'left': sourceImageWidth * 2 / 3
                },
                'center-left': {
                    'top': sourceImageHeight / 3,
                    'left': 0
                },
                'center-center': {
                    'top': sourceImageHeight / 3,
                    'left': sourceImageWidth / 3
                },
                'center-right': {
                    'top': sourceImageHeight / 3,
                    'left': sourceImageWidth * 2 / 3
                },
                'bottom-left': {
                    'top': sourceImageHeight * 2 / 3,
                    'left': 0
                },
                'bottom-center': {
                    'top': sourceImageHeight * 2 / 3,
                    'left': sourceImageWidth / 3
                },
                'bottom-right': {
                    'top': sourceImageHeight * 2 / 3,
                    'left': sourceImageWidth * 2 / 3
                }
            },
            label = $(element),
            currentId = label.attr('id'),
            watermark = $('.generator__box-watermark');

        watermark.animate({
            'top': coordinates[currentId].top + 'px',
            'left': coordinates[currentId].left + 'px'
        }, 200);

        _setCoordinateValues(coordinates[currentId].left, coordinates[currentId].top);
    }

    // Public Methods
    return {
        init: init,
        showCoordinates: showCoordinates
    };
})();