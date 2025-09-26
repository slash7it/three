import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild( renderer.domElement );

var cubes = [];
var colors = [0x1f77b4,0xff7f0e,0x2ca02c,0xd62728,0x9467bd,0x8c564b,0xe377c2,0x7f7f7f,0xbcbd22,0x17becf]
let cube
for (let i=0; i < 3; i++) {
    let geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    // const material = new THREE.MeshToonMaterial({ color: 0xffff00 } );
    let material = new THREE.MeshPhysicalMaterial({ 
        color: colors[i], 
        clearcoat: 1.0
    })
    cube = new THREE.Mesh( geometry, material );
    // cube.rotateX(-15);
    // cube.rotateY(15)
    cube.position.x += (i*1.5)-1.5;
    cube.castShadow = true;
    cubes.push(cube);
    scene.add(cube);
}


const light = new THREE.AmbientLight(0x404040);
scene.add(light);
// scene.fog();

const bulb = new THREE.PointLight(0x404040, 1000, 100);
bulb.position.set(10,10,10);
// scene.add(bulb)

const spot = new THREE.SpotLight(0x404040);
spot.position.set(10,10,10);
spot.intensity = 5000;
spot.castShadow = true;
spot.shadow.mapSize.width = 512;
spot.shadow.mapSize.height = 512;
spot.shadow.camera.near = .1
spot.shadow.camera.far = 100;
spot.shadow.focus = 1;
scene.add(spot);


const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(20,20,32,32),
    new THREE.MeshStandardMaterial({color: colors[4]})
);
plane.receiveShadow = true;
plane.rotateX(Math.PI/2);
// plane.translateZ(-0.5)
scene.add(plane);

camera.position.z = 5;
camera.position.y = 1;
camera.lookAt(0,0,0)

function animate() {
	requestAnimationFrame( animate );
    cubes.forEach(cube => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    })
    renderer.render( scene, camera );
}

// const helper = new THREE.CameraHelper(spot.shadow.camera);
// scene.add(helper);

let ani = false;
if (ani) {
    animate();
} else {
    renderer.render( scene, camera );
}

var app = new window.Webex.Application();

app.onReady().then(function () {
  console.log('App is ready. App info:', app);
});

document.onclick = (e) => {
	let url = "https://slash7it.github.io/three/foo.html";
	app.setShareUrl(url, "", "Shared App").then(() => {
        log("Set share URL", url);
    }).catch((errorcode) => {
        log("Error: ", Webex.Application.ErrorCodes[errorcode])
    });
};
