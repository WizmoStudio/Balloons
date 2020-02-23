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

// stats
var stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

// ui
var canvas_ui = document.createElement('canvas');
canvas_ui.id = 'ui';
document.body.appendChild(canvas_ui);

// ui
var canvas_bg = document.createElement('canvas');
canvas_bg.id = 'background';
document.body.appendChild(canvas_bg);

// init
const scene = new Scene();
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({
  antialias: true,
  alpha: true
});
const seedScene = new SeedScene();

// scene
scene.add(seedScene);

// camera
camera.position.set(0,-1,-10);
camera.lookAt(new Vector3(0,0,0));

// renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x212121, 0);
renderer.shadowMapEnabled = true;

// render loop
var lastTimeStamp = 0;
const onAnimationFrameHandler = (timeStamp) => {
  stats.begin();
  
  var frameTimeStamp = lastTimeStamp == 0 ? timeStamp : timeStamp - lastTimeStamp
  lastTimeStamp = timeStamp

  renderer.render(scene, camera);
  seedScene.update && seedScene.update(frameTimeStamp);
  window.requestAnimationFrame(onAnimationFrameHandler);
  
  stats.end();
}
window.requestAnimationFrame(onAnimationFrameHandler);

// resize
const windowResizeHanlder = () => { 

  // threejs
  const { innerHeight, innerWidth } = window;
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  var threejs = document.getElementById("threejs");
  threejs.style.zIndex = 20;
  threejs.style.position = 'relative';

  // ui
  var ui = document.getElementById("ui");
  ui.width = innerWidth;
  ui.height = innerHeight;
  ui.style.position = "absolute";
  ui.style.zIndex = 100;
  ui.style.width = innerWidth+'px';
  ui.style.height = innerHeight+'px';
  ui.style.top = 0;
  ui.style.left = 0;

  // background
  var ui = document.getElementById("background");
  ui.width = innerWidth;
  ui.height = innerHeight;
  ui.style.position = "absolute";
  ui.style.zIndex = 10;
  ui.style.width = innerWidth+'px';
  ui.style.height = innerHeight+'px';
  ui.style.top = 0;
  ui.style.left = 0;

};

// dom
document.body.style.margin = 0;
document.body.style.overflow = 'hidden';
renderer.domElement.id = "threejs"
document.body.appendChild(renderer.domElement);

windowResizeHanlder();
window.addEventListener('resize', windowResizeHanlder);
