import * as THREE from 'three';
import { create_matrix } from '/cubes.js';

let scene, camera, renderer;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let homeX = 7;
let homeY = 6;
let homeZ = 3;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = homeZ;
    camera.position.y = homeY;
    camera.position.x = homeX;
    camera.lookAt(0, 0, 0)
    scene.add(camera);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const amb = new THREE.AmbientLight(0x404040);
    scene.add(amb);

    const light = new THREE.SpotLight(0x404040);
    light.position.set(0, 10, 10);
    light.intensity = 5000;
    scene.add(light);

    const pG = new THREE.PlaneGeometry(200, 200);
    const pM = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const plane = new THREE.Mesh(pG, pM);
    plane.rotation.x = - Math.PI / 2;
    // plane.translateY(-3.5);
    plane.position.y = -3.5;
    plane.position.y = -.5;
    plane.receiveShadow = true;
    scene.add(plane);

    window.cubes = [];
    create_matrix(scene);
    // cubes.push(create_cubes(scene));
    // cubes.push(create_cubes(scene, 1));
    // cubes.push(create_cubes(scene, 2));
    // cubes.push(create_cubes(scene, -1));
    // cubes.push(create_cubes(scene, -2));

    // cubes[4][4].position.y += .5;

    renderer.render(scene, camera);

    document.addEventListener('keyup', onDocumentKeyPress );
    document.addEventListener('wheel', onWheel);
    window.addEventListener( 'resize', onWindowResize );
}

function onDocumentKeyPress(event) {
    if (event.ctrlKey && event.shiftKey && event.key == 'H') {
        camera.position.z = homeZ;
        camera.position.y = homeY;
        camera.position.x = homeX;
    }
}

function onWheel(event) {
    // console.log(event);
    if (event.ctrlKey) {
        camera.position.y -= event.deltaY * .1;
        if (event.shiftKey)
            camera.position.z += event.deltaY * .1;
    } else {
        camera.position.z += event.deltaY * .1;
    }

    if (event.shiftKey) {
        camera.position.x += event.deltaX * .1;
    }
    console.log(camera.position)
    render();
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    camera.lookAt(0,0,0);
    renderer.render(scene, camera);
}

init();
animate();