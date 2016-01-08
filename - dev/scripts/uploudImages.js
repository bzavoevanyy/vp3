var uploudImages = (function () {

		// Инициализация модуля
	var init = function () {
		console.log('[ uploudImages ... ]');
		_setUpListners();
	};

		// прослушка событий...
	var _setUpListners = function () {

		var sendData = true,
				formWithFile = $("#form-add-files");
				
		$('#source-file').fileupload({
			url: 'add-project.php',
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

