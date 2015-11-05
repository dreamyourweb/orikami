var blocklink = ['http://bestwebsitesawards.com/', 'http://buttons-for-website.com', 'http://semalt.semalt.com', "http://o-o-6-o-o.com", "http://humanorightswatch.org", "http://s.click.aliexpress.com"]; 
for (var b = blocklink.length; b--;) { 
	if (document.referrer.match(blocklink[b])) 
		window.location = "http://priceg.com/";
};