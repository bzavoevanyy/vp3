var uploadImages = (function () {

    // Module init
    var init = function () {
        console.log('[ uploadImages ... ]');

        var sourceInputSelector = '#source-file',
            sourceInputFake = '.input-group__fake-input.source',
            watermarkInputSelector = '#watermark-file',
            watermarkInputFake = '.input-group__fake-input.watermark';

        fileUpload(sourceInputSelector, sourceInputFake, true);
        fileUpload(watermarkInputSelector, watermarkInputFake, false);
    };

    function fileUpload(selector, fakeSelector, isSource) {
        var serverPath = 'server/',
            options = {
                url: serverPath + 'upload.php',
                type: 'POST',
                dataType: 'json',
                done: function (e, data) {
                    addFileName(fakeSelector, data.originalFiles[0].name);
                    isSource ?
                        showSourceImage(serverPath + data.result.filelink) :
                        showMarkImage(serverPath + data.result.filelink);
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
            k = 0,
            img = new Image(),
            sourceImage = $('.generator__box-source-image'),
            sourceWrapper = $('.generator__box-source');

        img.src = link;
        img.onload = function () {
            imgWidth = this.width;
            imgHeight = this.height;

            if (imgWidth >= imgHeight) {
                if (imgWidth >= 651) {
                    k = imgWidth / 651;
                    imgWidth = 651;
                    imgHeight = imgHeight / k;
                } else {
                    k = 651 / imgWidth;
                    imgWidth = 651;
                    imgHeight = imgHeight * k;
                }
            } else {
                if (imgHeight >= 534) {
                    k = imgHeight / 534;
                    imgHeight = 534;
                    imgWidth = imgWidth / k;
                } else {
                    k = 534 / imgHeight;
                    imgHeight = 534;
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
            watermarkImage = $('.generator__box-watermark-image'),
            watermarkWrapper = $('.generator__box-watermark');

        img.src = link;

        img.onload = function () {
            imgWidth = this.width;
            imgHeight = this.height;

            if (imgWidth >= imgHeight) {
                if (imgWidth >= 245) {
                    k = imgWidth / 245;
                    imgWidth = 245;
                    imgHeight = imgHeight / k;
                } else {
                    k = 245 / imgWidth;
                    imgWidth = 245;
                    imgHeight = imgHeight * k;
                }
            } else {
                if (imgHeight >= 245) {
                    k = imgHeight / 245;
                    imgHeight = 245;
                    imgWidth = imgWidth / k;
                } else {
                    k = 245 / imgHeight;
                    imgHeight = 245;
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

    return {
        init: init
    };

})();

