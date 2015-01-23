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
};


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
	}).setView([51.8430446, 5.8545186], 18);
	L.Icon.Default.imagePath = 'packages/mrt:leaflet/images';

	L.marker([51.8430446, 5.8545186]).addTo(map)
		.bindPopup('<a href="https://www.google.com/maps/place/Stationsplein+13-22/@51.8430123,5.8546816,17z/data=!3m1!4b1!4m2!3m1!1s0x47c70867ecc0e2f5:0x56bc05c153e07f6" target="_blank">Orikami</a>')
		.openPopup();
	L.tileLayer.provider('OpenStreetMap.HOT').addTo(map)
}