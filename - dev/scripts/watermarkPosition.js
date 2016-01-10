// Watermark Position Module
var wPosition = (function () {

    // Module init
    function init () {
        console.log('[ wPosition works ... ]');

        // Set Up Listeners
        _setUpListners();

    }

    // Event Listeners
    function _setUpListners () {

        // Position label click
        $('.position-label').on('click', function(){
            var $this = $(this),
                parent = $this.closest('.settings-block__position');

            console.log($this);
        });
    }

    // Public Methods
    return {
        init: init
    };
})();