function chargeDraw(pointsControle, methode) {    
    let geometry;
    let drawing;

    const material = new THREE.LineBasicMaterial({color: randomColor()});
    const material2 = new THREE.LineBasicMaterial({color: randomColor()});
    const materialPoints = new THREE.PointsMaterial({color: randomColor(), size : 0.15});

    let points = new Array;

    switch (methode) {
        case "bernstein":
            points = createBerstein(pointsControle);
            break
        case "decasteljau":
            points = createDecastlejau(pointsControle);
            break
    }

    let drawings = [];

    geometry = new THREE.BufferGeometry().setFromPoints(pointsControle);  // on affiche les points
    drawing = new THREE.Line(geometry, material2); // on relie les points grace à .Line de façon à dessiner la courbe paramétrique
    drawings.push(drawing); // on ajoute le dessin dans la scène

    for ( let i = 0; i < pointsControle.length; i ++ ) {
    
        const vertices = [];

        const x = pointsControle[i].x;
        const y = pointsControle[i].y;
        const z = 0;

        vertices.push( x, y, z );

        geometry = new THREE.BufferGeometry();
        geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ));
        drawing = new THREE.Points(geometry, materialPoints);
        drawings.push(drawing);
    }

    geometry = new THREE.BufferGeometry().setFromPoints(points);  // on affiche les points
    drawing = new THREE.Line(geometry, material); // on relie les points grace à .Line de façon à dessiner la courbe paramétrique
    drawings.push(drawing); // on ajoute le dessin dans la scène

    return drawings;
}

function miseAJour(drawings) {
    drawings.forEach(element => {
        scene.add(element);        
    });

    renderer.render(scene, camera); // on fait le rendu
}

function clear() {
    scene = new THREE.Scene();

    renderer.render(scene, camera); // on fait le rendu
}

function randomColor() {
    return parseInt('0x' + (('00000'+(Math.random()*(1<<24)|0).toString(16).toUpperCase()).slice(-6)));
}