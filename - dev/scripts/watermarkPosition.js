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
        $(_var.position.inputs).on('change', function () {
            var $this = $(this),
                sourceImage = $(_var.sourceImage.wrap),
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
                currentId = $this.attr('id');

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
                newX = calcCoordinateByArrow(vector, coordinates.left) :
                newY = calcCoordinateByArrow(vector, coordinates.top);

            moveWatermark(newX, newY);
        });
    }

    // Calculate coordinate plus or minus after click by arrow
    function calcCoordinateByArrow(vector, coordinate){
        return vector === 'top' ? coordinate + 1 : coordinate - 1;
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