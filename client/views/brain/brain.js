Template.brain.rendered = function (){
  initScene();

  Meteor.http.get("/brain.json",function(e,r){
    brain_json = JSON.parse(r.content);
    animate();
  });
}

Template.brain.events({
  "click .next-brain": function(e){
    e.preventDefault();
    if(TWEEN.getAll().length == 0){
      state += 1;
      switch(state){
        case 1:
          $("#BrainContainer .logo-container").addClass('animated fadeOut');
          $("#text1").addClass('animated fadeInUp');
          loadBrain();
          break;
        case 2:
          $("#text1").addClass('animated fadeOutUp');
          $("#text2").addClass('animated fadeInUp');
          wireFrameBrain();
          break;
        case 3:
          $("#text2").addClass('animated fadeOutUp');
          $("#text3").addClass('animated fadeInUp');
          explode();
          Meteor.setTimeout(function(){
            grid();
            state += 1;
          }, 1000);
          break;
        case 5:
          $("#text3").addClass('animated fadeOutUp');
          $("#text4").addClass('animated fadeInUp');
          circle();
          break;
        case 6:
          $("#text4").addClass('animated fadeOutUp');
          $("#text5").addClass('animated fadeInUp');
          men();
          break;
        case 7:
          $("#text5").addClass('animated fadeOutUp');
          $("#text6").addClass('animated fadeInUp');
          showSparklines();
          break;
        case 8:
          $("#text6").addClass('animated fadeOutUp');
          $("#text7").addClass('animated fadeInUp');
          network();
          break;
        // case 5:
        //   closeBrainBox();
      }
    }
    $("#BrainContainer .logo-container").addClass('animated fadeOut');
  }
})

var container, stats;
var camera, scene, renderer, particles, geometry, n, m, state = 0, velocities, brain, brain_json, brainMaterial, brainBox, brainBoxMaterial, sparklines;
var mouseX = 0, mouseY = 0;
var time, last_time;
var sprite;
var last_sparkline_position, sparkline_material1, sparkline_material2;
var network, network_lines, network_geometry, network_lines_geometry, network_line_material;

