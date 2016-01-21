var buttonActions = (function () {

    // Send data to server
    function sendData() {
        var form = $(_var.buttons.form);

        form.on('submit', function (e) {
            e.preventDefault();
            $('#circularG').show();
            var defObject,
                data = {
                    sourceImage: _var.sourceImage.filename,
                    watermark: _var.watermark.filename,
                    sourceK: _var.sourceImage.k,
                    watermarkK: _var.watermark.k,
                    opacity: $(_var.opacity.input).val() || 100,
                    x: $(_var.coordinates.left).val(),
                    y: $(_var.coordinates.top).val(),
                    mode: _var.mode.current,
                    gutterLeft: _var.watermark.gutterLeft,
                    gutterBottom: _var.watermark.gutterBottom,
                    top : _var.watermark.top,
                    left: _var.watermark.left
                };



            defObj = $.ajax({
                url: 'server/processing.php',
                type: 'POST',
                dataType: 'json',
                data: data
            });

            defObj
                .fail(function () {
                    console.log('server error');
                    $('#circularG').hide();
                })
                .done(function (answer) {
                    $('#circularG').hide();
                    $('.fake-link').attr("href",answer)[0].click();

                });

            return defObject;
        });
    }

    function resetForm() {
        var items = $('.settings-block__position-item');

        items.removeClass('settings-block__position-item_active');

        $(_var.watermark.wrap).css({
            'left': 0,
            'top': 0
        });
        $(_var.opacity.rangeElement).slider("value", 100);
        $(_var.watermark.wrap).css('opacity', 1);
        $(_var.watermark.tiling).css('opacity', 1);
    }

    function resetFormInit() {
        var resetButton = $(_var.buttons.reset);

        resetButton.on('click', function (e) {
            e.preventDefault();

            resetForm();
            if (_var.mode.current === 'tiling') {
                _var.watermark.gutterLeft = 10;
                _var.watermark.gutterBottom = 10;
                $(_var.watermark.tiling).css({
                    'top': 0,
                    'left': 0
                });
                $(_var.watermark.tiling).empty();
                wPosition.generateTilingBlock();
                $(_var.coordinates.left).val(_var.watermark.gutterLeft);
                $(_var.coordinates.top).val(_var.watermark.gutterBottom);
            } else {
                wPosition.showCoordinates();
            }
        });
    }

    return {
        sendData: sendData,
        resetForm: resetForm,
        resetFormInit: resetFormInit
    }

})();