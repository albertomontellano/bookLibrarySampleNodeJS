var app = app || {};
$(function() {
	$( '#releaseDate' ).datepicker();
	new app.AddListView();
	
	function status(message) {
		$('#status').text(message);
	}
	
	//code to upload image
	status('Please, choose a file.');
	
	// Check to see when a user has selected a file
	var timerId;
	timerId = setInterval(function() {
		if($('#userPhotoInput').val() !== '') {
			clearInterval(timerId);
			$('#uploadForm').submit();
		}
	}, 500);
	 
	$('#uploadForm').submit(function() {
		status('uploading the file ...');
		 
		$(this).ajaxSubmit({
			error: function(xhr) {
				status('Error: ' + xhr.status);
			},
			 
			success: function(response) {
			 
			if(response.error) {
				status('Opps, something bad happened');
				return;
			}
			 
			var imageUrlOnServer = response.path;
			console.log("imageUrlOnServer:");
			console.log(imageUrlOnServer);
			status('Success, file uploaded to:' + imageUrlOnServer);
			$('#coverImagePath').val(imageUrlOnServer);
			$('<img width=50px height=50px />').attr('src', imageUrlOnServer).appendTo($('#uploadedImage'));
			}
		});
		 
		// Have to stop the form from submitting and causing
		// a page refresh - don't forget this
		return false;
	});


	//end of code to upload image
	
	
});