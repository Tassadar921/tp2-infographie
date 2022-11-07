if(IDSelectedCurve == 0){
    document.getElementById("points").appendChild="<li><p> (" + tabPointsControle[0][0].x +";" + tabPointsControle[0][0].y + "</p></li>";
    document.getElementById("points").innerHTML="<li>" + tabPointsControle[0][1] + "</li>";
    document.getElementById("points").innerHTML="<li>" + tabPointsControle[0][2] + "</li>";
    document.getElementById("points").innerHTML="<li>" + tabPointsControle[0][3] + "</li>";
}
else if(IDSelectedCurve == 1){
    document.getElementById("points").innerHTML="<li>" + tabPointsControle[1][0] + "</li>";
    document.getElementById("points").innerHTML="<li>" + tabPointsControle[1][1] + "</li>";
    document.getElementById("points").innerHTML="<li>" + tabPointsControle[1][2] + "</li>";
    document.getElementById("points").innerHTML="<li>" + tabPointsControle[1][3] + "</li>";
}
else if(IDSelectedCurve == 2){
    document.getElementById("points").innerHTML="<li>" + tabPointsControle[2][0] + "</li>";
    document.getElementById("points").innerHTML="<li>" + tabPointsControle[2][1] + "</li>";
    document.getElementById("points").innerHTML="<li>" + tabPointsControle[2][2] + "</li>";
    document.getElementById("points").innerHTML="<li>" + tabPointsControle[2][3] + "</li>";
}