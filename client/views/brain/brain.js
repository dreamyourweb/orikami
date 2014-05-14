Template.brain.rendered = function (){
  initScene();

  Meteor.http.get("/brain.json",function(e,r){
    brain_json = JSON.parse(r.content);
    animate();
  });
}

Template.brain.events({
  "click .next-brain": function(e){
    event.preventDefault();
    switch(state){
      case 1:
        grid();
        break;
      case 2:
        $("#BrainContainer .logo-container").addClass('animated fadeOut');
        $("#text1").addClass('animated fadeInUp');
        loadBrain()
        break;
      case 3:
        $("#text1").addClass('animated fadeOutUp');
        $("#text2").addClass('animated fadeInUp');
        wireFrameBrain()
        break;
      case 4:
        $("#text2").addClass('animated fadeOutUp');
        $("#text3").addClass('animated fadeInUp');
        explode()
        break;
      case 5:
        brainBox();
        break;
      case 6:
        closeBrainBox();
    }
    state += 1;
  }
})

var container, stats;
var camera, scene, renderer, particles, geometry, n, m, state = 1, velocities, brain, brain_json, brainMaterial, brainBox, brainBoxMaterial;
var mouseX = 0, mouseY = 0;
var time, last_time;

function initScene() {

  container = document.getElementById( 'BrainContainer' );
  camera = new THREE.PerspectiveCamera( 27, window.innerWidth / window.innerHeight, 1, 3500 );
  camera.position.z = 1500;

  scene = new THREE.Scene();

  // scene.fog = new THREE.Fog( 0x000000, 0, 10000);
  scene.add( new THREE.AmbientLight( 0x444444 ) );
  pointLight = new THREE.PointLight( 0xffffff, 1 );
  pointLight.position.z = 1000;
  pointLight.position.x = 500;
  scene.add(pointLight);

  n = 65;
  m = 65;
  particles = n*m;

  geometry = new THREE.Geometry();
  velocities = [];

  var color = new THREE.Color();

  for ( var i = 0; i < particles; i++) {

    vertex = new THREE.Vector3();
    velocity = new THREE.Vector3();

    vertex.x = Math.random() * 2000 - 1000;
    vertex.y = Math.random() * 2000 - 1000;
    vertex.z = Math.random() * 2000 - 1000;

    velocity.x = Math.random() * 5 - 2.5;
    velocity.y = Math.random() * 5 - 2.5;
    velocity.z = Math.random() * 5 - 2.5;

    geometry.vertices.push( vertex );
    velocities.push(velocity)

  }

  geometry.computeBoundingSphere();

  var material = new THREE.ParticleSystemMaterial( { size: 5, color: "#29abe2" } );

  particleSystem = new THREE.ParticleSystem( geometry, material );
  scene.add( particleSystem );

  renderer = new THREE.WebGLRenderer( { antialias: false } );
  renderer.setSize( window.innerWidth, window.innerHeight );

  container.appendChild( renderer.domElement );

  geometry.computeLineDistances()
  document.addEventListener( 'mousedown', onDocumentMouseDown, false );

}

