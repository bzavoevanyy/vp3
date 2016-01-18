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

        // Mode change
        $(_var.mode.buttons).on('click', function () {
            var currentButton = $(this),
                buttons = $(_var.mode.buttons),
                currentMode = currentButton.attr('id').split('-')[2],
                sourceImage = $(_var.sourceImage.wrap);


            _var.mode.current = currentMode;

            buttons.removeClass('place-button_active');
            currentButton.addClass('place-button_active');

            if (currentMode === 'tiling') {
                $(_var.watermark.tiling).fadeIn(200);
                $(_var.watermark.wrap).fadeOut(200);

                $(_var.watermark.tiling).empty();
                generateTilingBlock();

                $('.coords-settings__title').addClass('coords-settings__title_tiling');

                $('.settings-block__position-list').css('pointer-events', 'none');
                $('.settings-block__position-place').fadeIn(200);

                // Init draggable move watermark by mouse
                $(_var.watermark.tiling).draggable({
                    disabled: false,
                    drag: function (event, ui) {
                        showCoordinates();
                    },
                    containment: '.generator__box-tiling-wrap',
                    scroll: false
                });
            } else {
                $(_var.watermark.tiling).fadeOut(200);
                $(_var.watermark.wrap).fadeIn(200);

                $('.coords-settings__title').removeClass('coords-settings__title_tiling');

                $('.settings-block__position-list').css('pointer-events', 'auto');
                $('.settings-block__position-place').fadeOut(200);

                // Disable draggable move watermark by mouse
                $(_var.watermark.tiling).draggable({
                    disabled: true
                });
            }
        });
    }

    // Generate tiling
    function generateTilingBlock() {
        var maxWidth = _var.sourceImage.currentWidth,
            maxHeight = _var.sourceImage.currentHeight,
            watermarkWidth = _var.watermark.currentWidth,
            watermarkHeight = _var.watermark.currentHeight,
            tilingWrap = $(_var.watermark.tilingWrap),
            tilingBlock = $(_var.watermark.tiling),
            watermark = $(_var.watermark.image),
            clone = null,
            gutterLeft = 10,
            gutterBottom = 10,
            i = 0,
            l = 0,
            xWatermarkCount,
            yWatermarkCount;

        xWatermarkCount = Math.round(maxWidth / watermarkWidth) + 2;
        yWatermarkCount = Math.round(maxHeight / watermarkHeight) + 2;

        tilingBlock
            .width(xWatermarkCount * (watermarkWidth + gutterLeft))
            .height(yWatermarkCount * (watermarkHeight + gutterBottom));

        tilingWrap
            .width((xWatermarkCount + 0.5) * (watermarkWidth + gutterLeft))
            .height((yWatermarkCount + 0.5) * (watermarkHeight + gutterBottom))
            .css({
                'margin-left': -watermarkWidth,
                'margin-top': -watermarkHeight
            });

        for (i, l = xWatermarkCount * yWatermarkCount; i < l; i++) {
            clone = watermark.clone();

            clone.css({
                display: 'block',
                position: 'static',
                float: 'left',
                'margin-left': gutterLeft,
                'margin-bottom': gutterBottom
            });

            tilingBlock.append(clone);
        }
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