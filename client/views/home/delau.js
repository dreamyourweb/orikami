Template.delau.rendered = function (){
    init(this.find(".delau-wrapper"));
    animate();
}
var container, stats;
var camera, scene, renderer, particles, geometry, materials = [], parameters, i, h, w, color, velocities, polygons, pointLight, initial_z=[];
var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var clock = new THREE.Clock;

function init(element) {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    // scene.add( new THREE.AmbientLight( 0x021F1F ) );
    pointLight = new THREE.PointLight( 0xffffff, 1 );
    pointLight.position.z = 100;
    scene.add( pointLight );
    // directionalLight = new THREE.DirectionalLight( 0xffffff, 0.125 );
    // directionalLight.position.z = 10
    // scene.add(directionalLight);

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize( window.innerWidth, window.innerHeight );

    element.appendChild( renderer.domElement );

    w = 16 * 2;
    h = 9 * 2;

    geometry = new THREE.Geometry();
    lines_geometry = new THREE.Geometry();
    velocities = [];
    vertices = [];
    geometry.inits = [];
    for (var i = 0; i < 200; i++) {
        vert = new THREE.Vector3( w * Math.random() - w/2, h * Math.random() - h/2, 0)
        geometry.vertices.push(vert);

        geometry.inits.push({z: vert.z, speed: Math.random()});
        vertices.push([vert.x,vert.y])
        velocities.push( new THREE.Vector3( 2 * Math.random() - 1, 2 *  Math.random() - 1, 0) );
    }

    var triangles = Delaunay.triangulate(vertices);
    // console.log(JSON.stringify(triangles));

    // colors = [];
    for (var i = 0; i < triangles.length; i+=3) {

        color = new THREE.Color();
        color.setHSL(0.549, 0.76, 0.525 + 0.2*Math.random());        

        geometry.faces.push( new THREE.Face3( triangles[i+2], triangles[i+1], triangles[i] , new THREE.Vector3(0,0,1), color ));
    }

    geometry.colorsNeedUpdate = true;
    geometry.computeLineDistances();
    geometry.computeFaceNormals();
    console.log(JSON.stringify(geometry.lineDistances));

    // console.log(JSON.stringify(geometry.vertices));

    // material = new THREE.ParticleBasicMaterial( { color: 0x000000, size: 5 } );
    // particles = new THREE.ParticleSystem( geometry, material );

    color = new THREE.Color();
    color.setHSL(0.549, 0.76, 0.8);      

    wireframeMaterial = new THREE.MeshBasicMaterial( {color: color, wireframe: true} );
    polygonMaterial = new THREE.MeshLambertMaterial({shading: THREE.FlatShading, vertexColors: THREE.FaceColors});  
    polygons = new THREE.Mesh( geometry, polygonMaterial );
    wireframe = new THREE.Mesh( geometry, wireframeMaterial );
    wireframe.position.z += 0.01;
    // scene.add( particles );
    // geometry = new THREE.CubeGeometry( 10, 10, 10 );
    // polygons = new THREE.Mesh( geometry, polygonMaterial );
    scene.add(polygons);
    // scene.add(wireframe);

    camera.position.z = 5;
    window.addEventListener( 'resize', onWindowResize, false );
    clock.start();

}


function render() {
    // var delta = clock.getDelta() * 1000;
    pointLight.position.y = 16 - $(window).scrollTop() / 10;

    // for (var i = 0 ; i < polygons.geometry.vertices.length; i++) {

    //  polygons.geometry.vertices[i].z = Math.sin((polygons.geometry.inits[i].z*Math.PI + clock.getElapsedTime()) * polygons.geometry.inits[i].speed) / 10;

    //  // polygons.geometry.vertices[i].x += velocities[i].x / (1000 * (16.6666666 / delta));
    //  // polygons.geometry.vertices[i].y += velocities[i].y / (1000 * (16.6666666 / delta));
    //  // if (polygons.geometry.vertices[i].x > w/2) { polygons.geometry.vertices[i].x -= w }
    //  // if (polygons.geometry.vertices[i].x < -w/2) { polygons.geometry.vertices[i].x += w }
    //  // if (polygons.geometry.vertices[i].y > h/2) { polygons.geometry.vertices[i].y -= h }
    //  // if (polygons.geometry.vertices[i].y < -h/2) { polygons.geometry.vertices[i].y += h }
    // }

    // lines.geometry.vertices = [];
    // lines.geometry.colors = [];

    // for (var i = particles.geometry.vertices.length - 1; i >= 0; i--) {
    //  for (var j = particles.geometry.vertices.length - 1; j >= 0; j--) {
    //      // if (particles.geometry.vertices[i].length() < 4 && 
    //      //      particles.geometry.vertices[j].length() < 4){

    //          distance = particles.geometry.vertices[i].distanceTo(particles.geometry.vertices[j]);
    //          if (distance < h/5){
    //              lines.geometry.vertices.push(new THREE.Vector3( particles.geometry.vertices[i].x, particles.geometry.vertices[i].y, particles.geometry.vertices[i].z ));
    //              lines.geometry.vertices.push(new THREE.Vector3( particles.geometry.vertices[j].x, particles.geometry.vertices[j].y, particles.geometry.vertices[j].z ));                
    //              color = new THREE.Color();
    //              color.setHSL(0.549, 0.76, 0.525 + ( 0.475 * (1 - distance/(h/5)))  );
    //              lines.geometry.colors.push(color);
    //              lines.geometry.colors.push(color);
    //          }
    //      // }
    //  };
    // };   

    polygons.geometry.verticesNeedUpdate = true;
    // lines.geometry.verticesNeedUpdate = true;
    // lines.geometry.colorsNeedUpdate = true;
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
    // $('.wireframe-wrapper canvas').parallax({ "coeff":0.5});

}
