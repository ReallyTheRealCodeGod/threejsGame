import './style.css'
import * as THREE from 'three';
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

/**
 * Cursor implementation, vanilla javascript
 */
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = - (event.clientY / sizes.height - 0.5);

});


//Scene
const scene = new THREE.Scene();

/**
 * Objects
 */
const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0xff0000})
)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0xff0000})
)

group.add(cube2);
group.add(cube1);

cube1.position.x = -1;
 

//Axes helper
//const axesHelper = new THREE.AxesHelper();
//scene.add(axesHelper);

//viewport size
const sizes = {
    width: 800,
    height: 800
}

//Camera, the scenes point of view
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 1, 100);

// *****************OrthographicCamera********************
// const asceptRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(
//     -2 * asceptRatio,
//     2 * asceptRatio,
//     2, 
//     -2, 
//     1, 
//     100
// );
//for at elementerne ikke har samme position, så sæt kameraet frem på z aksen
camera.position.z = 1;
camera.position.addScaledVectorx = 1;
camera.position.y= 7;
camera.rotation.x = -1;



//og tilføj det til scenen
scene.add(camera); 

//ændre kamera position til et object
//camera.lookAt()

// Renderer
//få DOM elementet canvas, fra html
const canvas = document.querySelector('.webgl');

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({

    canvas: canvas

})
//resize renderer to 'sizes'
renderer.setSize(sizes.width, sizes.height);

// 1. metode del 1/2
// bliver anvendt i tick, for at få deltaTime
let time = Date.now();

//2. metode del 1/2, for at få delta
const clock = new THREE.Clock();


//biblioteket gsap, animationer
//den har sin egen "tick"
//er god til "organiske" bevægelser, som svingende sværd o.lign.
//gsap.to(group.position, {duration: 1, delay: 1, x: 2});




//Animations
const tick = () =>
{
    //1. metode del 2/2
    //Kan bruges til at få deltaTime 
    const currentTime = Date.now();
    const deltaTime = currentTime - time;
    time = currentTime;
    //group.rotation.y += 0.001 * deltaTime;
    //group.rotation.x += 0.001 * deltaTime;

    console.log("deltatime = " +deltaTime);



    // 2. metode del 2/2, for at få delta
    // Clock, som er indbygget i Three.js
    const elaspedTime = clock.getElapsedTime();
    console.log("elapsedtime = " +elaspedTime);

    // med clock og en rotation i sekundet med Math.PI  
    // group.rotation.y = elaspedTime * Math.PI * 2;
    // cube1.position.y = Math.sin(elaspedTime);
    // cube2.position.y = Math.sin(elaspedTime);
    // cube2.position.x = Math.cos(elaspedTime);

    //Update camera
    //camera.position.y = cursor.y * 10;
    //camera.position.x = cursor.x * 10;

    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
    // camera.position.y = cursor.y * 5;
    //camera.lookAt(group.position);

    //cube2.position.y = Math.sin(elaspedTime * ( 1+ cursor.y))
    //cube1.position.x = Math.sin(elaspedTime * (1 + cursor.x))


    //update Controls
    controls.update();
    


    //skal have scenen og kameraet
    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
}

tick();