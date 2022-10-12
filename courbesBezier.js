const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.5, 1000);
const scene = new THREE.Scene();
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

const vertices = [];

for ( let i = 0; i < pointsControle.length; i ++ ) {

	const x = pointsControle[i].x;
	const y = pointsControle[i].y;
	const z = 0;

	vertices.push( x, y, z );

}

let points = createBerstein(pointsControle);

geometry = new THREE.BufferGeometry().setFromPoints(pointsControle);  // on affiche les points
drawing = new THREE.Line(geometry, material2); // on relie les points grace à .Line de façon à dessiner la courbe paramétrique
scene.add(drawing); // on ajoute le dessin dans la scène

geometry = new THREE.BufferGeometry();  // on affiche les points
geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
drawing = new THREE.Points(geometry, materialPoints); // on relie les points grace à .Line de façon à dessiner la courbe paramétrique
scene.add(drawing); // on ajoute le dessin dans la scène

geometry = new THREE.BufferGeometry().setFromPoints(points);  // on affiche les points
drawing = new THREE.Line(geometry, material); // on relie les points grace à .Line de façon à dessiner la courbe paramétrique
scene.add(drawing); // on ajoute le dessin dans la scène



renderer.render(scene, camera); // on fait le rendu