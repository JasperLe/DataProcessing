/* auteur: Jasper Lelijveld
* studentnummer: 11401753
* vak: Data Processing
*/

// onload drie landen van kleur veranderen via changeColor functie.
window.onload = function () {
    changeColor("nor", "#F4D03F");
    changeColor("by", "#F5B041");
    changeColor("lv", "#EB984E");
}

/* changeColor krijgt een id en een kleur en verandert het object met de id van kleur.*/
function changeColor(id, color) {
    var object = document.getElementById(id);
    object.setAttribute("fill", color);
}
