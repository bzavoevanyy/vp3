var uploadImage = (function () {

    // Module init
    function init() {
        console.log('[ uploadImage works ... ]');
    }

    // File upload
    function fileUpload(selector, fakeSelector, isSourceImage, inputsForEnable) {
        var serverPath = 'server/',
            options = {
                url: serverPath + 'upload.php',
                type: 'POST',
                dataType: 'json',
                add: function(e, data) {
                    $('#circularG').show();
                    data.submit();
                },
                done: function (e, data) {
                    $('#circularG').hide();
                    if (data.result.status === 'success') {

                        // remove error div
                        var error = $(selector + '-error');
                        error ? error.remove() : '';


                        // add filename to fake input
                        addFileName(fakeSelector, data.originalFiles[0].name);

                        // show source and watermark image in box
                        if (isSourceImage) {
                            showSourceImage(serverPath + data.result.filename);
                            _var.sourceImage.filename = data.result.filename;
                            $('.generator__box').addClass('generator__box_filled');
                        } else {
                            showMarkImage(serverPath + data.result.filename);
                            _var.watermark.filename = data.result.filename;
                        }

                        // enable other inputs
                        if (inputsForEnable) enable.enableInputs(inputsForEnable);
                    } else {
                        // Generate error after fake input
                        var parent = $(fakeSelector).closest('.input-group');

                        $('<div>', {
                            id: selector.substr(1) + '-error',
                            text: data.result.message,
                            class: 'file-error'
                        }).appendTo(parent);
                    }
                },
                fail: function (e, data) {
                    console.log('error');
                }
            };

        $(selector).fileupload(options);
    }

    // Add filename to fake input
    function addFileName(element, filename) {
        $(element).text(filename);
    }

    // Show source image in the box
    function showSourceImage(link) {
        var imgWidth = 0,
            imgHeight = 0,
            maxWidth = _var.sourceImage.maxWidth,
            maxHeight = _var.sourceImage.maxHeight,
            k = 1,
            k1 = 1,
            k2 = 1,
            img = new Image(),
            sourceImage = $(_var.sourceImage.image),
            sourceWrapper = $(_var.sourceImage.wrap);

        img.src = link;
        img.onload = function () {
            imgWidth = this.width;
            imgHeight = this.height;

            if (imgWidth >= imgHeight) {
                if (imgWidth >= maxWidth) {
                    k1 = imgWidth / maxWidth;
                    imgWidth = maxWidth;
                    imgHeight = imgHeight / k1;
                }

                if (imgHeight >= maxHeight) {
                    k2 = imgHeight / maxHeight;
                    imgHeight = maxHeight;
                    imgWidth = imgWidth / k2;
                }

                k = k1 * k2;
            } else {
                if (imgHeight >= maxHeight) {
                    k1 = imgHeight / maxHeight;
                    imgHeight = maxHeight;
                    imgWidth = imgWidth / k1;
                }

                if (imgWidth >= maxWidth) {
                    k2 = imgWidth / maxWidth;
                    imgWidth = maxWidth;
                    imgHeight = imgHeight / k2;
                }

                k = k1 * k2;
            }

            k !== 1 ? _var.sourceImage.k = k : '';
            _var.sourceImage.currentWidth = imgWidth;
            _var.sourceImage.currentHeight = imgHeight;

            //console.log('imgWidth: ' + imgWidth + ' imgHeight: ' + imgHeight + ' k:' + _var.sourceImage.k);

            sourceWrapper.css({
                "width": imgWidth,
                "height": imgHeight
            });

            sourceImage
                .attr('src', link)
                .css({
                    "width": imgWidth,
                    "height": imgHeight
                });
        };
    }

    // Show watermark in the box
    function showMarkImage(link) {
        var imgWidth = 0,
            imgHeight = 0,
            k = 1,
            k1 = 1,
            k2 = 1,
            img = new Image(),
            maxWidth = _var.sourceImage.currentWidth,
            maxHeight = _var.sourceImage.currentHeight,
            sourceImageK = _var.sourceImage.k,
            watermarkImage = $(_var.watermark.image),
            watermarkWrapper = $(_var.watermark.wrap);

        img.src = link;

        img.onload = function () {
            imgWidth = this.width;
            imgHeight = this.height;

            imgWidth = imgWidth / sourceImageK;
            imgHeight = imgHeight / sourceImageK;
            $('.generator__box-watermark-image').show();
            if (imgWidth >= imgHeight) {
                if (imgWidth >= maxWidth) {
                    k1 = imgWidth / maxWidth;
                    imgWidth = maxWidth;
                    imgHeight = imgHeight / k1;
                }

                if (imgHeight >= maxHeight) {
                    k2 = imgHeight / maxHeight;
                    imgHeight = maxHeight;
                    imgWidth = imgWidth / k2;
                }

                k = k1 * k2;
            } else {
                if (imgHeight >= maxHeight) {
                    k1 = imgHeight / maxHeight;
                    imgHeight = maxHeight;
                    imgWidth = imgWidth / k1;
                }

                if (imgWidth >= maxWidth) {
                    k2 = imgWidth / maxWidth;
                    imgWidth = maxWidth;
                    imgHeight = imgHeight / k2;
                }

                k = k1 * k2;
            }

            k !== 1 ? _var.watermark.k = k : '';
            _var.watermark.currentWidth = imgWidth;
            _var.watermark.currentHeight = imgHeight;

            //console.log('imgWidth: ' + imgWidth + ' imgHeight: ' + imgHeight + ' k:' + _var.watermark.k);

            watermarkWrapper.css({
                "width": imgWidth,
                "height": imgHeight
            });

            watermarkImage
                .attr('src', link)
                .css({
                    "width": imgWidth,
                    "height": imgHeight
                });
        };
    }

    // Public methods
    return {
        init: init,
        fileUpload: fileUpload
    };

})();

