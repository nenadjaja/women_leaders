$(function() {
	$('[data-js=delete-row]').on('click', function(el) {
		var id = $(el.target).attr('data-id');
		$.ajax({
			type: 'GET',
			url: '/admin/delete/' + id,
			success: function() {
				console.log("ASFADF")
			},
			error: function() {
				console.log("qewrqwer")
			}

		});
	});
 console.log("TEST");
});