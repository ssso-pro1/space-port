import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup  ------------------------------------------------------

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Sphere  ------------------------------------------------------

// const geometry = new THREE.BoxGeometry(5, 5, 5);
// const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
// const sphere = new THREE.Mesh(geometry, material);

// scene.add(sphere);

// Lights ------------------------------------------------------

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

const lightHelper = new THREE.PointLightHelper(pointLight);

const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

// Background -----------------------------------------------

// bg stars
const addStar = () => {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xf1f3f4 });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
};

Array(250).fill().forEach(addStar);

// bg image
const spaceTexture = new THREE.TextureLoader().load('imgs/bg/ill-space.jpg');
scene.background = spaceTexture;

// Planet -----------------------------------------------
const planetTexture = new THREE.TextureLoader().load('imgs/bg/moon.jpg');
const normalTexture = new THREE.TextureLoader().load('imgs/bg/normal.jpg');

const planet = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: planetTexture,
    normalMap: normalTexture,
  })
);

scene.add(planet);

// CAN Box
const canTexture = new THREE.TextureLoader().load('imgs/bg/can.jpg');

const can = new THREE.Mesh(
  new THREE.BoxGeometry(13, 13, 13),
  new THREE.MeshBasicMaterial({ map: canTexture })
);
scene.add(can);

planet.position.z = 30;
planet.position.x = -10;
// planet.position.y = 10;

can.position.z = -5;
can.position.x = 2;

// Functions -------------------------------------------------------

// Scroll Animation
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  planet.rotation.y += 0.01;
  planet.rotation.z += 0.01;

  can.rotation.x += 0.05;
  can.rotation.y += 0.075;
  can.rotation.z += 0.05;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}
document.body.onscroll = moveCamera;
moveCamera();

// animate
function animate() {
  requestAnimationFrame(animate);
  //   sphere.rotation.x += 0.01;
  //   sphere.rotation.y += 0.01;
  //   sphere.rotation.z += 0.01;
  planet.rotation.x += 0.01;
  planet.rotation.y += 0.015;
  planet.rotation.z += 0.01;

  //   can.rotation.x += 0.01;
  //   can.rotation.y += 0.02;
  //   can.rotation.z += 0.01;

  renderer.render(scene, camera);
}

animate();
