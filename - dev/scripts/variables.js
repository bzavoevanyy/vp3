// All variables of project
var _var = (function () {
    return {
        sourceImage: {
            input: '#source-file',
            fakeInput: '.input-group__fake-input.source',
            wrap: '.generator__box-source',
            image: '.generator__box-source-image',
            maxWidth: 651,
            maxHeight: 534,
            currentWidth: 0,
            currentHeight: 0,
            k: 1
        },
        watermark: {
            input: '#watermark-file',
            fakeInput: '.input-group__fake-input.watermark',
            wrap: '.generator__box-watermark',
            image: '.generator__box-watermark-image',
            k: 1,
            currentWidth: 0,
            currentHeight: 0
        },
        opacity: {
            input: '#opacityInput',
            rangeElement: '.settings-block__slider'
        },
        buttons: {
            submit: '.settings-block__button_submit'
        },
        coordinates: {
            inputs: '.coords-settings__input',
            left: '#coordX',
            top: '#coordY',
            arrows: '.coords-settings__arrow'
        },
        position: {
            inputs: '.input-group__input-radio'
        }
    };
})();