$(document).ready(function () {
    var watermarkControlInputs = [_var.opacity.section, _var.coordinates.section, _var.buttons.section];

    // File upload function on source image input
    uploadImage.fileUpload(_var.sourceImage.input, _var.sourceImage.fakeInput, true, [_var.watermark.section]);

    // File upload function on watermark input
    uploadImage.fileUpload(_var.watermark.input, _var.watermark.fakeInput, false, watermarkControlInputs);

    // Init opacity range
    opacityRange.init();

    // Init reset button
    buttonActions.resetFormInit();

    // Watermark Position Module init
    wPosition.init();

    // Send data to server
    buttonActions.sendData();

    // Init languages buttons
    changeLang.init();

    // Init share module
    imageShare.init();
});