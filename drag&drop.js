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

    const draggable = new DragControls(scene.getObjectById(planeID).children, camera, renderer.domElement);

    draggable.addEventListener('dragstart', (e) => {
        objectCooBeforeDrag.x = e.object.geometry.attributes.position.array[0];
        objectCooBeforeDrag.y = e.object.geometry.attributes.position.array[1];
        for (let i = 0; i < tabPointsControle[0].length; i++) {
            if (tabPointsControle[0][i].equals(objectCooBeforeDrag)) {
                draggedPointID = i;
                i = tabPointsControle[0].length;
            }
        }
    });

    draggable.addEventListener('drag', (e) => {
        console.log(e.object);
        var position = new THREE.Vector3();
        position.setFromMatrixPosition(e.object.matrixWorld);
        console.log(position);
        tabPointsControle[0][draggedPointID].x = objectCooBeforeDrag.x+position.x;
        tabPointsControle[0][draggedPointID].y = objectCooBeforeDrag.y+position.y;
        miseAJour(chargeDraw(tabPointsControle[0], methode));
        renderer.render(scene, camera);
    });

    draggable.addEventListener('dragend', (e) => {
        console.log(tabPointsControle[0]);
        renderer.render(scene, camera);
    });
};