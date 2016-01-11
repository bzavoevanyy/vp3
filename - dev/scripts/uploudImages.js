var uploudImages = (function () {

		// Инициализация модуля
	var init = function () {
		console.log('[ uploudImages ... ]');
		_setUpListners();
	};

	var showSourceImage = function(link) {
		var imgWidth = 0,
			imgHeight = 0,
			k = 0;
		var img = new Image();
		img.onload = function() {
			imgWidth = this.width;
			imgHeight = this.height;
			if (imgWidth >= imgHeight) {
				if (imgWidth >= 651) {
					k = imgWidth / 651;
					imgWidth = 651;
					imgHeight = imgHeight / k;
				} else {
					k = 651 / imgWidth;
					imgWidth = 651;
					imgHeight = imgHeight * k;
				}
			} else {
				if (imgHeight >= 534) {
					k = imgHeight / 534;
					imgHeight = 534;
					imgWidth = imgWidth / k;
				} else {
					k = 534 / imgHeight ;
					imgHeight = 534;
					imgWidth = imgWidth * k;
				}
			}
			console.log(imgWidth, imgHeight, k);
			$('.img-source').attr('src',link);
			$('.generator__box-source').css({
				"width" : imgWidth,
				"height" : imgHeight
			});
			$('.img-source').css({
				"width" : imgWidth,
				"height" : imgHeight
			})
		};
		img.src = link;


	};

	var showMarkImage = function(link) {
		var imgWidth = 0,
			imgHeight = 0,
			k = 0;
		var img = new Image();
		img.onload = function() {
			imgWidth = this.width;
			imgHeight = this.height;
			if (imgWidth >= imgHeight) {
				if (imgWidth >= 245) {
					k = imgWidth / 245;
					imgWidth = 245;
					imgHeight = imgHeight / k;
				} else {
					k = 245 / imgWidth;
					imgWidth = 245;
					imgHeight = imgHeight * k;
				}
			} else {
				if (imgHeight >= 245) {
					k = imgHeight / 245;
					imgHeight = 245;
					imgWidth = imgWidth / k;
				} else {
					k = 245 / imgHeight ;
					imgHeight = 245;
					imgWidth = imgWidth * k;
				}
			}
			console.log(imgWidth, imgHeight, k);
			$('.img-watermark').attr('src',link);
			$('.generator__box-watermark').css({
				"width" : imgWidth,
				"height" : imgHeight
			});
			$('.img-watermark').css({
				"width" : imgWidth,
				"height" : imgHeight
			})
		};
		img.src = link;


	};

		// прослушка событий...
	var _setUpListners = function () {
				
		$('#source-file').fileupload({
			url: 'upload.php',
			type: 'POST',
			dataType : 'json',
			done: function(e, data){
				$('.source').html(data.originalFiles[0].name);
				showSourceImage(data.result.filelink);

				$('#mark-file').fileupload({
					url: 'upload.php',
					type: 'POST',
					dataType : 'json',
					done: function(e, data){
						$('.watermark').html(data.originalFiles[0].name);
						showMarkImage(data.result.filelink);
					},
					fail: function (e, data) {
						console.log('error');
					}
				});
			},
			fail: function (e, data) {
				console.log('error');
			}
		});


	};

	return {
		init: init
	};

})();

