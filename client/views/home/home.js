var map;

Template.home.rendered = function() {
	// init(this.find(".wireframe-wrapper"));
	// animate();
	$('.wireframe-wrapper canvas').attr('data-stellar-ratio', 0.5);
	$('.s3').attr('data-stellar-background-ratio', 0.8);
	$('.s3').attr('data-stellar-vertical-offset', -400);
	$('.s5').attr('data-stellar-background-ratio', 0.8);
	$('.s5').attr('data-stellar-vertical-offset', -400);
	$('.process').attr('data-stellar-background-ratio', 0.8);
	$('.process').attr('data-stellar-vertical-offset', -400);
	$('.s7').attr('data-stellar-background-ratio', 0.8);
	$('.s7').attr('data-stellar-vertical-offset', -600);
	$.stellar();
	$(document).foundation();
	leaflet();
	$(document).foundation({
		tab: {
			callback: function(tab) {
				console.log(tab);
			}
		}
	});
	Tracker.autorun(function() {
    	var perc = Session.get("scrollPercentage");
	//    ga('send', 'event', 'ViewSite', 'Scroll', perc);
    	ga('send', 'pageview', "/Scroll"+perc);
	});
};




$('.color-picker').colorpicker('show');

Template.home.helpers({
	showNavBar: function() {
		if (!Session.get("navbar_visible")) {
			return "closed";
		}
	},
	webglAvailable: function() {
		try {
			var canvas = document.createElement('canvas');
			return !!(window.WebGLRenderingContext && (
				canvas.getContext('webgl') ||
				canvas.getContext('experimental-webgl')));
		} catch (e) {
			return false;
		}
	}
});

Template.home.events({
	'click .go-button': function() {
		$.scrollTo($('.s2'), 500, {
			offset: -49
		});
		$("[data-arrival=core]").addClass("active");
		// Session.set("navbar_visible", true);
	},
	'click [data-arrival]': function(event) {
		$.scrollTo($("[data-destination=" + $(event.currentTarget).data("arrival") + "]"), 500, {
			offset: -49
		});
		$("[data-arrival=core]").addClass("active");
	}

});


leaflet = function() {

	map = L.map('map', {
		scrollWheelZoom: false
			// zoomControl: false
	}).setView([51.84735, 5.868483], 17);
	L.Icon.Default.imagePath = 'packages/mrt_leaflet/images';

	L.marker([51.84735, 5.868483]).addTo(map)
		.bindPopup('<a href="https://www.google.nl/maps/place/Ridderstraat+27,+6511+TM+Nijmegen/@51.8473808,5.8682741,17z" target="_blank">Orikami</a>')
		.openPopup();
	L.tileLayer.provider('OpenStreetMap.HOT').addTo(map);
};


