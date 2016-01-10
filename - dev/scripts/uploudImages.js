var uploudImages = (function () {

		// Инициализация модуля
	var init = function () {
		console.log('[ uploudImages ... ]');
		_setUpListners();
	};

		// прослушка событий...
	var _setUpListners = function () {

		var sendData = true,
				formWithFile = $("#form-upload");
				
		$('#fileupload').fileupload({
			url: 'upload.php',
			type: 'POST',
			dataType : 'json',
			autoUpload : false,
			add : function(e, data){
				formWithFile.on("submit",function(){
					if (formWithFile.valid()) {
						if(sendData){
							data.formData = formWithFile.serializeArray();
							sendData = false;
						}
						data.submit();
					} else {
						console.log('Не прошел валидацию!');
					}
				});
			},
			done: function(e, data){
				sendData = true;
				if (data.result.status == 'success') {
          $.each(data.result.files, function (index, file) {
              $('<p/>').text(file.name).appendTo('.input-group__fake-input');
          });					
					setTimeout("location.reload();", 1000);
				} else {
					console.log(data.result.text);
				}
			},
			fail: function (e, data) {
				console.log('error');
			}
		});

	}

	return {
		init: init
	};

})();

