window.onload = function() {
	if ($('#content-model-viewer').length > 0) {
		
		// Track datastream downloads
		$("#overview-download-file").click(function() {
			var url = $("#datastream-download-form").attr('action');
			_gaq.push(['_trackPageview', url]);
		});
    
    	getStats();	
    }
};

function getStats() {
	var path = window.location.pathname;
	var pid = $('#pid').text();
	$.post(Drupal.settings.basePath + "viewer_analytics/fetch", { pid: pid, url: path },
	  function(data) {
		var response = eval("(" + data + ")");
		if (response['status'] == 'ok') {
			var stats = '<div id="statistics" class="overview-field"><h3>' + Drupal.t('Statistics') + '</h3></div>';
			$('#overview').append(stats);
			var views = Drupal.t('Times viewed') + ': ' + response['views'] + '</br>';
			if (response['downloads'] > 0) {
				var downloads = Drupal.t('Times downloaded') + ': ' + response['downloads'];
			}
			else {
				var downloads = '';
			}
			$('#statistics').append(views + downloads);
			if (response['analytics_link'] != null) {
				$('#statistics').append('</br><a href="' + response['analytics_link'] + '">' + Drupal.t('Detailed Analytics') + '</a>');
			}
		}
	});
}
