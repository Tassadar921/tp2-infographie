const pointer = {
    x: 0,
    y: 0,
};

const objectCooBeforeDrag = {
    x: 0,
    y: 0,
};

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
        objectCooBeforeDrag.x = e.object.position.x;
        objectCooBeforeDrag.y = e.object.position.y;
    });

    draggable.addEventListener('drag', (e) => {
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(pointer, camera);

        const intersects = raycaster.intersectObjects(scene.getObjectById(planeID).children);
        console.log(intersects);
        renderer.render(scene, camera);
    });
};