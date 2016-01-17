// Watermark Position Module
var wPosition = (function () {

    // Module init
    function init() {
        console.log('[ wPosition works ... ]');

        // Set Up Listeners
        _setUpListners();

        // Init draggable move watermark by mouse
        $(_var.watermark.wrap).draggable({
            drag: function (event, ui) {
                showCoordinates();
            },
            containment: _var.sourceImage.wrap,
            scroll: false
        });
    }

    // Event Listeners
    function _setUpListners() {
        // Init coordinates
        $(_var.watermark.input).on('change', function () {
            showCoordinates();
        });

        // Position watermark on click by grid
        $(_var.coordinates.inputs).on('click', function (e) {
            e.preventDefault();

            var $this = $(this),
                currentItem = $this.closest('.settings-block__position-item'),
                parent = $this.closest('.settings-block__position-list'),
                items = parent.find('.settings-block__position-item'),
                sourceImageWidth = _var.sourceImage.currentWidth,
                sourceImageHeight = _var.sourceImage.currentHeight,
                watermarkWidth = _var.watermark.currentWidth,
                watermarkHeight = _var.watermark.currentHeight,
                coordinates = {
                    'top-left': {
                        'top': 0,
                        'left': 0
                    },
                    'top-center': {
                        'top': 0,
                        'left': sourceImageWidth / 2 - watermarkWidth / 2
                    },
                    'top-right': {
                        'top': 0,
                        'left': sourceImageWidth - watermarkWidth
                    },
                    'center-left': {
                        'top': sourceImageHeight / 2 - watermarkHeight / 2,
                        'left': 0
                    },
                    'center-center': {
                        'top': sourceImageHeight / 2 - watermarkHeight / 2,
                        'left': sourceImageWidth / 2 - watermarkWidth / 2
                    },
                    'center-right': {
                        'top': sourceImageHeight / 2 - watermarkHeight / 2,
                        'left': sourceImageWidth - watermarkWidth
                    },
                    'bottom-left': {
                        'top': sourceImageHeight - watermarkHeight,
                        'left': 0
                    },
                    'bottom-center': {
                        'top': sourceImageHeight - watermarkHeight,
                        'left': sourceImageWidth / 2 - watermarkWidth / 2
                    },
                    'bottom-right': {
                        'top': sourceImageHeight - watermarkHeight,
                        'left': sourceImageWidth - watermarkWidth
                    }
                },
                currentId = $this.attr('id');

            items.removeClass('settings-block__position-item_active');
            currentItem.addClass('settings-block__position-item_active');

            moveWatermark(coordinates[currentId].left, coordinates[currentId].top);
        });

        // Arrow click
        $(_var.coordinates.arrows).on('click', function () {
            var $this = $(this),
                coordinates = getCoordinates(),
                axis = $this.data('axis'),
                vector = $this.data('vector'),
                newX = coordinates.left,
                newY = coordinates.top;

            axis === 'x' ?
                newX = calcCoordinateByArrow(axis, vector, coordinates.left, _var.watermark.currentWidth) :
                newY = calcCoordinateByArrow(axis, vector, coordinates.top, _var.watermark.currentHeight);

            moveWatermark(newX, newY);
        });
    }

    // Calculate coordinate plus or minus after click by arrow
    function calcCoordinateByArrow(axis, vector, coordinate, size) {
        var axisMax,
            axisMin = 0;

        axis === 'x' ?
            axisMax = _var.sourceImage.currentWidth :
            axisMax = _var.sourceImage.currentHeight;

        return vector === 'top' ? checkLimit('max', coordinate + 1, axisMax, size) : checkLimit('min', coordinate - 1, axisMin);
    }

    // Limit function
    function checkLimit(type, value, limit, size) {
        var result;

        type === 'max' ?
            result = (( (value + size) <= limit) ? value : (limit - size)) :
            result = (value >= limit) ? value : limit;

        return result;
    }

    // Move watermark to x , y
    function moveWatermark(x, y) {
        $(_var.watermark.wrap).animate({
            'left': x + 'px',
            'top': y + 'px'
        }, 200, showCoordinates);
    }

    // Show current coordinates of watermark in inputs
    function showCoordinates() {
        var watermarkCoordinates = $(_var.watermark.wrap).position();

        $(_var.coordinates.left).val(Math.round(watermarkCoordinates.left));
        $(_var.coordinates.top).val(Math.round(watermarkCoordinates.top));
    }

    // Get current watermark coordinates
    function getCoordinates() {
        return $(_var.watermark.wrap).position();
    }

    // Public Methods
    return {
        init: init,
        showCoordinates: showCoordinates,
        moveWatermark: moveWatermark,
        getCoordinates: getCoordinates
    };
})();