// All variables of project
var _var = (function () {
    return {
        sourceImage: {
            section: '#settings-block-sourceImage',
            input: '#source-file',
            fakeInput: '.input-group__fileName-box.source',
            wrap: '.generator__box-source',
            image: '.generator__box-source-image',
            maxWidth: 651,
            maxHeight: 534,
            currentWidth: 0,
            currentHeight: 0,
            k: 1,
            filename : ''
        },
        watermark: {
            section: '#settings-block-watermark',
            input: '#watermark-file',
            fakeInput: '.input-group__fileName-box.watermark',
            wrap: '.generator__box-watermark',
            image: '.generator__box-watermark-image',
            k: 1,
            currentWidth: 0,
            currentHeight: 0,
            filename : ''
        },
        opacity: {
            section: '#settings-block-opacity',
            input: '#opacityInput',
            rangeElement: '.settings-block__slider'
        },
        buttons: {
            section: '#settings-block-buttons',
            form: '#form-upload',
            submit: '#download',
            reset: '#resetForm'
        },
        coordinates: {
            section: '#settings-block-position',
            inputs: '.settings-block__position-item-link',
            left: '#coordX',
            top: '#coordY',
            arrows: '.coords-settings__arrow'
        }
    };
})();