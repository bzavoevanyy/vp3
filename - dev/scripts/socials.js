var imageShare = (function () {

    function init() {
        $('.button__like').mouseenter(function() {
            $('.button__like').addClass('button__like_open');
            $('.social').stop();
            $('.social').show(200);

            $('.social').mouseleave(function() {
                $('.button__like').removeClass('button__like_open');
                $('.social').stop();
                $('.social').hide(200);
            });
        });
        $('.social__item_fb').on('click', function(e) {
            e.preventDefault();
            console.log('fb')
        });
        $('.social__item_tw').on('click', function(e) {
            e.preventDefault();
            console.log('tw')
        });
        $('.social__item_vk').on('click', function(e) {
            e.preventDefault();
            console.log('vk')
        });
    };

    return {
        init: init
    }
})();
