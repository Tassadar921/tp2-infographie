let x;
let y;
function rotation(angle){
    let nbPoints = tabPointsControle[IDSelectedCurve].length;
    for(var tmp =0; tmp < nbPoints; tmp++ ){
        tabPointsControle[IDSelectedCurve][tmp].x = tabPointsControle[IDSelectedCurve][tmp].x * Math.cos(angle) - tabPointsControle[IDSelectedCurve][tmp].y * Math.sin(angle);
        tabPointsControle[IDSelectedCurve][tmp].y = tabPointsControle[IDSelectedCurve][tmp].x * Math.sin(angle) + tabPointsControle[IDSelectedCurve][tmp].y * Math.cos(angle);
    }
    return tabPointsControle[IDSelectedCurve];
}

function translation(axe, constante){
    let nbPoints = tabPointsControle[IDSelectedCurve].length;
    for(var tmp =0; tmp < nbPoints; tmp++ ){
        switch(axe){
            case 'x' :
                tabPointsControle[IDSelectedCurve][tmp].x = tabPointsControle[IDSelectedCurve][tmp].x + constante;
            break;

            case 'y' :
                tabPointsControle[IDSelectedCurve][tmp].y = tabPointsControle[IDSelectedCurve][tmp].y + constante;
            break;
        }
    }
}

//rotation(45)
//console.log(tabPointsControle[IDSelectedCurve][1].x);

//translation('y', 2);
//console.log('x = ',tabPointsControle[IDSelectedCurve][0].x);
//console.log('y = ',tabPointsControle[IDSelectedCurve][0].y);
