function ouvre(fichier) {
	window.open(fichier, "popup", "width=700, height=500");
}

function ouvre(fichier, width, height) {
	window.open(fichier, "popup", "width=" + width + ", height=" + height + "");
}

function facebook_share(url) {
	ouvre('http://www.facebook.com/sharer.php?u=' + encodeURIComponent(url), 626, 436);
	return false;
}

function twitter_share(url) {
	ouvre('http://twitter.com/share?url=' + encodeURIComponent(url));
	return false;
}

function google_share(url) {
	ouvre('https://plus.google.com/share?url=' + encodeURIComponent(url));
	return false;
}

$(document).ready(function() {	
	//Enable facebook share
	$('[data-share=facebook]').bind('click', function() {
		var url = $(this).attr('data-url');
		return facebook_share(url);
	});
	
	//Enable google share
	$('[data-share=google]').bind('click', function() {
		var url = $(this).attr('data-url');
		return google_share(url);
	});
	
	//Enable twitter share
	$('[data-share=twitter]').bind('click', function() {
		var url = $(this).attr('data-url');
		return twitter_share(url);
	});
});
