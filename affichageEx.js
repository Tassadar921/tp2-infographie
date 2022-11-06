function eventListenerAffichagePoint(id){
    document.getElementById(id).addEventListener("click",(event) => {
        event.preventDefault();


    });
}

refresh = (checked) => {
    material = new THREE.LineBasicMaterial({color: randomColor()});
    material2 = new THREE.LineBasicMaterial({color: randomColor()});
    materialPoints = new THREE.PointsMaterial({color: randomColor(), size : 0.15});
    scene = new THREE.Scene();
    scene.add(configPlane());
    scene.getObjectById(planeID).children = [];
    renderer.render(scene, camera);
    if(checked) {
        miseAJour(chargeDraw(tabPointsControle[IDSelectedCurve], methode));
        initializationDragging();
    }
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


    eventListenerAffichagePoint("select"+nbCourbes);
});

document.getElementById("courbe1").addEventListener("click",(event)=>{
    if(document.getElementById('courbe1').checked) {
        IDSelectedCurve = 0;
        document.getElementById('courbe2').checked = false;
        document.getElementById('courbe3').checked = false;
    }
    refresh(document.getElementById('courbe1').checked);
});
document.getElementById("courbe2").addEventListener("click",(event)=>{
    if(document.getElementById('courbe2').checked) {
        IDSelectedCurve = 1;
        document.getElementById('courbe1').checked = false;
        document.getElementById('courbe3').checked = false;
    }
    refresh(document.getElementById('courbe2').checked);
});
document.getElementById("courbe3").addEventListener("click",(event)=>{
    if(document.getElementById('courbe3').checked) {
        IDSelectedCurve = 2;
        document.getElementById('courbe1').checked = false;
        document.getElementById('courbe2').checked = false;
    }
    refresh(document.getElementById('courbe3').checked);
});