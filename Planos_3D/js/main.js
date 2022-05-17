
import { PointerLockControls } from '../src/PointerLockControls.js';
import * as THREE from '../src/three.module.js';

let camera, scene, renderer,pControl

scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff)
//Agregar un plano de referencia
scene.add(new THREE.GridHelper(10000,1000))
scene.fog = new THREE.Fog(0xfffff,0,500)

//Agregar figura geométrica.
let mesh = new THREE.Mesh(
    new THREE.BoxGeometry(10,10,10,10),
    new THREE.MeshLambertMaterial({color:0x0000ff})
)
mesh.position.z= -50;
scene.add(mesh);
//Iluminación a la figura
scene.add(new THREE.HemisphereLight(0xffffff));

camera =new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 1,1000);
//Movel la posición de la cámara.
camera.position.y = 10

renderer = new THREE.WebGL1Renderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

pControl = new PointerLockControls(camera, renderer.domElement)
//Activar el pControl al hacer click
document.getElementById('btnplay').onclick = () =>{
    pControl.lock()
}
//Mandamos a llamar a la función.
animate();

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
}

renderer.render(scene,camera);
