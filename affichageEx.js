function eventListenerAffichagePoint(id){
    document.getElementById("courbe"+id).addEventListener("click",(event) => {
        if(document.getElementById('courbe'+id).checked) {
            IDSelectedCurve = id-1;
            unCheckAll(id);
        }
        refresh(document.getElementById('courbe'+id).checked);
    });
}

function unCheckAll(id) {
    for(let i = 1; i <= tabPointsControle.length; i++) {
        if(i != id) {
            console.log("uncheck"+i);
            document.getElementById('courbe'+i).checked = false;
        }
        else {
            console.log("check"+i);
            document.getElementById('courbe'+i).checked = true;
        }
    }
}

refresh = (checked) => {
    material = new THREE.LineBasicMaterial({color: randomColor()});
    material2 = new THREE.LineBasicMaterial({color: randomColor()});
    materialPoints = new THREE.PointsMaterial({color: randomColor(), size : 0.15});
    scene = new THREE.Scene();
    scene.add(configPlane());
    renderer.render(scene, camera);
    if(checked) {
        miseAJour(chargeDraw(tabPointsControle[IDSelectedCurve], methode));
        initializationDragging(false);
    }
    setupAffichagePoints();
};

document.getElementById("bernstein").style = "background-color: lightgrey;";

document.getElementById("bernstein").addEventListener("click",(event)=>{
    clear();
    methode = "bernstein";
    for(let i = 0; i < nbCourbes; i++){
        if(document.getElementById("courbe"+(i+1)).checked) miseAJour(chargeDraw(tabPointsControle[i], methode));
    }
    document.getElementById("bernstein").style = "background-color: lightgrey;";
    document.getElementById("decasteljau").style = "";
    refresh(true);
});

document.getElementById("decasteljau").addEventListener("click",(event)=>{
    clear();
    methode = "decasteljau";
    for(let i = 0; i < nbCourbes; i++){
        if(document.getElementById("courbe"+(i+1)).checked) miseAJour(chargeDraw(tabPointsControle[i], methode));
    }
    document.getElementById("bernstein").style = "";
    document.getElementById("decasteljau").style = "background-color: lightgrey;";
    refresh(true);
});

document.getElementById("new").addEventListener("click",(event)=>{
    nbCourbes++;
        
    let tmp = new Array;
    tmp.push(new THREE.Vector3(0,0,0));
    tmp.push(new THREE.Vector3(0,1,0));
    tmp.push(new THREE.Vector3(1,1,0));
    tabPointsControle.push(tmp)

    let clone1 = document.getElementById("courbe1").cloneNode();
    let clone2 = document.getElementById("select1").cloneNode();

    clone1.setAttribute("id","courbe" + nbCourbes);
    clone1.setAttribute("name","courbe " + nbCourbes);
    document.getElementById("formCheckboxes").appendChild(clone1);

    clone2.setAttribute("id","select" + nbCourbes);
    clone2.setAttribute("for","courbe" + nbCourbes);
    clone2.innerHTML = "courbe " + nbCourbes;
    document.getElementById("formCheckboxes").appendChild(clone2);


    eventListenerAffichagePoint((nbCourbes));

    IDSelectedCurve = nbCourbes-1;

    unCheckAll(nbCourbes);
    refresh(document.getElementById('courbe'+nbCourbes).checked);
});

document.getElementById("courbe1").addEventListener("click",(event)=>{
    if(document.getElementById('courbe1').checked) {
        IDSelectedCurve = 0;
        unCheckAll(1);
    }
    refresh(document.getElementById('courbe1').checked);
});
document.getElementById("courbe2").addEventListener("click",(event)=>{
    if(document.getElementById('courbe2').checked) {
        IDSelectedCurve = 1;
        unCheckAll(2);
    }
    refresh(document.getElementById('courbe2').checked);
});
document.getElementById("courbe3").addEventListener("click",(event)=>{
    if(document.getElementById('courbe3').checked) {
        IDSelectedCurve = 2;
        unCheckAll(3);
    }
    refresh(document.getElementById('courbe3').checked);
});

document.getElementById("curseurX").addEventListener("change",(event)=>{
    transX = -transX;
    tabPointsControle[IDSelectedCurve] = translation("x",transX, tabPointsControle[IDSelectedCurve]);
    transX = (document.getElementById("curseurX").value - 500)/100;
    tabPointsControle[IDSelectedCurve] = translation("x",transX, tabPointsControle[IDSelectedCurve]);

    refresh(true);
});
document.getElementById("curseurY").addEventListener("change",(event)=>{
    transY = -transY;
    tabPointsControle[IDSelectedCurve] = translation("y",transY, tabPointsControle[IDSelectedCurve]);
    transY = (document.getElementById("curseurY").value - 250)/100;
    tabPointsControle[IDSelectedCurve] = translation("y",transY, tabPointsControle[IDSelectedCurve]);

    refresh(true);
});

document.getElementById("curseurRot").addEventListener("change",(event)=>{
    angle = Math.PI * (document.getElementById("curseurRot").value)/100;
    tabPointsControle[IDSelectedCurve] = rotation(angle, tabPointsControle[IDSelectedCurve]);

    refresh(true);
});