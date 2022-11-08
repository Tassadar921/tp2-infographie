const pointer = {
    x: 0,
    y: 0,
};

const objectCooBeforeDrag = new THREE.Vector3(
    0,
    0,
    0,
);

initPointer = () => {
    renderer.domElement.addEventListener('pointermove', (e) => {
        //normalized coo of pointer
        pointer.x = (e.clientX / renderer.domElement.width) * 2 - 1;
        pointer.y = -(e.clientY / renderer.domElement.height) * 2 + 1;
    });
};

initializationDragging = () => {
    const position = new THREE.Vector3();
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera( pointer, camera );
    const draggable = new DragControls(scene.getObjectById(planeID).children, camera, renderer.domElement);

    draggable.addEventListener('dragstart', (e) => {
        objectCooBeforeDrag.x = tabPointsControle[IDSelectedCurve][e.object.userData.id].x;
        objectCooBeforeDrag.y = tabPointsControle[IDSelectedCurve][e.object.userData.id].y;
    });

    draggable.addEventListener('drag', (e) => {
        position.setFromMatrixPosition(e.object.matrixWorld);
        tabPointsControle[IDSelectedCurve][e.object.userData.id].x = e.object.geometry.attributes.position.array[0] + position.x;
        tabPointsControle[IDSelectedCurve][e.object.userData.id].y = e.object.geometry.attributes.position.array[1] + position.y;
        clear();
        miseAJour(chargeDraw(tabPointsControle[IDSelectedCurve], methode));
    });

    draggable.addEventListener('dragend', (e) => {
        renderer.render(scene, camera);
    });
};