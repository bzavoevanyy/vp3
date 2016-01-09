;(function($) {

    $('#img1').fileupload({
        url: '/upload.php',
        dataType : 'json',

        done: function(e, data){

            if (data.result.status == 'success') {
                console.log(data.result.status);
                console.log(data.result.message);
                console.log(data.result.filelink);

            } else {
                console.log(data.result.status);
                console.log(data.result.message);
            }
        },
        fail: function (e, data) {
            console.log('error');
        }
    })

})(window.jQuery);