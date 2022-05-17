
import { PointerLockControls } from '../src/PointerLockControls.js';
import * as THREE from '../src/three.module.js';

let camera, scene, renderer,pControl
//Se crean las variables para decir que se estará estático.
//y para el movimiento
let xdir = 0, zdir = 0
let tiempoI, tiempoF, vel, delta

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

//Usar las flechas del teclado para movernos en el plano.
document.addEventListener('keydown', (e)=>{
    switch (e.keyCode) {
        case 37:
            xdir = -1
            break;
        case 38:
            zdir = 1
            break;
        case 39:
            xdir = 1
            break;
        case 40:
            zdir = -1
            break;
    }
})
//Evento para detenerse
document.addEventListener('keyup', (e)=>{
    switch (e.keyCode) {
        case 37:
            xdir = -1
            break;
        case 38:
            zdir = 1
            break;
        case 39:
            xdir = 1
            break;
        case 40:
            zdir = -1
            break;
    }
})

tiempoI = Date.now()
//Velocidad en la que se moverá 
vel = 40

//Mandamos a llamar a la función.
animate();

function animate() {
    requestAnimationFrame(animate);
//determinar la distancia en la que se mueve la cámara.
    if (pControl.isLocked === true) {
        tiempoF = Date.now()

        delta = (tiempoF - tiempoI)/1000

        let xDis = xdir * vel * delta
        let zDis = zdir * vel * delta

        pControl.moveRight(xDis)
        pControl.moveForward(zDis)

        tiempoI = tiempoF
    }

    renderer.render(scene,camera);
}

renderer.render(scene,camera);
