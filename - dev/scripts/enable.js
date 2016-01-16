var enable = (function () {
    function enableInputs(selectors) {
        $.each(selectors, function (index, value) {
            $(value).prop('disabled', false);
        });
    }

    return {
        enableInputs: enableInputs
    }
})();