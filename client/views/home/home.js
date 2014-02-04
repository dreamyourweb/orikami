Template.home.rendered = function (){
	init(this.find(".wireframe-wrapper"));
	animate();
}

Template.goButton.events({
	'click button': function(){
		$.scrollTo( $('.section-2'), 500);
	}
});

var container, stats;
var camera, scene, renderer, particles, geometry, materials = [], parameters, i, h, w, color, velocities, lines_geometry;
var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var clock = new THREE.Clock;

function init(element) {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize( window.innerWidth, window.innerHeight );

	element.appendChild( renderer.domElement );

	w = 16;
	h = 9;

	geometry = new THREE.Geometry();
	lines_geometry = new THREE.Geometry();
	velocities = [];
	for (var i = 100; i >= 0; i--) {
		geometry.vertices.push( new THREE.Vector3( w * Math.random() - w/2, h * Math.random() - h/2, 0) );
		velocities.push( new THREE.Vector3( 2 * Math.random() - 1, 2 *  Math.random() - 1, 0) );
	}
	window.g = geometry;
	window.v = velocities;

	material = new THREE.ParticleBasicMaterial( { color: 0x000000, size: 5 } );
	particles = new THREE.ParticleSystem( geometry, material );

	line_material = new THREE.LineBasicMaterial( {vertexColors: THREE.VertexColors, linewidth: 5} );
	lines = new THREE.Line( lines_geometry, line_material, THREE.LinePieces );
	// scene.add( particles );
	scene.add( lines);

	camera.position.z = 5;
	window.addEventListener( 'resize', onWindowResize, false );
	clock.start();
}


function render() {
	var delta = clock.getDelta() * 1000;
	for (var i = particles.geometry.vertices.length - 1; i >= 0; i--) {
		particles.geometry.vertices[i].x += velocities[i].x / (1000 * (16.6666666 / delta));
		particles.geometry.vertices[i].y += velocities[i].y / (1000 * (16.6666666 / delta));
		if (particles.geometry.vertices[i].x > w/2) { particles.geometry.vertices[i].x -= w }
		if (particles.geometry.vertices[i].x < -w/2) { particles.geometry.vertices[i].x += w }
		if (particles.geometry.vertices[i].y > h/2) { particles.geometry.vertices[i].y -= h }
		if (particles.geometry.vertices[i].y < -h/2) { particles.geometry.vertices[i].y += h }
	}

	lines.geometry.vertices = [];
	lines.geometry.colors = [];
	
	for (var i = particles.geometry.vertices.length - 1; i >= 0; i--) {
		for (var j = particles.geometry.vertices.length - 1; j >= 0; j--) {
			// if (particles.geometry.vertices[i].length() < 4 && 
			// 		particles.geometry.vertices[j].length() < 4){

				distance = particles.geometry.vertices[i].distanceTo(particles.geometry.vertices[j]);
				if (distance < h/5){
					lines.geometry.vertices.push(new THREE.Vector3( particles.geometry.vertices[i].x, particles.geometry.vertices[i].y, particles.geometry.vertices[i].z ));
					lines.geometry.vertices.push(new THREE.Vector3( particles.geometry.vertices[j].x, particles.geometry.vertices[j].y, particles.geometry.vertices[j].z ));				
					color = new THREE.Color();
					color.setHSL(0.549, 0.76, 0.525 + ( 0.475 * (1 - distance/(h/5)))  );
					lines.geometry.colors.push(color);
					lines.geometry.colors.push(color);
				}
			// }
		};
	};	

	particles.geometry.verticesNeedUpdate = true;
	lines.geometry.verticesNeedUpdate = true;
	lines.geometry.colorsNeedUpdate = true;
	renderer.render(scene, camera);
}

function animate() {

	requestAnimationFrame( animate );

	render();

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}