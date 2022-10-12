const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.5, 1000);
let scene = new THREE.Scene();
camera.position.set( 0, 0, 10 );
camera.lookAt( 0, 0, 0 );

scene.background = new THREE.Color(0, 0, 0);

const material = new THREE.LineBasicMaterial({color: 0x1495A4});
const material2 = new THREE.LineBasicMaterial({color: 0xFF0000});
const materialPoints = new THREE.PointsMaterial({color: 0xFFFF00, size : 0.15});

let geometry;
let drawing;

let pointsControle1 = new Array;
pointsControle1.push(new THREE.Vector3(0,0,0));
pointsControle1.push(new THREE.Vector3(0,1,0));
pointsControle1.push(new THREE.Vector3(1,1,0));
pointsControle1.push(new THREE.Vector3(1,0,0));

let pointsControle2 = new Array;
pointsControle2.push(new THREE.Vector3(0,0,0));
pointsControle2.push(new THREE.Vector3(1,0,0));
pointsControle2.push(new THREE.Vector3(0,1,0));
pointsControle2.push(new THREE.Vector3(1,1,0));

let pointsControle3 = new Array;
pointsControle3.push(new THREE.Vector3(0,0,0));
pointsControle3.push(new THREE.Vector3(1,1,0));
pointsControle3.push(new THREE.Vector3(0,1,0));
pointsControle3.push(new THREE.Vector3(1,0,0));

let pointsControle = pointsControle3;

miseAJour(chargeDraw(pointsControle));