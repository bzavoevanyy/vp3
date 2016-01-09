;(function($) {

    $('#img1').fileupload({
        url: '/upload2.php',
        /*type: 'POST',*/
        dataType : 'json',
        previewThumbnail : false,
        singleFileUploads : true,

        done: function(e, data){
            $.each(data.result.files, function (index, file) {
                $('<p/>')
                    .text(file.name)
                    .appendTo('#files');
            });
            console.log(data.result);


            /*if (data.result.status == 'success') {
                console.log(data.result.status);
                console.log(data.result.message);
                console.log(data.result.filelink);

            } else {
                console.log(data.result.status);
                console.log(data.result.message);
            }*/
        },
        fail: function (e, data) {
            console.log('error');
        }
    })

})(window.jQuery);