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

        var site = 'https://www.addwater-mark.com',
            title = 'Watermark Generator',
            disc = 'This picture was make by watermark generator';

        $('.social__item_fb').on('click', function(e) {
            e.preventDefault();

            img = $('.fake-link').attr("href");

            if (img == undefined) img = '/img/sociallogo.png';
            fulllink = site + img;

            FB.ui(
                {
                    method: 'feed',
                    caption : 'Генератор водяных знаков',
                    picture: fulllink,
                    description : disc,
                    link : site,
                    name : title
                });

        });
        $('.social__item_tw').on('click', function(e) {
            e.preventDefault();

            var data = 'http://twitter.com/share?url=' + site + '&text=' + disc;
            console.log(data);
                window.open(data);

        });
        $('.social__item_vk').on('click', function(e) {
            e.preventDefault();

            var url = 'http://vkontakte.ru/share.php?',
                img = $('.fake-link').attr("href");

            if (img == undefined) img = '/img/sociallogo.png';

            imgLink = encodeURIComponent(site) + encodeURIComponent(img);

            var fullUrl = url + 'url=' + encodeURIComponent(site) + '&title=' + encodeURIComponent(title) + '&description=' + encodeURIComponent(disc) + '&image=' + imgLink;
            window.open(fullUrl);
        });
    };

    return {
        init: init
    }
})();
