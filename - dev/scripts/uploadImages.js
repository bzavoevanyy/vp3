var uploadImages = (function () {

    // Module init
    var init = function () {
        console.log('[ uploadImages ... ]');

        var sourceInputSelector = '#source-file',
            sourceInputFake = '.input-group__fake-input.source',
            watermarkInputSelector = '#watermark-file',
            watermarkInputFake = '.input-group__fake-input.watermark',
            watermarkPositionInputs = '.input-group__input-radio',
            watermarkCoordInputs = '.coords-settings__input',
            watermarkOpacityInputs = '#opacityInput',
            submitButtonElement = '.settings-block__button_submit',
            watermarkControlInputs = [watermarkPositionInputs, watermarkCoordInputs, watermarkOpacityInputs, submitButtonElement];

        // File upload function on source image input
        fileUpload(sourceInputSelector, sourceInputFake, true, [watermarkInputSelector]);

        // File upload function on watermark input
        fileUpload(watermarkInputSelector, watermarkInputFake, false, watermarkControlInputs);
    };

    function fileUpload(selector, fakeSelector, isSource, inputsForEnable) {
        var serverPath = 'server/',
            options = {
                url: serverPath + 'upload.php',
                type: 'POST',
                dataType: 'json',
                done: function (e, data) {
                    if (data.result.status === 'success') {

                        // remove error div
                        var errors = $('.' + selector.substr(1) + '-error');
                        errors ? errors.remove() : '';

                        // add filename to fake input
                        addFileName(fakeSelector, data.originalFiles[0].name);

                        // show source and watermark image in box
                        isSource ?
                            showSourceImage(serverPath + data.result.filelink) :
                            showMarkImage(serverPath + data.result.filelink);

                        // enable other inputs
                        if (inputsForEnable) enableInputs(inputsForEnable);
                    } else {
                        // Generate error after fake input
                        var parent = $(fakeSelector).closest('.input-group');

                        $('<div>', {
                            id: selector + '-error',
                            text: data.result.message,
                            class: selector.substr(1) + '-error'
                        }).appendTo(parent);
                    }
                },
                fail: function (e, data) {
                    console.log('error');
                }
            };

        $(selector).fileupload(options);
    }

    function addFileName(element, filename) {
        $(element).text(filename);
    }

    function showSourceImage(link) {
        var imgWidth = 0,
            imgHeight = 0,
            maxWidth = 651,
            maxHeight = 534,
            k = 0,
            img = new Image(),
            sourceImage = $('.generator__box-source-image'),
            sourceWrapper = $('.generator__box-source');

        img.src = link;
        img.onload = function () {
            imgWidth = this.width;
            imgHeight = this.height;

            if (imgWidth >= imgHeight) {
                if (imgWidth >= maxWidth) {
                    k = imgWidth / maxWidth;
                    imgWidth = maxWidth;
                    imgHeight = imgHeight / k;
                } else {
                    k = maxWidth / imgWidth;
                    imgWidth = maxWidth;
                    imgHeight = imgHeight * k;
                }
            } else {
                if (imgHeight >= maxHeight) {
                    k = imgHeight / maxHeight;
                    imgHeight = maxHeight;
                    imgWidth = imgWidth / k;
                } else {
                    k = maxHeight / imgHeight;
                    imgHeight = maxHeight;
                    imgWidth = imgWidth * k;
                }
            }

            //console.log(imgWidth, imgHeight, k);

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

    function showMarkImage(link) {
        var imgWidth = 0,
            imgHeight = 0,
            k = 0,
            img = new Image(),
            sourceImage = $('.generator__box-source'),
            maxWidth = sourceImage.width() / 3,
            maxHeight = sourceImage.height() / 3,
            watermarkImage = $('.generator__box-watermark-image'),
            watermarkWrapper = $('.generator__box-watermark');

        img.src = link;

        img.onload = function () {
            imgWidth = this.width;
            imgHeight = this.height;

            if (imgWidth >= imgHeight) {
                if (imgWidth >= maxWidth) {
                    k = imgWidth / maxWidth;
                    imgWidth = maxWidth;
                    imgHeight = imgHeight / k;
                } else {
                    k = maxWidth / imgWidth;
                    imgWidth = maxWidth;
                    imgHeight = imgHeight * k;
                }
            } else {
                if (imgHeight >= maxHeight) {
                    k = imgHeight / maxHeight;
                    imgHeight = maxHeight;
                    imgWidth = imgWidth / k;
                } else {
                    k = maxHeight / imgHeight;
                    imgHeight = maxHeight;
                    imgWidth = imgWidth * k;
                }
            }

            //console.log(imgWidth, imgHeight, k);

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

    function enableInputs(selectors) {
        $.each(selectors, function (index, value) {
            $(value).prop('disabled', false);
        });
    }

    return {
        init: init
    };

})();

