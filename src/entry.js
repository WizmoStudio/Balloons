/**
 * entry.js
 * 
 * This is the first file loaded. It sets up the Renderer, 
 * Scene and Camera. It also starts the render loop and 
 * handles window resizes.
 * 
 */

import { WebGLRenderer, PerspectiveCamera, Scene, Vector3 } from 'three';
import SeedScene from './objects/Scene.js';
import Stats from 'stats.js';

var stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

const scene = new Scene();
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({antialias: true});
const seedScene = new SeedScene();

// scene
scene.add(seedScene);

// camera
camera.position.set(0,-1,-10);
camera.lookAt(new Vector3(0,0,0));

// renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x212121, 1);
renderer.shadowMapEnabled = true;

// render loop
const onAnimationFrameHandler = (timeStamp) => {
  stats.begin();
  
  renderer.render(scene, camera);
  seedScene.update && seedScene.update(timeStamp);
  window.requestAnimationFrame(onAnimationFrameHandler);
  
  stats.end();
}
window.requestAnimationFrame(onAnimationFrameHandler);

// resize
const windowResizeHanlder = () => { 
  const { innerHeight, innerWidth } = window;
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
};
windowResizeHanlder();
window.addEventListener('resize', windowResizeHanlder);

// dom
document.body.style.margin = 0;
document.body.appendChild( renderer.domElement );

