// Watermark Position Module
var wPosition = (function () {

    // Module init
    function init() {
        console.log('[ wPosition works ... ]');

        var rangeOpacitySlider = $('.settings-block__slider'),
            rangeOpacityInput = $('#opacityInput'),
            watermark = $('.generator__box-watermark');

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

        // Change opacity with range slider
        rangeOpacitySlider.slider({
            min: 0,
            max: 100,
            value: 100,
            slide: function (event, ui) {
                rangeOpacityInput.val(ui.value);
                watermark.css('opacity', ui.value / 100);
            }
        });
    }

    // Event Listeners
    function _setUpListners() {
        // Init coordinates
        $('#watermark-file').on('change', function () {
            _initCoordinateValues();
        });

        // Position watermark on click by grid
        $('.input-group__input-radio').on('change', function () {
            _changePositionByClick(this);
        });
    }

    function _initCoordinateValues() {
        var positionXInput = $('#coordX'),
            positionYInput = $('#coordY'),
            watermark = $('.generator__box-watermark'),
            watermarkCoordinates = watermark.position();

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
        init: init
    };
})();