function initScene() {

  container = document.getElementById( 'BrainContainer' );
  camera = new THREE.PerspectiveCamera( 27, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 1500;

  scene = new THREE.Scene();

  scene.fog = new THREE.FogExp2( 0x000000, 0.00025);
  scene.add( new THREE.AmbientLight( 0x444444 ) );
  pointLight = new THREE.PointLight( 0xffffff, 1 );
  pointLight.position.z = 1000;
  pointLight.position.x = 500;
  scene.add(pointLight);

  sprite = THREE.ImageUtils.loadTexture( "images/sprite.png" );

  n = 64;
  m = 64;
  particles = n*m;

  geometry = new THREE.Geometry();
  geometry.velocities = [];
  geometry.accelerations = [];

  for ( var i = 0; i < particles; i++) {

    vertex = new THREE.Vector3();
    velocity = new THREE.Vector3();

    vertex.x = Math.random() * 2000 - 1000;
    vertex.y = Math.random() * 2000 - 1000;
    vertex.z = Math.random() * 100 - 50;

    r2 = new THREE.Vector3().copy(vertex).lengthSq();
    velocity.copy(vertex).normalize().applyAxisAngle(new THREE.Vector3(0,0,1), Math.PI/2);

    velocity.x = velocity.x / r2 * 50000;
    velocity.y = velocity.y / r2 * 50000;
    velocity.z = velocity.z / r2 * 50000;

    geometry.vertices.push( vertex );
    geometry.velocities.push(velocity);
  }

  // geometry.computeBoundingSphere();

  var material = new THREE.ParticleSystemMaterial( { size: 12, color: "#29abe2", map: sprite, blending: THREE.AdditiveBlending, depthTest: false, transparent : true} );

  particleSystem = new THREE.ParticleSystem( geometry, material );
  scene.add( particleSystem );

  loadSparklines();

  renderer = new THREE.WebGLRenderer(  );
  renderer.setSize( window.innerWidth, window.innerHeight );
  window.addEventListener( 'resize', onWindowResize, false );

  container.appendChild( renderer.domElement );

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
  TWEEN.update();

  switch(state){
    case 0:
      updatePositionVelocities();
      break;
    // case 3:
    //   TWEEN.update();
    //   geometry.verticesNeedUpdate = true;
    //   break;
    case 1:
      geometry.verticesNeedUpdate = true;
      particleSystem.rotation.y += dt * 0.5;
      geometry.elementsNeedUpdate = true;
      geometry.computeFaceNormals();
      break;
    case 2:
      particleSystem.rotation.y += dt * 0.5;
      brain.rotation.y = particleSystem.rotation.y;
      brainMaterial.needsUpdate = true;
      break;
    case 3:
      geometry.verticesNeedUpdate = true;
      particleSystem.rotation.y += dt * 0.5;
      brain.rotation.y = particleSystem.rotation.y;
      break;
    case 4:
      geometry.verticesNeedUpdate = true;
      // particleSystem.rotation.y = 0;
      brain.rotation.y += dt * 0.5;
      // brainBox.rotation.y = brain.rotation.y;
      break;
    case 5:
      brain.rotation.y += dt * 0.5;
      particleSystem.rotation.z += dt * 0.5;
      geometry.verticesNeedUpdate = true;
      break;
    case 6:
      particleSystem.position.z += dt * 10;
      geometry.verticesNeedUpdate = true;
      break;
    case 7:
      sparklines.position.z += dt * 3000;
      addData();
      break;
    case 8:
      sparklines.position.z += dt * 3000;
      animateNetwork();
      break;
    case 9:
      scene.remove(sparklines);
      break;

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
  next_angle = (Math.floor(particleSystem.rotation.y / (Math.PI*2)) + 1)  * Math.PI * 2;
  new TWEEN.Tween(particleSystem.rotation).to({y: next_angle},2000).easing( TWEEN.Easing.Quadratic.InOut).start();
  // new TWEEN.Tween(brain.rotation).to({y: next_angle},2000).easing( TWEEN.Easing.Quadratic.InOut).start();

  geometry.verticesNeedUpdate = true;

}

function updatePositionVelocities(){

  for (var i = 0; i < particles; i++) {

    // uv = new THREE.Vector3().copy(geometry.velocities[i]).normalize().negate();
    // r2 = new THREE.Vector3().copy(geometry.velocities[i]).lengthSq();
    // // r2 = geometry.velocities[i].copy()
    // geometry.velocities[i].add( uv.divideScalar(r2).multiplyScalar(10) );

    r2 = new THREE.Vector3().copy(geometry.vertices[i]).lengthSq();
    u = new THREE.Vector3().copy(geometry.vertices[i]).normalize();

    geometry.velocities[i].x += -100*u.x/r2;
    geometry.velocities[i].y += -100*u.y/r2;
    // geometry.velocities[i].z += -1/Math.pow(geometry.vertices[i].z,2);

    geometry.vertices[i].x += geometry.velocities[i].x;
    geometry.vertices[i].y += geometry.velocities[i].y;
    // geometry.vertices[i].z += geometry.velocities[i].z;

    // if(geometry.vertices[i].x > 1000){geometry.vertices[i].x = -1000}
    // if(geometry.vertices[i].x < -1000){geometry.vertices[i].x = 1000}
    // if(geometry.vertices[i].y > 1000){geometry.vertices[i].y = -1000}
    // if(geometry.vertices[i].y < -1000){geometry.vertices[i].y = 1000}
    // if(geometry.vertices[i].z > 1000){geometry.vertices[i].z = -1000}
    // if(geometry.vertices[i].z < -1000){geometry.vertices[i].z = 1000}

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

    if (bg.vertices[i*3]) {
      new TWEEN.Tween( geometry.vertices[i] ).to( {
        x: bg.vertices[i*3] * 50 + 50,
        y: bg.vertices[i*3 + 2] * 50 + 50,
        z: bg.vertices[i*3 + 1] * 50}, 2000 )
      .easing( TWEEN.Easing.Quadratic.InOut).start();
    } else {
      geometry.vertices[i].x = 0;
      geometry.vertices[i].y = 0;
      geometry.vertices[i].z = -10000;
    }
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

  brainMaterial = new THREE.MeshBasicMaterial( {color: new THREE.Color(0x29abe2), wireframe: true, opacity: 0, transparent: true, blending: THREE.AdditiveBlending, depthTest: false});

  brain = new THREE.Mesh(brain_geometry, brainMaterial);
  scene.add(brain);
  window.scene = scene;

  new TWEEN.Tween(brainMaterial).to({opacity: 0.4},1000).easing( TWEEN.Easing.Quadratic.InOut).start();

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

function circle(){

  dphi = 2 * Math.PI / ( particles / 10 );
  r = 180;
  dr = 5 / ( particles / 10 );
  phi = 0;

  new TWEEN.Tween(brainMaterial).to({opacity: 0},1000).easing( TWEEN.Easing.Quadratic.InOut).start();
  new TWEEN.Tween(brain.scale).to({x:0,y:0,z:0},2000).easing( TWEEN.Easing.Quadratic.InOut).start();

  for (var i = 0; i < particles; i++) {

    vector = new THREE.Vector3(0,r,0).applyAxisAngle(new THREE.Vector3(0,0,1), -phi);

    if (i % 2){
      vector = new THREE.Vector3(0,r,0).applyAxisAngle(new THREE.Vector3(0,0,1), -phi);
    } else {
      vector = new THREE.Vector3(0,r*2.5,0).applyAxisAngle(new THREE.Vector3(0,0,1), -phi);
    }

    new TWEEN.Tween( geometry.vertices[i] ).to( {
      x: vector.x,
      y: vector.y,
      z: vector.z}, 1000)
    .easing( TWEEN.Easing.Quadratic.Out).delay(i/3).start();

    phi += dphi;
    r += dr;

  }

}

function men(){
  new TWEEN.Tween(particleSystem.rotation).to({z: Math.PI},1000).easing( TWEEN.Easing.Quadratic.InOut).start();
  head = THREE.TransformSVGPath("M256,106.6c20.6,0.1,37.3-16.6,37.3-37.3c0-20.6-16.7-37.3-37.3-37.3c-20.6,0-37.3,16.7-37.3,37.3  C218.7,89.9,235.4,106.6,256,106.6z").makeGeometry();
  body = THREE.TransformSVGPath("M293.4,115H256h-37.4c-28.2,0-46.6,24.8-46.6,48.4V277c0,22,31,22,31,0V172h6v285.6c0,30.4,42,29.4,43,0V293h7h1v164.7   c1.7,31.2,43,28.2,43-0.1V172h5v105c0,22,32,22,32,0V163.4C340,139.9,321.5,115,293.4,115z").makeGeometry();

  points_head = THREE.GeometryUtils.randomPointsInGeometry(head, 200);
  points_body = THREE.GeometryUtils.randomPointsInGeometry(body, 1166);

  points_head2 = THREE.GeometryUtils.randomPointsInGeometry(head, 200);
  points_body2 = THREE.GeometryUtils.randomPointsInGeometry(body, 1165);

  points_head3 = THREE.GeometryUtils.randomPointsInGeometry(head, 200);
  points_body3 = THREE.GeometryUtils.randomPointsInGeometry(body, 1165);

  for (var i = 0; i < points_head2.length; i++){points_head2[i].x += 300;}
  for (var i = 0; i < points_body2.length; i++){points_body2[i].x += 300;}

  for (var i = 0; i < points_head3.length; i++){points_head3[i].x -= 300;}
  for (var i = 0; i < points_body3.length; i++){points_body3[i].x -= 300;}

  points = points_head.concat(points_body, points_head2, points_body2, points_head3, points_body3);

  for (var i = 0; i < particles; i++) {
    new TWEEN.Tween( geometry.vertices[i] ).to( {
      x: (points[i].x - 256) / 2,
      y: (points[i].y - 256) / 2,
      z: points[i].z}, 1000)
    .easing( TWEEN.Easing.Quadratic.InOut).start();
  }
}

function loadSparklines(){
  sparkline_material1 = new THREE.MeshBasicMaterial({color: new THREE.Color(0x29abe2), transparent:true, opacity:0, blending: THREE.AdditiveBlending });
  sparkline_material2 = new THREE.MeshBasicMaterial({color: new THREE.Color(0x90d4d5), transparent:true, opacity:0, blending: THREE.AdditiveBlending });

  sparklines = new THREE.Object3D();

  for (var i = 0; i < 25; i++){

    points = [];

    y = 0;
    for (var j = -2000; j < 2000; j+=10){
      y += (Math.random()-0.5)*2;
      points.push( new THREE.Vector2( j, y * 8 ) );
    }
    points.push( new THREE.Vector2( 2000, -1000 ) );
    points.push( new THREE.Vector2( -2000, -1000 ) );

    // path = new THREE.Path(points);
    shape = new THREE.Shape(points);

    if (i%2 == 0){
      line = new THREE.Mesh( shape.makeGeometry(), sparkline_material1 );
    }else{
      line = new THREE.Mesh( shape.makeGeometry(), sparkline_material2 );
    }

    line.position.z = -i*300;
    sparklines.add( line );

  }

  last_sparkline_position = -7500;
  sparklines.position.y = -200;
  sparklines.position.z = 500;
}

function showSparklines(){
  new TWEEN.Tween(sparkline_material1).to({opacity: 0.2},2000).easing( TWEEN.Easing.Linear.None).start();
  new TWEEN.Tween(sparkline_material2).to({opacity: 0.2},2000).easing( TWEEN.Easing.Linear.None).start();
  new TWEEN.Tween(particleSystem.position).to({z: 2000},1000).easing( TWEEN.Easing.Quadratic.In).start();
  scene.add(sparklines);
}

function addData(){
  z = sparklines.position.z;
  for (var i = 0; i < sparklines.children.length; i++){
    if (sparklines.children[i].position.z + z > 1000){
      last_sparkline_position -= 300;
      sparklines.children[i].position.z = last_sparkline_position;
      break;
    }
  }
}


function network(){
  network_geometry = new THREE.Geometry();
  network_geometry.velocities = [];
  nodes = 250;

  for ( var i = 0; i < nodes; i++) {

    vertex = new THREE.Vector3();
    velocity = new THREE.Vector3();

    vertex.x = Math.random() * 1500 - 750;
    vertex.y = Math.random() * 1500 - 750;
    vertex.z = 0;

    velocity.x = ( Math.random() - 0.5 ) / 2;
    velocity.y = ( Math.random() - 0.5 ) / 2;
    velocity.z =  0;

    network_geometry.vertices.push(vertex);
    network_geometry.velocities.push(velocity);
  }
  var material = new THREE.ParticleSystemMaterial( { size: 12, color: "#29abe2", map: sprite, blending: THREE.AdditiveBlending, depthTest: false, transparent : true} );
  network = new THREE.ParticleSystem(network_geometry, material);
  // scene.add(network);

  network_lines_geometry = new THREE.Geometry();
  network_line_material = new THREE.LineBasicMaterial( {vertexColors: THREE.VertexColors, blending: THREE.AdditiveBlending, transparent : true, opacity: 0} );
  network_lines = new THREE.Line( network_lines_geometry, network_line_material, THREE.LinePieces );
  // network_lines.position.z = -10000;
  scene.add( network_lines);
  // new TWEEN.Tween(network_lines.position).to({z: 0},2000).easing(TWEEN.Easing.Quadratic.Out).delay(500).start();
  new TWEEN.Tween(network_line_material).to({opacity: 1},2000).easing( TWEEN.Easing.Linear.None ).delay(500).start();
  new TWEEN.Tween(sparkline_material1).to({opacity: 0},2000).easing( TWEEN.Easing.Linear.None ).start();
  new TWEEN.Tween(sparkline_material2).to({opacity: 0},2000).easing( TWEEN.Easing.Linear.None ).start();
}

function animateNetwork(){
  for ( var i = 0; i < 250; i++) {
    network_geometry.vertices[i].x += network_geometry.velocities[i].x;
    network_geometry.vertices[i].y += network_geometry.velocities[i].y;
    if(network_geometry.vertices[i].x > 750){network_geometry.vertices[i].x = -750}
    if(network_geometry.vertices[i].x < -750){network_geometry.vertices[i].x = 750}
    if(network_geometry.vertices[i].y > 750){network_geometry.vertices[i].y = -750}
    if(network_geometry.vertices[i].y < -750){network_geometry.vertices[i].y = 750}
    if(network_geometry.vertices[i].z > 750){network_geometry.vertices[i].z = -750}
    if(network_geometry.vertices[i].z < -750){network_geometry.vertices[i].z = 750}
  }
  
  network_geometry.verticesNeedUpdate = true;
  network_geometry.computeLineDistances();

  d = 150;

  network_lines.geometry.vertices = [];
  network_lines.geometry.colors = [];

  for (var i = network.geometry.vertices.length - 1; i >= 0; i--) {
    for (var j = network.geometry.vertices.length - 1; j >= 0; j--) {
        distance = network.geometry.vertices[i].distanceTo(network.geometry.vertices[j]);
        if (distance < d){
          network_lines.geometry.vertices.push(new THREE.Vector3( network.geometry.vertices[i].x, network.geometry.vertices[i].y, network.geometry.vertices[i].z ));
          network_lines.geometry.vertices.push(new THREE.Vector3( network.geometry.vertices[j].x, network.geometry.vertices[j].y, network.geometry.vertices[j].z ));
          color = (new THREE.Color(0x29abe2)).lerp( new THREE.Color(0x000000), distance/d );
          // color.setHSL(0.549, 0.76, 0.525 + ( 0.475 * (1 - distance/(d)))  );
          network_lines.geometry.colors.push(color);
          network_lines.geometry.colors.push(color);
        }
      // }
    };
  };

  network_lines.geometry.verticesNeedUpdate = true;
  network_lines.geometry.colorsNeedUpdate = true;
}