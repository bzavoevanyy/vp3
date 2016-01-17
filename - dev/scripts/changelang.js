var changeLang = (function () {

    var setUpLang = function(lang,i) {

            $('.generator__title').text(lang.title[i]);
            $('.settings__title').text(lang.settings[i]);
            $('.settings-block__title-source').text(lang.sourceInput[i]);
            $('.settings-block__title-watermark').text(lang.watermarkInput[i]);
            $('.settings-block__title_margin').text(lang.place[i]);
            $('.settings-block__title-transparency').text(lang.transparency[i]);
            $('.settings-block__button_reset').text(lang.reset[i]);
            $('.settings-block__button_submit').text(lang.Download[i]);
        };


    function init() {
        $.getJSON('js/languages.json', function (data) {

            $('.button__eng').on('click', function () {

                setUpLang(data.languages, 0);

            });
            $('.button__rus').on('click', function () {

                setUpLang(data.languages, 1);

            });
        });
    };
    return {
        init: init
    }
})();