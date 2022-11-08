function setupAffichagePoints() {
    document.getElementById('points').innerHTML = "";

    let newUl = document.createElement('ul');
    newUl.setAttribute('id', 'newUl');
    newUl.style = 'padding: 10px;';
    newUl.innerHTML = '<p id="nomCourbe"> Courbe n°' + (IDSelectedCurve + 1) + '</p>';
    for (let i = 0; i < tabPointsControle[IDSelectedCurve].length; i++) {
        newUl.appendChild(createNewLi(i));
    }

    document.getElementById('points').appendChild(newUl);

    document.getElementById('points').appendChild(createNewButton('sauvegarder'));
    document.getElementById('points').appendChild(createNewButton('ajouter'));

    initEventListenersAffichagePoints();
}

//trigger après une permutation de points, un update de coordonnées à la main ou un delete de points
let updateAfterMovementInTabPointsControle = () => {
    //clear des enfants du plan (les points draggable)
    scene.getObjectById(planeID).children = [];
    //pour les fonctions suivantes, aller voir leur définition, tout y est décrit
    majAffichagePoints();
    majGraphique();
    initializationDragging(false);
};

function createArrowsButtonEvents(way, id) {
    document.getElementById('arrow' + way + id).addEventListener('click', (event) => {
        event.preventDefault();
        switch (way) {
            case 'Up':
                if (id !== 0) {
                    let tmp = tabPointsControle[IDSelectedCurve][id - 1].x;
                    tabPointsControle[IDSelectedCurve][id - 1].x = tabPointsControle[IDSelectedCurve][id].x;
                    tabPointsControle[IDSelectedCurve][id].x = tmp;

                    tmp = tabPointsControle[IDSelectedCurve][id - 1].y;
                    tabPointsControle[IDSelectedCurve][id - 1].y = tabPointsControle[IDSelectedCurve][id].y;
                    tabPointsControle[IDSelectedCurve][id].y = tmp;
                }
                updateAfterMovementInTabPointsControle();
                break;

            case 'Down':
                if (id + 1 !== tabPointsControle[IDSelectedCurve].length) {
                    let tmp = tabPointsControle[IDSelectedCurve][id + 1].x;
                    tabPointsControle[IDSelectedCurve][id + 1].x = tabPointsControle[IDSelectedCurve][id].x;
                    tabPointsControle[IDSelectedCurve][id].x = tmp;

                    tmp = tabPointsControle[IDSelectedCurve][id + 1].y;
                    tabPointsControle[IDSelectedCurve][id + 1].y = tabPointsControle[IDSelectedCurve][id].y;
                    tabPointsControle[IDSelectedCurve][id].y = tmp;
                }
                updateAfterMovementInTabPointsControle();
                break;
        }
    });
}

function createDeleteButtonEvents(id){
    document.getElementById('delete'+id).addEventListener("click", () => {
        deletePoint(id);
    })
}

//fonction qui delete le point de contrôle tabPointsControle[IDSelectedCurve][id]
let deletePoint = (id) => {
    if(tabPointsControle[IDSelectedCurve].length > 3){
        //on delete le point du côté data
        tabPointsControle[IDSelectedCurve].splice(id,1);

        //on delete le point dans le panneau de contrôle des points
        document.getElementById("li"+id).remove();

        //on update threeJS, qui prendra en compte qu'un point a été supprimé
        updateAfterMovementInTabPointsControle();
    } else {//on ne peut pas avoir moins de 3 points de contrôle
        alert("Il n'y a pas assez de point pour en suprimer");
    }
}

function initEventListenersAffichagePoints() {
    document.getElementById('sauvegarderButton').addEventListener('click', (event) => {
        event.preventDefault();
        for (let i = 0; i < tabPointsControle[IDSelectedCurve].length; i++) {
            tabPointsControle[IDSelectedCurve][i].x = document.getElementById('x' + i).value;
            tabPointsControle[IDSelectedCurve][i].y = document.getElementById('y' + i).value;
        }
        updateAfterMovementInTabPointsControle();
    });

    document.getElementById('ajouterButton').addEventListener('click', (event) => {
        event.preventDefault();

        tabPointsControle[IDSelectedCurve].push(new THREE.Vector3(0, 0, 0));
        let id = tabPointsControle[IDSelectedCurve].length - 1;

        document.getElementById('newUl').appendChild(createNewLi(id));

        createArrowsButtonEvents('Up', id);
        createArrowsButtonEvents('Down', id);
        createDeleteButtonEvents(id);

        majAffichagePoints();
        majGraphique(true);
    });

    for (let i = 0; i < tabPointsControle[IDSelectedCurve].length; i++) {
        createArrowsButtonEvents('Up', i);
        createArrowsButtonEvents('Down', i);
        createDeleteButtonEvents(i);
    }
}

function createNewLi(id) {
    let newLi = document.createElement('li');
    newLi.setAttribute("id","li"+id);
    let letters = ['x', 'y'];
    for (let j = 0; j < letters.length; j++) {
        newLi.innerHTML += letters[j] + ' : ';
        let newInput = document.createElement('input');
        newInput.style = 'width : 30px;';
        newInput.setAttribute('type', 'text');
        newInput.setAttribute('name', letters[j] + IDSelectedCurve);
        newInput.setAttribute('id', letters[j] + id);
        newInput.setAttribute('value', tabPointsControle[IDSelectedCurve][id].getComponent(j));
        newLi.appendChild(newInput);
        newLi.innerHTML += ' ';
    }
    newLi.innerHTML += '<button id="arrowUp' + id + '"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/></svg></button>';
    newLi.innerHTML += '<button id="arrowDown' + id + '"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/></svg></button>';
    newLi.innerHTML += '<button id="delete' + id + '"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg></button>'
    return newLi;
}

function createNewButton(name) {
    let newButtonAdd = document.createElement('button');
    newButtonAdd.setAttribute('id', name + 'Button');
    newButtonAdd.innerHTML = name;

    return newButtonAdd;
}

function majAffichagePoints() {
    document.getElementById("nomCourbe").innerHTML = 'Courbe n°' + (IDSelectedCurve + 1);
    for (let i = 0; i < tabPointsControle[IDSelectedCurve].length; i++) {
        let letters = ['x', 'y'];
        for (let j = 0; j < letters.length; j++) {
            document.getElementById(letters[j] + i).value = tabPointsControle[IDSelectedCurve][i].getComponent(j);
        }
    }
}