document.getElementById("bernstein").style = "background-color: lightgrey;";

document.getElementById("bernstein").addEventListener("click",(event)=>{
    clear();
    methode = "bernstein";
    for(let i = 0; i < nbCourbes; i++){
        if(document.getElementById("courbe"+(i+1)).checked) miseAJour(chargeDraw(tabPointsControle[i], methode));
    }
    document.getElementById("bernstein").style = "background-color: lightgrey;";
    document.getElementById("decasteljau").style = "";
});

document.getElementById("decasteljau").addEventListener("click",(event)=>{
    clear();
    methode = "decasteljau";
    for(let i = 0; i < nbCourbes; i++){
        if(document.getElementById("courbe"+(i+1)).checked) miseAJour(chargeDraw(tabPointsControle[i], methode));
    }
    document.getElementById("bernstein").style = "";
    document.getElementById("decasteljau").style = "background-color: lightgrey;";
});

document.getElementById("refresh").addEventListener("click",(event)=>{
    clear();
    for(let i = 0; i < nbCourbes; i++){
        if(document.getElementById("courbe"+(i+1)).checked) miseAJour(chargeDraw(tabPointsControle[i], methode));
    }
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

    document.getElementById("select"+nbCourbes).addEventListener("click",(event)=>{
        event.preventDefault();
    });    
});

document.getElementById("select1").addEventListener("click",(event)=>{
    event.preventDefault();
    console.log(document.getElementById("select4"));
});
document.getElementById("select2").addEventListener("click",(event)=>{
    event.preventDefault();
});
document.getElementById("select3").addEventListener("click",(event)=>{
    event.preventDefault();
});

