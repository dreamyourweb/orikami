var blocklink = ['http://bestwebsitesawards.com/', 'buttons-for-website.com', 'semalt.semalt.com']; 
for (var b = blocklink.length; b--;) { 
	if (document.referrer.match(blocklink[b])) 
		window.location = "http://priceg.com/";
};