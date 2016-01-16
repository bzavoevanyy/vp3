var enable = (function(){

    var enableInputs = function (selectors) {
        $.each(selectors, function (index, value) {
            $(value).prop('disabled', false);
        });
    };

    return {
      enableInputs: enableInputs
    }
})();