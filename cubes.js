import * as THREE from 'three';

function create_cubes(scene, offset=0) {
    var count = 9;
    var midpoint = (count / 2)-.5;
    var cubes = [];
    var colors = [0x1f77b4,0xff7f0e,0x2ca02c,0xd62728,0x9467bd,0x8c564b,0xe377c2,0x7f7f7f,0xbcbd22,0x17becf]
    var coff = Math.abs(offset);
    for (let i=0; i < count; i++) {
        var c = i + coff;
        if (c >= colors.length) {
            c = c - colors.length;
        }
        const cG = new THREE.BoxGeometry();
        const cM = new THREE.MeshPhysicalMaterial({color: colors[c], clearcoat: 1, reflectivity: 1});
        const cube = new THREE.Mesh(cG, cM);
        cube.translateX(-midpoint+i);
        cube.translateY(foo(i,count, offset));
        // cube.translateY(i*.1);
        cube.translateZ(offset);
        scene.add(cube);
        cubes.push(cube);
    }
    return cubes;
}

function foo(i,count,o) {
    var h = Math.sin((i/(count - 1))*Math.PI)// * (.1*o);//Math.sin(-o/4 * Math.PI);
    var oo = (Math.abs(Math.abs(o)-4)/8)*Math.PI;
    console.log((oo) + ' ' + i + ' ' + (count-1));
    return h+oo;
}

export function create_matrix(scene) {
    for (let i=-4; i <= 4; i++) {
        window.cubes.push(
            create_cubes(scene, i)
        );
    }
}