function onWindowResize() {

  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function animate() {

  requestAnimationFrame( animate );

  render();

}

function render() {

  time = Date.now() * 0.001;
  dt = time - last_time;
  last_time = time;

  switch(state){
    case 1:
      updatePositionVelocities();
      break;
    case 2:
      TWEEN.update();
      geometry.verticesNeedUpdate = true;
      break;
    case 3:
      TWEEN.update();
      geometry.verticesNeedUpdate = true;
      particleSystem.rotation.y += dt * 0.5;
      geometry.elementsNeedUpdate = true;
      geometry.computeFaceNormals();
      break;
    case 4:
      TWEEN.update();
      particleSystem.rotation.y += dt * 0.5;
      brain.rotation.y = particleSystem.rotation.y;
      brainMaterial.needsUpdate = true;
      break;
    case 5:
      TWEEN.update();
      geometry.verticesNeedUpdate = true;
      particleSystem.rotation.y += dt * 0.5;
      brain.rotation.y = particleSystem.rotation.y;
      break;
    case 6:
      TWEEN.update();
      particleSystem.rotation.y += dt * 0.5;
      brain.rotation.y = particleSystem.rotation.y;
      brainBox.rotation.y = brain.rotation.y;
  }

  renderer.render( scene, camera );

}

function grid() {

  index = 0;
  for ( var i = 0; i < n; i++) {
    for ( var j = 0; j < m; j++) {

      new TWEEN.Tween( geometry.vertices[index] ).to( {
        x: i/n * 2000 - 1000,
        y: j/m * 2000 - 1000,
        z: 0}, 2000 )
      .easing( TWEEN.Easing.Quadratic.InOut).start();

      index++;

    }
  }

  // boxGeo = new THREE.RingGeometry(80,100,64);
  // boxMat = new THREE.MeshBasicMaterial({color: 0x000000});
  // box = new THREE.Mesh(boxGeo, boxMat);
  // box.position.z = 500;
  // scene.add(box);

  geometry.verticesNeedUpdate = true;

}

function updatePositionVelocities(){

  for (var i = 0; i < particles; i++) {
    geometry.vertices[i].x += velocities[i].x;
    geometry.vertices[i].y += velocities[i].y;
    geometry.vertices[i].z += velocities[i].z;

    if(geometry.vertices[i].x > 1000){geometry.vertices[i].x = -1000}
    if(geometry.vertices[i].x < -1000){geometry.vertices[i].x = 1000}
    if(geometry.vertices[i].y > 1000){geometry.vertices[i].y = -1000}
    if(geometry.vertices[i].y < -1000){geometry.vertices[i].y = 1000}
    if(geometry.vertices[i].z > 1000){geometry.vertices[i].z = -1000}
    if(geometry.vertices[i].z < -1000){geometry.vertices[i].z = 1000}

  }

  geometry.verticesNeedUpdate = true;

}

function explode(){
  for ( var i = 0; i < particles; i++) {

    new TWEEN.Tween( geometry.vertices[i] ).to( {
      x: Math.random() * 1000 - 500,
      y: Math.random() * 1000 - 500,
      z: Math.random() * 1000 - 500}, 2000 )
    .easing( TWEEN.Easing.Exponential.Out).start();

  }
}

function loadBrain(){

  bg = brain_json;
  for (var i = 0; i < particles; i++) {

    new TWEEN.Tween( geometry.vertices[i] ).to( {
      x: bg.vertices[i*3] * 50 + 50,
      y: bg.vertices[i*3 + 2] * 50 + 50,
      z: bg.vertices[i*3 + 1] * 50}, 2000 )
    .easing( TWEEN.Easing.Quadratic.InOut).start();
  }

}

function wireFrameBrain(){

  brain_geometry = new THREE.Geometry();
  for (var i = 0; i < brain_json.vertices.length/3; i++) {
    brain_geometry.vertices.push(new THREE.Vector3(brain_json.vertices[i*3] * 50 + 50, brain_json.vertices[i*3 + 2] * 50 + 50, brain_json.vertices[i*3 + 1] * 50))
  }
  for (var i = 0; i < brain_json.faces.length/6; i++) {
    brain_geometry.faces.push( new THREE.Face3( brain_json.faces[i*6], brain_json.faces[i*6+2], brain_json.faces[i*6+4],new THREE.Vector3(0,0,1), new THREE.Color(0x29abe2)));
  }

  brainMaterial = new THREE.MeshBasicMaterial( {color: new THREE.Color(0x29abe2), wireframe: true, opacity: 0, transparent: true});

  brain = new THREE.Mesh(brain_geometry, brainMaterial);
  scene.add(brain);
  window.scene = scene;

  new TWEEN.Tween(brainMaterial).to({opacity: 0.4},2000).easing( TWEEN.Easing.Quadratic.InOut).start();

}

function brainBox(){

  box_geometry = new THREE.BoxGeometry(400,300,300);
  brainBoxMaterial = new THREE.MeshLambertMaterial( {color: new THREE.Color(0x29abe2), transparent: true, opacity: 0});
  brainBox = new THREE.Mesh(box_geometry,  brainBoxMaterial);
  // brainBox.material.color = new THREE.Color(0x29abe2);
  scene.add( brainBox );
  new TWEEN.Tween(brainBoxMaterial).to({opacity: 1},2000).easing( TWEEN.Easing.Quadratic.InOut).start();

}

function closeBrainBox(){
  brainBox.material = new THREE.MeshLambertMaterial( {shading: THREE.FlatShading, transparent: true, opacity: 0.5} );
}

function onDocumentMouseDown( event ) {
  
}


