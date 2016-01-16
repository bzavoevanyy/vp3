$(document).ready(function () {
    var watermarkControlInputs = [_var.position.inputs, _var.coordinates.inputs, _var.opacity.Input, _var.buttons.submit];

    // File upload function on source image input
    uploadImage.fileUpload(_var.sourceImage.input, _var.sourceImage.fakeInput, true, [_var.watermark.input]);

    // File upload function on watermark input
    uploadImage.fileUpload(_var.watermark.input, _var.watermark.fakeInput, false, watermarkControlInputs);

    // Init opacity range
    opacityRange.init();

    // Watermark Position Module init
    wPosition.init();
    reset.init();
});