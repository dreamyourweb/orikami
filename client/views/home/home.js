var map;

Template.home.rendered = function (){
	// init(this.find(".wireframe-wrapper"));
	// animate();
	$('.wireframe-wrapper canvas').attr('data-stellar-ratio', 0.5);
	$('.s3').attr('data-stellar-background-ratio', 0.8);
	$('.s3').attr('data-stellar-vertical-offset', -400);
	$('.s5').attr('data-stellar-background-ratio', 0.8);
	$('.s5').attr('data-stellar-vertical-offset', -400);
	$('.s7').attr('data-stellar-background-ratio', 0.8);
	$('.s7').attr('data-stellar-vertical-offset', -600);
  $.stellar();
  $(document).foundation();
  leaflet();
}


Template.home.helpers({
	showNavBar: function(){
		if ( !Session.get("navbar_visible")){
			return "closed"
		}
	}
})

Template.home.events({
	'click .go-button': function(){
		$.scrollTo( $('.s2'), 500, {
			offset:-49
		});
		$("[data-arrival=core]").addClass("active");
		// Session.set("navbar_visible", true);
	},
	'click [data-arrival]': function(event){
		$.scrollTo($("[data-destination=" + $(event.currentTarget).data("arrival") + "]"), 500, {offset: -49});
		$("[data-arrival=core]").addClass("active");
	}

});


// var container, stats;
// var camera, scene, renderer, particles, geometry, materials = [], parameters, i, h, w, color, velocities, polygons, pointLight, initial_z=[];
// var mouseX = 0, mouseY = 0;

// var windowHalfX = $('.wireframe-wrapper').width() / 2;
// var windowHalfY = window.innerHeight / 2;
// var clock = new THREE.Clock;

// function init(element) {
// 	scene = new THREE.Scene();
// 	camera = new THREE.PerspectiveCamera( 75, $('.wireframe-wrapper').width() / window.innerHeight, 0.1, 1000 );

// 	pointLight = new THREE.PointLight( 0xffffff, 1 );
// 	pointLight.position.z = 100;
// 	scene.add( pointLight );
// 	renderer = new THREE.CanvasRenderer({antialias: true});
// 	renderer.setSize( $('.wireframe-wrapper').width(), window.innerHeight );

// 	element.appendChild( renderer.domElement );

// 	w = 16 * 1.5;
// 	h = 9 * 1.5;

// 	geometry = new THREE.Geometry();
// 	lines_geometry = new THREE.Geometry();
// 	velocities = [];
// 	vertices = [];
// 	geometry.inits = [];
// 	for (var i = 0; i < 200; i++) {
// 		vert = new THREE.Vector3( w * Math.random() - w/2, h * Math.random() - h/2, 0)
// 		geometry.vertices.push(vert);

// 		geometry.inits.push({z: vert.z, speed: Math.random()});
// 		vertices.push([vert.x,vert.y])
// 		velocities.push( new THREE.Vector3( 2 * Math.random() - 1, 2 *  Math.random() - 1, 0) );
// 	}

// 	var triangles = Delaunay.triangulate(vertices);
// 	for (var i = 0; i < triangles.length; i+=3) {

// 		color = new THREE.Color();
// 		// 0.525 0.2
// 		color.setHSL(0.549, 0.76, 0.9 + 0.1*Math.random());

// 		geometry.faces.push( new THREE.Face3( triangles[i+2], triangles[i+1], triangles[i] , new THREE.Vector3(0,0,1), color ));
// 	}

// 	geometry.colorsNeedUpdate = true;
// 	geometry.computeLineDistances();
// 	geometry.computeFaceNormals();
// 	console.log(JSON.stringify(geometry.lineDistances));

// 	color = new THREE.Color();
// 	color.setHSL(0.549, 0.76, 0.8);

// 	wireframeMaterial = new THREE.MeshBasicMaterial( {color: color, wireframe: true} );
// 	polygonMaterial = new THREE.MeshLambertMaterial({shading: THREE.FlatShading, vertexColors: THREE.FaceColors});
// 	polygons = new THREE.Mesh( geometry, polygonMaterial );
// 	wireframe = new THREE.Mesh( geometry, wireframeMaterial );
// 	wireframe.position.z += 0.01;
// 	scene.add(polygons);

// 	camera.position.z = 5;
// 	window.addEventListener( 'resize', onWindowResize, false );
// 	clock.start();
// 	renderer.render(scene, camera);
// }


// function render() {
// 	polygons.geometry.verticesNeedUpdate = true;
// 	renderer.render(scene, camera);
// }

// function animate() {

// 	requestAnimationFrame( animate );

// 	render();

// }

// function onWindowResize() {

// 	camera.aspect = $('.wireframe-wrapper').width() / window.innerHeight;
// 	camera.updateProjectionMatrix();

// 	renderer.setSize( $('.wireframe-wrapper').width(), window.innerHeight );
// 	// $('.wireframe-wrapper canvas').parallax({ "coeff":0.5});
// 	render();
// 	map.invalidateSize(true);

// }


leaflet = function (){

	map = L.map('map',{
		scrollWheelZoom: false
		// zoomControl: false
	}).setView([51.8430446,5.8545186], 18);
	L.Icon.Default.imagePath = 'packages/leaflet/images';

	L.marker([51.8430446,5.8545186]).addTo(map)
	    .bindPopup('<a href="https://www.google.com/maps/place/Stationsplein+13-22/@51.8430123,5.8546816,17z/data=!3m1!4b1!4m2!3m1!1s0x47c70867ecc0e2f5:0x56bc05c153e07f6" target="_blank">Orikami</a>')
	    .openPopup();
	L.tileLayer.provider('OpenStreetMap.HOT').addTo(map)
}