var buttonActions = (function () {

    // Send data to server
    function sendData() {
        var form = $(_var.buttons.form);

        form.on('submit', function (e) {
            e.preventDefault();

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

            console.log(data);

            defObj = $.ajax({
                url: 'server/processing.php',
                type: 'POST',
                dataType: 'json',
                data: data
            });

            defObj
                .fail(function () {
                    console.log('server error');
                })
                .done(function (answer) {

                    $('.fake-link').attr("href",answer)[0].click();

                });

            return defObject;
        });
    }

    function resetForm() {
        var items = $('.settings-block__position-item');

        items.removeClass('settings-block__position-item_active');

        wPosition.moveWatermark(0, 0);
        $(_var.opacity.rangeElement).slider("value", 100);
        $(_var.watermark.wrap).css('opacity', 100);
    }

    function resetFormInit() {
        var resetButton = $(_var.buttons.reset);

        resetButton.on('click', function (e) {
            e.preventDefault();

            resetForm();
        });
    }

    return {
        sendData: sendData,
        resetForm: resetForm,
        resetFormInit: resetFormInit
    }

})();