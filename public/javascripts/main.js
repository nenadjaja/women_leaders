$(function() {
	$('[data-js=delete-row]').on('click', function(el) {
		window.location = "/admin/delete/" + $(el.target).attr('data-id');
	});
});