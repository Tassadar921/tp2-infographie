function setupAffichagePoints() {
    let newUl = document.createElement("ul");
    newUl.setAttribute("id","newUl");
    newUl.style = "padding: 10px;";
    newUl.innerHTML += "<p> Courbe n°" + (IDSelectedCurve+1) + "</p>"
    for(let i = 0; i < tabPointsControle[IDSelectedCurve].length; i++) {
        let newLi = document.createElement("li");
    
    
        let letters = ['x','y'];
        for(let j = 0; j < letters.length; j++){
            newLi.innerHTML += letters[j] + " : ";
            let newInput = document.createElement("input");
            newInput.style = "width : 30px;";
            newInput.setAttribute("type", "text");
            newInput.setAttribute("name", letters[j] + IDSelectedCurve);
            newInput.setAttribute("id", letters[j] + i);
            newInput.setAttribute("value", tabPointsControle[IDSelectedCurve][i].getComponent(j));
            newLi.appendChild(newInput)
        }    
        newUl.appendChild(newLi);
    }

    document.getElementById("points").innerHTML = "";
    document.getElementById("points").appendChild(newUl);

    let newButton = document.createElement("button");
    newButton.setAttribute("id","saveButton");
    newButton.innerHTML="Sauvegarder";
    document.getElementById("points").appendChild(newButton);

    document.getElementById("saveButton").addEventListener("click", (event)=>{
        event.preventDefault();
        for(let i = 0; i < tabPointsControle[IDSelectedCurve].length; i++) {
            tabPointsControle[IDSelectedCurve][i].x = document.getElementById("x"+i).value;
            tabPointsControle[IDSelectedCurve][i].y = document.getElementById("y"+i).value;
        }

        scene = new THREE.Scene();
        scene.add(configPlane());
        renderer.render(scene, camera);
        miseAJour(chargeDraw(tabPointsControle[IDSelectedCurve], methode));
        initPointer();
        initializationDragging(false);
    });
}

function majAffichagePoints() {
    let newUl = document.getElementById("newUl");
    newUl.innerHTML = "";
    for(let i = 0; i < tabPointsControle[IDSelectedCurve].length; i++) {
        let newLi = document.createElement("li");
    
    
        let letters = ['x','y'];
        for(let j = 0; j < letters.length; j++){
            newLi.innerHTML += letters[j] + " : ";
            newLi.setAttribute("id","newLi");
            let newInput = document.createElement("input");
            newInput.style = "width : 30px;";
            newInput.setAttribute("type", "text");
            newInput.setAttribute("name", letters[j] + IDSelectedCurve);
            newInput.setAttribute("id", letters[j] + i);
            newInput.setAttribute("value", tabPointsControle[IDSelectedCurve][i].getComponent(j));
            newLi.appendChild(newInput)
        }    
        newUl.appendChild(newLi);
    }
}