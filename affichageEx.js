document.getElementById("choixCourbe1").addEventListener("click",(event)=>{
    scene = new THREE.Scene();

    pointsControle = pointsControle1;
    
    miseAJour(chargeDraw(pointsControle));
})

document.getElementById("choixCourbe2").addEventListener("click",(event)=>{
    scene = new THREE.Scene();

    pointsControle = pointsControle2;
    
    miseAJour(chargeDraw(pointsControle));
})

document.getElementById("choixCourbe3").addEventListener("click",(event)=>{
    scene = new THREE.Scene();

    pointsControle = pointsControle3;
    
    miseAJour(chargeDraw(pointsControle));
})

document.getElementById("choixCourbeNew").addEventListener("click",(event)=>{
    scene = new THREE.Scene();
    
    pointsControle = [];
    
    miseAJour(chargeDraw(pointsControle));
})