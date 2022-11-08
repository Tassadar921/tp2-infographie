function setupAffichagePoints() {
    let newUl = document.createElement("ul");
    newUl.setAttribute("id","newUl");
    newUl.style = "padding: 10px;";
    newUl.innerHTML += "<p> Courbe n°" + (IDSelectedCurve+1) + "</p>"
    for(let i = 0; i < tabPointsControle[IDSelectedCurve].length; i++) {
        newUl.appendChild(createNewLi(i));
    }

    document.getElementById("points").appendChild(newUl);

    document.getElementById("points").appendChild(createNewButton("sauvegarder"));
    document.getElementById("points").appendChild(createNewButton("ajouter"));

    initEventListenersAffichagePoints();

    function initEventListenersAffichagePoints() {
        document.getElementById("sauvegarderButton").addEventListener("click", (event)=>{
            event.preventDefault();
            for(let i = 0; i < tabPointsControle[IDSelectedCurve].length; i++) {
                tabPointsControle[IDSelectedCurve][i].x = document.getElementById("x"+i).value;
                tabPointsControle[IDSelectedCurve][i].y = document.getElementById("y"+i).value;
            }
            scene = new THREE.Scene();
            scene.add(configPlane());
            renderer.render(scene, camera);
            majAffichagePoints();
            initializationDragging(false);
        });
    
        document.getElementById("ajouterButton").addEventListener("click", (event)=>{
            event.preventDefault();
    
            tabPointsControle[IDSelectedCurve].push(new THREE.Vector3(0,0,0));
            let id = tabPointsControle[IDSelectedCurve].length-1;
    
            document.getElementById("newUl").appendChild(createNewLi(id));
    
            createArrowsButtonEvents("Up",id);
            createArrowsButtonEvents("Down",id);
    
            majAffichagePoints();
        });
    
        for(let i = 0; i < tabPointsControle[IDSelectedCurve].length; i++) {
            createArrowsButtonEvents("Up",i);
            createArrowsButtonEvents("Down",i);
        }

        function createArrowsButtonEvents(way,id) {
            document.getElementById("arrow"+way+id).addEventListener("click", (event)=>{
                event.preventDefault();
                switch(way) {
                    case "Up":
                        if(id != 0) {
                            let tmp = tabPointsControle[IDSelectedCurve][id-1].x;
                            tabPointsControle[IDSelectedCurve][id-1].x = tabPointsControle[IDSelectedCurve][id].x;
                            tabPointsControle[IDSelectedCurve][id].x = tmp;
                            
                            tmp = tabPointsControle[IDSelectedCurve][id-1].y;
                            tabPointsControle[IDSelectedCurve][id-1].y = tabPointsControle[IDSelectedCurve][id].y;
                            tabPointsControle[IDSelectedCurve][id].y = tmp;
                        }
                        majAffichagePoints();
                        break;

                    case "Down":
                        if(id+1 != tabPointsControle[IDSelectedCurve].length) {
                            let tmp = tabPointsControle[IDSelectedCurve][id+1].x;
                            tabPointsControle[IDSelectedCurve][id+1].x = tabPointsControle[IDSelectedCurve][id].x;
                            tabPointsControle[IDSelectedCurve][id].x = tmp;
            
                            tmp = tabPointsControle[IDSelectedCurve][id+1].y;
                            tabPointsControle[IDSelectedCurve][id+1].y = tabPointsControle[IDSelectedCurve][id].y;    
                            tabPointsControle[IDSelectedCurve][id].y = tmp;
                        }
                        majAffichagePoints();
                        break;
                }
            });
        }
    }
    
    function createNewLi(id) {
        let newLi = document.createElement("li");
        let letters = ['x','y'];
        for(let j = 0; j < letters.length; j++){
            newLi.innerHTML += letters[j] + " : ";
            let newInput = document.createElement("input");
            newInput.style = "width : 30px;";
            newInput.setAttribute("type", "text");
            newInput.setAttribute("name", letters[j] + IDSelectedCurve);
            newInput.setAttribute("id", letters[j] + id);
            newInput.setAttribute("value", tabPointsControle[IDSelectedCurve][id].getComponent(j));
            newLi.appendChild(newInput);
            newLi.innerHTML += " ";
        }
        newLi.innerHTML += '<button id="arrowUp'+id+'"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/></svg></button>';
        newLi.innerHTML += '<button id="arrowDown'+id+'"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/></svg></button>';
    
        return newLi;
    }
    
    function createNewButton(name) {
        let newButtonAdd = document.createElement("button");
        newButtonAdd.setAttribute("id",name+"Button");
        newButtonAdd.innerHTML=name;
    
        return newButtonAdd;
    }
}

function majAffichagePoints() {
    for(let i = 0; i < tabPointsControle[IDSelectedCurve].length; i++) {
        let letters = ['x','y'];
        for(let j = 0; j < letters.length; j++){
            document.getElementById(letters[j] + i).setAttribute("value", tabPointsControle[IDSelectedCurve][i].getComponent(j));
        }    
    }
    
    miseAJour(chargeDraw(tabPointsControle[IDSelectedCurve], methode));
}