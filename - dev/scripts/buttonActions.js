var buttonActions = (function () {

    // Send data to server
    function sendData() {
        var form = $(_var.buttons.form);

        form.on('submit', function (e) {
            e.preventDefault();

            var defObject,
                data = {
                    sourceImage: $(_var.sourceImage.fakeInput).text(),
                    watermark: $(_var.watermark.fakeInput).text(),
                    sourceK: _var.sourceImage.k,
                    watermarkK: _var.watermark.k,
                    opacity: $(_var.opacity.input).val(),
                    x: $(_var.coordinates.left).val(),
                    y: $(_var.coordinates.top).val()
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
                    console.log(answer);
                });

            return defObject;
        });
    }

    function resetForm() {
        console.log('reset form');
    }

    return {
        sendData: sendData,
        resetForm: resetForm
    }

})();