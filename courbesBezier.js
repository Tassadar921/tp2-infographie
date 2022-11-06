const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.5, 1000);
let scene = new THREE.Scene();
camera.position.set( 0, 0, 10 );
camera.lookAt( 0, 0, 0 );

scene.background = new THREE.Color(0, 0, 0);

let tabPointsControle = initialisationCourbes();

let nbCourbes = 3;
let planeID;

let methode = "bernstein";
clear();

miseAJour(chargeDraw(tabPointsControle[0], methode));
initPointer();

function initialisationCourbes() {
    let pointsControle1 = new Array;
    pointsControle1.push(new THREE.Vector3(-1,0,0));
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
    
    let tabPointControle = new Array;
    tabPointControle.push(pointsControle1);
    tabPointControle.push(pointsControle2);
    tabPointControle.push(pointsControle3);

    return tabPointControle
}