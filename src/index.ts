// add styles
import "./style.css";
// three.js
import * as THREE from "three";

// create the scene
const scene = new THREE.Scene();

// create the camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();

//var axesHelper = new THREE.AxesHelper(5);
//scene.add( axesHelper );

// set size
renderer.setSize(window.innerWidth, window.innerHeight);

// add canvas to dom
document.body.appendChild(renderer.domElement);

// add lights
const light = new THREE.DirectionalLight(0xffffff, 1.0);

light.position.set(100, 100, 100);

scene.add(light);

// const light2 = new THREE.DirectionalLight(0xffffff, 1.0);
//
// light2.position.set(-100, 100, -100);
//
// scene.add(light2);

const material = new THREE.PointsMaterial({
  color: 0x00acab,
  size: 0.2,
});

// create a box and add it to the scene
const box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
//scene.add(box);

box.position.x = 0.5;
box.rotation.y = 0.5;

camera.position.x = 5;
camera.position.y = 5;
camera.position.z = 5;

const numSubdivisions = 2;
let geometry = new THREE.Geometry();
const scaleFactors = [];

const di = 1 / (numSubdivisions + 1);
for (let z = -0.5; z <= 0.5; z += di) {
  for (let y = -0.5; y <= 0.5; y += di) {
    for (let x = -0.5; x <= 0.5; x += di) {
      const vertex = new THREE.Vector3(x, y, z)
      geometry.vertices.push(vertex);
      const distanceFromOrigin = vertex.distanceTo(new THREE.Vector3(0,0,0)) * 0.01;
      scaleFactors.push(distanceFromOrigin);
    }
  }
}

const points = new THREE.Points(geometry, material);
scene.add(points);
console.log(points);

console.log(geometry.vertices);

camera.lookAt(scene.position);

function animate(): void {
  requestAnimationFrame(animate);
  render();
}


function render(): void {
  const timer = 0.002 * Date.now();
  //box.position.y = 0.5 + 0.5 * Math.sin(timer);
  //box.rotation.x += 0.1;
  //points.geometry.vertices.forEach((vertex) => {
  //  console.log(vertex);
  //  vertex.add(0.1);
  //  console.log(vertex);
  //});
  points.geometry.vertices.forEach((vertex, i) => {
    vertex.x = vertex.x + scaleFactors[i] * (vertex.x < 0 ? -1 : 1);
    vertex.y = vertex.y + scaleFactors[i] * (vertex.y < 0 ? -1 : 1);
    vertex.z = vertex.z + scaleFactors[i] * (vertex.z < 0 ? -1 : 1);
  });
  points.geometry.verticesNeedUpdate = true;
  renderer.render(scene, camera);
}

animate();
