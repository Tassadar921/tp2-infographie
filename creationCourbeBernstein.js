function Bernstein(n, i, t) {
    return (fact(n)/(fact(i)*fact(n-i)))*Math.pow(t,i)*Math.pow((1-t), n-i);
}

function createBernstein(pointsControle) {
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

function fact(x){
	let result = 1;
	while (x>0){
		result = result*x;
		x--;
	}
	return result;
}