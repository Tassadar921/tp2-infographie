function rotation(angle, pointsControle){
    let nbPoints = pointsControle.length;
    for(let tmp =0; tmp < nbPoints; tmp++ ){
        pointsControle[tmp].x = pointsControle[tmp].x * Math.cos(angle) - pointsControle[tmp].y * Math.sin(angle);
        pointsControle[tmp].y = pointsControle[tmp].x * Math.sin(angle) + pointsControle[tmp].y * Math.cos(angle);
    }
    return pointsControle;
}

function translation(axe, constante, pointsControle){
    let nbPoints = pointsControle.length;
    for(let tmp =0; tmp < nbPoints; tmp++ ){
        switch(axe){
            case 'x' :
                pointsControle[tmp].x = pointsControle[tmp].x + constante;
                return pointsControle;
            break;

            case 'y' :
                pointsControle[tmp].y = pointsControle[tmp].y + constante;
                return pointsControle;
            break;
        }
    }
}