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
                let Bern = Bernstein(taille-1, i, t);
                x = x + pointsControle[i].x * Bern;
                y = y + pointsControle[i].y * Bern;
            }
            courbe.push(new THREE.Vector3(x,y,0));
        }        
        
        return courbe;
    }
    else {
        return "error";
    }
}