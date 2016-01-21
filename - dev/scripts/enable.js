var enable = (function () {
    function enableInputs(selectors) {
        $.each(selectors, function (index, value) {
            var $value = $(value),
                inputs = $value.find('input, button');

            $value.removeClass('settings-block_disabled');
            inputs.prop('disabled', false);
        });

    }

    return {
        enableInputs: enableInputs
    }
})();