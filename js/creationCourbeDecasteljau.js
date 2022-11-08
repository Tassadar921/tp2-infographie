function Decasteljau(pointsControle, k, j, t, dim) {
    if (k == 0) {
        switch (dim) {
            case "x":
                return (pointsControle[j].x);
                break
            case "y":
                return (pointsControle[j].y);
                break
        }
    }
    else {
        return ( (1-t)*Decasteljau(pointsControle, k - 1, j, t, dim) + t*Decasteljau(pointsControle, k - 1, j + 1, t, dim) );
    }
}

function createDecastlejau(pointsControle) {
    let x = 0;                         
    let y = 0;
    let taille = pointsControle.length;

    if(taille>=3){
        let courbe = [];

        for(let t = 0; t<1;t=t+0.005){
            x = 0;
            y = 0;
            for(let i = 0; i<taille;i++){
                x = Decasteljau(pointsControle, pointsControle.length-1, 0, t, "x");
                y = Decasteljau(pointsControle, pointsControle.length-1, 0, t, "y");
            }
            courbe.push(new THREE.Vector3(x,y,0));
        }        
        return courbe;
    }
    else {
        return "error";
    }
}