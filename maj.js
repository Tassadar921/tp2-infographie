function chargeDraw(pointsControle) {
    if(pointsControle.length == 0) return []

    const vertices = [];

    for ( let i = 0; i < pointsControle.length; i ++ ) {

        const x = pointsControle[i].x;
        const y = pointsControle[i].y;
        const z = 0;

        vertices.push( x, y, z );

    }

    let points = createBerstein(pointsControle);

    let drawings = [];

    geometry = new THREE.BufferGeometry().setFromPoints(pointsControle);  // on affiche les points
    drawing = new THREE.Line(geometry, material2); // on relie les points grace à .Line de façon à dessiner la courbe paramétrique
    drawings.push(drawing); // on ajoute le dessin dans la scène

    geometry = new THREE.BufferGeometry();
    geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
    drawing = new THREE.Points(geometry, materialPoints);
    drawings.push(drawing);

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

