function rotation(angle, pointsControle){
    let nbPoints = pointsControle.length;
    for(let i =0; i < nbPoints; i++ ){
        let tmpX = pointsControle[i].x;
        let tmpY = pointsControle[i].y;
        pointsControle[i].x = tmpX * Math.cos(angle) - tmpY * Math.sin(angle);
        pointsControle[i].y = tmpX * Math.sin(angle) + tmpY * Math.cos(angle);
    }
    return pointsControle;
}

function translation(axe, constante, pointsControle){
    for(let i = 0; i < pointsControle.length; i++ ) {
        switch(axe){
            case 'x' :
                pointsControle[i].x = pointsControle[i].x + constante;
            break;

            case 'y' :
                pointsControle[i].y = pointsControle[i].y + constante;
            break;
        }
    }
    return pointsControle;
}